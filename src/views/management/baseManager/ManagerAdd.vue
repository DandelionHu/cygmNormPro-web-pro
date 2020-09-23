<template>
  <a-form :form="form">
    <a-form-item
      label="名称"
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
      label="账号"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'account',
          {rules: [{ required: true, message: '请输入账号',whitespace: true },
                   { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
        ]"
        name="account"
        placeholder="请输入名称"/>
    </a-form-item>
    <a-form-item
      label="手机号码"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'phone',
          {rules: [{ required: true, message: '请输入手机号码',whitespace: true },
                   { len:11, message: '请输入长度11位的手机号码',whitespace: true }]}
        ]"
        name="phone"
        placeholder="请输入手机号码"/>
    </a-form-item>
    <a-form-item
      label="角色"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-checkbox-group
        v-decorator="['roleIds']"
        @change="onChange"
        name="roleIds">
        <a-checkbox :value="item.id" v-for="(item,index) in roleList" :key="index">{{item.name}}</a-checkbox>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item
      label="性别"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-radio-group v-model="sex">
        <a-radio :value="1">
          男
        </a-radio>
        <a-radio :value="2">
          女
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="上传头像"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <upload-img :num="1" :fileList="fileList" @uploadList="uploadList"></upload-img>
    </a-form-item>
    <a-form-item
      :wrapperCol="{lg: {span: 6}, sm: {span: 9}}"
      class="ta-c">
      <a-button type="primary" ghost @click="onCancel">取消</a-button>
      <a-button
        class="m-l10"
        type="primary"
        @click="onSave"
        :loading="lodingBtn"
        :disabled="lodingBtn">保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { baseManagerSaveManager, baseManagerFindById, baseRoleFindList } from '@/api/cygmNormPro'
  import { UploadImg } from '@/components'
  export default {
    name: 'ManagerAdd',
    components: {
      UploadImg
    },
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
        sex: 1,
        photo: '',
        fileList: [],
        roleList: [] // 角色列表
      }
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        this.handleReset()
        this.getRole()
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 获取角色列表
      async getRole() {
        const { returnValue: res } = await baseRoleFindList({ type: 1 })
        this.roleList = res
      },
      // 选择角色
      onChange(val) {
        this.form.setFieldsValue({
          roleIds: val.join(',')
        })
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
            params.id = this.editID
            params.photo = this.photo
            params.sex = this.sex === 1 ? '男' : '女'
            baseManagerSaveManager(params)
                .then((res) => {
                  if (res.returnValue) {
                    if (this.editID) {
                      this.$message.info('编辑成功')
                    } else {
                      this.$message.info('保存成功')
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
      // 获取详情
      async loadInfo(id) {
        const { form } = this
        const { returnValue: res } = await baseManagerFindById({ id })
        form.setFieldsValue({
          name: res.name,
          account: res.account,
          phone: res.phone
        })
        this.sex = res.sex === '男' ? 1 : 2
        this.photo = res.photo
        if (res.photo) {
          const obj = {
            status: 'done',
            uid: res.photo,
            name: res.photo,
            url: res.photo
          }
          this.fileList.push(obj)
        }
      },
      // 图片列表
      uploadList(list) {
        const photoList = []
        list.forEach((v, i) => {
          photoList.push(v.url)
        })
        this.photo = photoList.join(',')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
