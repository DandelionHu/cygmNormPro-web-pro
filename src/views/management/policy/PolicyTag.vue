<template>
  <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
    <table-filtrate
      :filtrate="filtrate"
      @btnClick="btnClick"
      @selectUserChange="selectUserChange"
      @filtrateChange="filtrateChange"></table-filtrate>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        class="m-t10"
      >
        <span slot="state" slot-scope="text">
          {{ text | state }}
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a class="table-edit" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <a class="table-again" @click="handleState(record)">{{ record.state==1?'禁用':'解禁' }}</a>
            <a-divider type="vertical"/>
            <a class="table-delete" @click="handleDelete(record)">删除</a>
          </template>
        </span>
      </s-table>
      <a-modal v-model="visible" title="标签" on-ok="onSave">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">
            取消
          </a-button>
          <a-button key="submit" type="primary" @click="onSave">
            提交
          </a-button>
        </template>
        <a-form :form="form">
          <a-form-item
            label="标题"
            :labelCol="{span: 5 }"
            :wrapperCol="{span: 16 }">
            <a-input
              name="title"
              v-decorator="[
                'title',
                {rules: [{ required: true, message: '请输入标题',whitespace: true }]}]"
              placeholder="请输入标题"/>
          </a-form-item>
          <a-form-item
            label="描述"
            :labelCol="{span: 5 }"
            :wrapperCol="{span: 16 }">
            <a-textarea
              name="content"
              v-decorator="[
                'content',
                {rules: [{ required: true, message: '请输入描述',whitespace: true }]}]"
              placeholder="请输入描述"/>
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
</template>

<script>
  import { baseFieldSaveField, baseFieldFindList, baseFieldDeleteAll, baseFieldUpdateState } from '@/api/cygmNormPro'
  import { STable, Ellipsis, TableFiltrate } from '@/components'
  export default {
    name: 'PolicyTag',
    components: {
      STable,
      Ellipsis,
      TableFiltrate
    },
    data () {
      return {
        // 弹框
        editID: '',
        form: this.$form.createForm(this),
        visible: false,
        filtrate: {
          className: '',
          seekList: [ // 表格的筛选项
            {
              type: 'input', // 文本框搜索   input（文本框）  select（下拉框）  date(日期) selectUsr（选择用户)
              name: 'keyword', // 对应的字段
              label: '关键字', // 文字描述
              placeholder: '请输入关键字',
              defaultValue: ''// 默认值
            },
            {
              type: 'date',
              name: 'date',
              label: '创建日期',
              startName: 'startDate', // 开始日期字段
              endName: 'endDate', // 结束日期字段
              placeholder: '请选择日期',
              defaultValue: []// 默认值
            }
          ],
          // 表格按钮
          headBtnList: [
            {
              name: '查询',
              type: 'primary',
              className: ''
            },
            {
              name: '重置',
              type: 'primary',
              ghost: true,
              className: ''
            },
            {
              name: '添加',
              type: 'normal',
              className: '',
              authority: 'role_add' // 权限
            }]
        },
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '标题',
            dataIndex: 'title'
          },
          {
            title: '描述',
            dataIndex: 'content'
          },
          {
            title: '状态',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '创建人',
            dataIndex: 'creator'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '220px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 查询参数
        queryParam: {},
        // 分组名称
        groups: 'groups_policy',
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          requestParameters.groups = this.groups
          return this.getList(requestParameters)
        }
      }
    },
    filters: {
      state(value) {
        const stateObj = {
          1: '正常',
          2: '禁用'
        }
        return stateObj[value] || ''
      }
    },
    mounted() {

    },
    methods: {
      // 点击
      btnClick(item) {
        if (item.btn.name === '查询') {
          this.onRefresh()
        } else if (item.btn.name === '添加') {
          this.onAdd()
        }
      },
      // 选择
      selectUserChange(item) {
        console.log(item)
      },
      // 筛选 重置
      filtrateChange(item) {
        this.queryParam = item
        // 刷新到第一页
        this.$refs.table.refresh(true)
      },
      // 查询
      getList (data) {
        return baseFieldFindList(data).then(res => {
          return res
        })
      },
      // 编辑
      handleEdit(data) {
        this.editID = data.id
        this.onAdd()
        // 延时回填数据
        setTimeout(() => {
          this.form.setFieldsValue({
            title: data.title,
            content: data.content
          })
        }, 100)
      },
      // 禁用
      handleState(data) {
        const that = this
        this.$confirm({
          title: data.state === 1 ? '禁用提示' : '解禁提示',
          content: `真的要${data.state === 1 ? '禁用' : '解禁'} ${data.title} 吗?`,
          okText: `${data.state === 1 ? '禁用' : '解禁'}`,
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const obj = {
              ids: [],
              state: data.state === 1 ? 2 : 1
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await baseFieldUpdateState(obj)
            if (res) {
              that.$message.info(`${data.state === 1 ? '禁用' : '解禁'}成功`)
              setTimeout(() => {
                that.onRefresh()
              }, 1000)
            }
          }
        })
      },
      // 添加
      onAdd() {
        this.visible = true
        this.form.resetFields()
      },
      // 取消
      handleCancel() {
        this.visible = false
      },
      // 保存
      onSave() {
        this.form.validateFields(async (err, values) => {
          if (!err) {
            const data = { ...values }
            data.groups = this.groups
            data.id = this.editID
            const { returnValue: res } = await baseFieldSaveField(data)
            if (res) {
              this.$message.info('保存成功')
              this.handleCancel()
              setTimeout(() => {
                this.onSearch()
              }, 1000)
            }
          }
        })
      },
      // 删除
      handleDelete(data) {
        const that = this
        this.$confirm({
          title: '删除提示',
          content: `真的要删除 ${data.title} 吗?`,
          okText: '删除',
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const obj = {
              ids: []
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await baseFieldDeleteAll(obj)
            if (res) {
              that.$message.info('删除成功')
              setTimeout(() => {
                that.onRefresh()
              }, 1000)
            }
          }
        })
      },
      // 刷新当前页
      onRefresh() {
        this.$refs.table.refresh()
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
