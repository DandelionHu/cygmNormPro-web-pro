<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <a-row>
        <a-col :span="6">
          <a-tree
            show-line
            :auto-expand-parent="autoExpandParent"
            :selected-keys="selectedKeys"
            :tree-data="treeData"
            @select="onSelect"
          />
        </a-col>
        <a-col :span="11">
          <a-form layout="inline" class="form-flex" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
            <a-form-item
              label="权限ID">
              <a-input name="id" disabled placeholder="请输入权限ID" v-model="queryParam.id"/>
            </a-form-item>
            <a-form-item
              label="父级ID">
              <a-input name="pid" placeholder="请输入父级ID" v-model="queryParam.pid"/>
            </a-form-item>
            <a-form-item
              label="权限标题">
              <a-input name="name" placeholder="请输入权限标题" v-model="queryParam.name"/>
            </a-form-item>
            <a-form-item
              label="资源路径">
              <a-input name="htmlurl" placeholder="请输入资源路径" v-model="queryParam.htmlurl"/>
            </a-form-item>
            <a-form-item
              label="权限级别">
              <a-input name="levels" placeholder="请输入权限级别" v-model="queryParam.levels"/>
            </a-form-item>
            <a-form-item
              label="权限排序">
              <a-input name="sortNo" placeholder="请输入权限排序" v-model="queryParam.sortNo"/>
            </a-form-item>
            <a-form-item
              label="权限按钮">
              <a-input name="authKeys" placeholder="请输入权限按钮" v-model="queryParam.authKeys"/>
            </a-form-item>
            <a-form-item
              label="权限分组">
              <a-input name="groups" placeholder="请输入权限分组" v-model="queryParam.groups"/>
            </a-form-item>
            <a-form-item
              label="类型">
              <a-radio-group v-model="queryParam.type">
                <a-radio :value="1">
                  目录
                </a-radio>
                <a-radio :value="2">
                  功能
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="使用范围">
              <a-radio-group v-model="queryParam.scope" >
                <a-radio :value="2">
                  企业
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="请求接口"
              :labelCol="{span: 4 }"
              :wrapperCol="{span: 20 }"
              class="width100per">
              <a-textarea class="width100per" name="interfaceUrl" placeholder="请输入请求接口" v-model="queryParam.interfaceUrl"/>
            </a-form-item>
            <a-form-item
              label="功能模块">
              <a-input name="module" placeholder="请输入功能模块" v-model="queryParam.module"/>
            </a-form-item>
            <a-form-item
              label="记录日志">
              <a-input name="recordLog" placeholder="请输入记录日志" v-model="queryParam.recordLog"/>
            </a-form-item>
            <a-form-item
              class="width100per"
              :wrapper-col="{ span: 20, offset: 4 }">
              <a-button type="primary" @click="onSave">保存</a-button>
              <a-button class="m-l10" @click="onReset" type="primary" ghost>重置</a-button>
              <a-button class="m-l10" @click="onResetId" type="normal" ghost>清除ID</a-button>
              <a-button class="m-l10" @click="onDelete" type="normal">标记删除</a-button>
              <a-button class="m-l10" @click="onDeleteAll" type="warm">物理删除</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
  </page-header-wrapper>
</template>
<script>
  import { baseAuthorityFindList, baseAuthoritySaveAuthority, baseAuthorityFindById, baseAuthorityDeleteAll, baseAuthorityDeleteRealById } from '@/api/cygmNormPro'
  export default {
    data() {
      return {
        queryParam: {},
        treeData: [],
        autoExpandParent: true, // 展开树结构
        selectedKeys: [], // 选中的key
        scope: 2
      }
    },
    mounted () {
      this.onReset()
      this.getAuthority()
    },
    methods: {
      // 查询
      async getAuthority() {
        const { returnValue: res } = await baseAuthorityFindList({ scope: this.scope })
        const treeData = []
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
      // 保存
      async onSave() {
        const { returnValue: res } = await baseAuthoritySaveAuthority(this.queryParam)
        if (res) {
          this.$message.info('添加成功')
          this.getAuthority()
        }
      },
      // 重置
      onReset() {
        this.queryParam = {
          id: '',
          pid: '',
          name: '',
          htmlurl: '',
          levels: '',
          sortNo: '',
          authKeys: '',
          groups: '',
          type: 1,
          scope: 2,
          interfaceUrl: '',
          module: '',
          recordLog: ''
        }
      },
      // 清除id
      onResetId() {
        this.queryParam.id = ''
      },
      // 标记删除
      async onDelete() {
        if (this.selectedKeys[0]) {
          const id = this.selectedKeys[0]
          const { returnValue: res } = await baseAuthorityDeleteAll({ id })
          if (res) {
            this.$message.success('删除成功')
            this.getAuthority()
          }
        } else {
          this.$message.info('请选择节点')
        }
      },
      // 物理删除
      async onDeleteAll() {
        if (this.selectedKeys[0]) {
          const id = this.selectedKeys[0]
          const { returnValue: res } = await baseAuthorityDeleteRealById({ id })
          if (res) {
            this.$message.success('删除成功')
            this.getAuthority()
          }
        } else {
          this.$message.info('请选择节点')
        }
      },
      // 选中树
      onSelect(selectedKeys, info) {
        this.selectedKeys = selectedKeys
        if (selectedKeys[0]) {
          this.getDetail(selectedKeys[0])
        } else {
          this.onReset()
        }
      },
      // 获取详情
      async getDetail(id) {
        const { returnValue: res } = await baseAuthorityFindById({ id })
        delete res.createTime
        delete res.delete
        this.queryParam = res
      }
    }
  }
</script>
<style lang="less" scoped>
  .form-flex{
    display: flex;
    flex-wrap: wrap;
    .ant-form-item{
      width: 50%;
      margin: 0px;
    }
  }
</style>
