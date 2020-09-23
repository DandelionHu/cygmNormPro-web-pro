<template>
  <a-form :form="form">
    <a-form-item
      label="角色名称"
      :labelCol="{lg: {span: 2}, sm: {span: 4}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 8}}">
      <a-input
        v-decorator="[
          'name',
          {rules: [{ required: true, message: '请输入名称',whitespace: true },
                   { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
        ]"
        name="name"
        placeholder="请输入名称"/>
    </a-form-item>
    <a-form-item
      label="角色类型"
      :labelCol="{lg: {span: 2}, sm: {span: 4}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 8}}">
      <a-select
        v-decorator="[
          'type',
          {rules: [{ required: true, message: '请选择类型',whitespace: true }]}
        ]"
        name="type"
        placeholder="请选择类型"
        @change="onType">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="1">管理员角色</a-select-option>
        <a-select-option value="2">企业角色</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="描述"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-textarea
        v-decorator="['content']"
        name="content"
        placeholder="请输入描述"/>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 20, offset: 2 }">
      <a-button type="primary" ghost @click="onCancel">取消</a-button>
      <a-button
        class="m-l10"
        type="primary"
        @click="onSave"
        :loading="lodingBtn"
        :disabled="lodingBtn">保存
      </a-button>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 20, offset: 2 }">
      <a-tree
        ref="treeInfo"
        show-line
        checkable
        v-model="checkedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="treeData"
        @check="onCheck"
      />
    </a-form-item>
  </a-form>

</template>

<script>
  import { baseRoleSaveRole, baseRoleFindById, baseAuthorityFindList } from '@/api/cygmNormPro'
  export default {
    name: 'RoleAdd',
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        form: this.$form.createForm(this),
        lodingBtn: false,
        treeData: [],
        autoExpandParent: true, // 展开树结构
        checkedKeys: [], // 选中的id
        authorityData: []
      }
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        this.handleReset()
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 选择角色
      onType(val) {
        if (val) {
          this.getAuthority(val)
        }
      },
      // 获取权限
      async getAuthority(scope, arr) {
        const { returnValue: res } = await baseAuthorityFindList({ scope })
        const treeData = []
        this.authorityData = res
        res.forEach((v, i) => {
          if (v.pid === '0') {
            // 最高级
            const obj = {
              title: v.name,
              key: v.id,
              slots: {
                title: 'name'
              },
              children: []
            }
            obj.children = this.getchilds(v.id, res)// 获取子节点
            treeData.push(obj)
          }
        })
        this.treeData = treeData
        this.checkedKeys = arr
      },
      // 获取子节点
      getchilds(id, array) {
        const childs = []
        // 循环获取子节点
        array.forEach((v, i) => {
          if (v.pid === id) {
            childs.push({
              title: v.name,
              key: v.id,
              slots: {
                title: 'name'
              },
              children: []
            })
          }
        })
        // 获取子节点的子节点
        childs.forEach((v, i) => {
          const childscopy = this.getchilds(v.key, array)// 递归获取子节点
          if (childscopy.length > 0) {
            v.children = childscopy
          }
        })
        return childs
      },
      // 选中权限
      onCheck(checkedKeys, e) {
        console.log(checkedKeys)
        this.checkedKeys = checkedKeys
      },
      // 重置表单
      handleReset() {
        this.form.resetFields()
      },
      // 取消
      onCancel() {
        this.$emit('editClose')
      },
      // 保存
      onSave(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.lodingBtn = true
            const params = { ...values }
            console.log(this.$refs.treeInfo)
            params.id = this.editID
            params.authorityIds2 = this.checkedKeys.join(',')
            const authorityIds = this.getParentId(this.checkedKeys, this.authorityData)
            params.authorityIds = [...new Set(authorityIds.concat(this.checkedKeys))].join(',')
            baseRoleSaveRole(params)
                .then((res) => {
                  if (res.returnValue) {
                    if (this.editID) {
                      this.$message.success('编辑成功')
                    } else {
                      this.$message.success('保存成功')
                    }
                    this.onCancel()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
                .finally(() => {
                  this.lodingBtn = false
                })
          }
        })
      },
      // 获取父级id
      getParentId (arr, authorityData) {
        const parentIdarr = []
        arr.forEach((m, n) => {
          this.findPid(m, authorityData, parentIdarr)
        })
        return [...new Set(parentIdarr)]
      },
      // 获取父节点
      findPid (id, authorityData, parentIdarr) {
        const findPid = authorityData.find(e => e.id === id)
        if (findPid.pid !== 0 && findPid.pid !== '0') {
          parentIdarr.push(findPid.pid)
          this.findPid(findPid.pid, authorityData, parentIdarr)
        }
      },
      // 获取详情
      async loadInfo(id) {
        const { form } = this
        const { returnValue: res } = await baseRoleFindById({ id })
        form.setFieldsValue({
          name: res.name,
          content: res.content,
          type: res.type.toString()
        })
        this.getAuthority(res.type, res.roleAuthIds ? res.roleAuthIds : [])
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
