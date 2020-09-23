<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <a-form layout="inline">
        <a-form-item
          class="width250"
          label="关键字"
          :labelCol="{span: 8 }"
          :wrapperCol="{span: 16 }">
          <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
        </a-form-item>
        <a-form-item
          label="创建日期"
          :labelCol="{span: 6 }"
          :wrapperCol="{span: 18 }">
          <a-range-picker
            :placeholder="['开始日期', '结束日期']"
            v-model="searchData"
            @change="onDateChange"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSearch">查询</a-button>
          <a-button class="m-l10" @click="onReset" type="primary" ghost>重置</a-button>
          <a-button class="m-l10" @click="onAdd" type="normal">添加</a-button>
        </a-form-item>
      </a-form>
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
  </page-header-wrapper>
</template>

<script>
  import { baseFieldSaveField, baseFieldFindList, baseFieldDeleteAll, baseFieldUpdateState } from '@/api/cygmNormPro'
  import { STable, Ellipsis } from '@/components'
  export default {
    name: 'RecruitTag',
    components: {
      STable,
      Ellipsis
    },
    data () {
      return {
        // 弹框
        editID: '',
        form: this.$form.createForm(this),
        visible: false,
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
        // 日期
        searchData: [],
        // 分组名称
        groups: 'groups_recruit',
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
      // 搜索
      onSearch () {
        // 刷新到第一页
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset () {
        this.queryParam = {}
        this.searchData = []
        this.onSearch()
      },
      // 日期
      onDateChange(date, dateString) {
        this.queryParam.startDate = dateString[0]
        this.queryParam.endDate = dateString[1]
        this.onSearch()
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
