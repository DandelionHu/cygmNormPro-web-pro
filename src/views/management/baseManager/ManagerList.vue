<template>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div v-show="showList">
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
          <img slot="photo" slot-scope="text" :src="text" />
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a class="table-look" v-action:manager_info @click="handleLook(record)">查看</a>
              <span v-if="record.isAdmin==0">
                <span v-action:manager_edit>
                  <a-divider type="vertical"/>
                  <a class="table-edit"  @click="handleEdit(record)">编辑</a>
                </span>
                <span v-action:manager_password>
                  <a-divider type="vertical"/>
                  <a class="table-again"  @click="handleReset(record)">重置密码</a>
                </span>
                <span v-action:manager_delete>
                  <a-divider type="vertical"/>
                  <a class="table-delete"  @click="handleDelete(record)">删除</a>
                </span>
              </span>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 详情页面 -->
      <manager-info v-if="showInfo" @editClose="editClose" :editID="editID"></manager-info>
      <!--添加页面-->
      <manager-add v-if="showAdd" @editClose="editClose" :editID="editID"></manager-add>
    </a-card>
</template>

<script>
  import { baseManagerFindList, baseManagerDeleteAll, baseManagerResetPassword } from '@/api/cygmNormPro'
  import { STable, Ellipsis, TableFiltrate } from '@/components'
  import ManagerInfo from './ManagerInfo'
  import ManagerAdd from './ManagerAdd'
  export default {
    name: 'ManagerList',
    components: {
      STable,
      Ellipsis,
      TableFiltrate,
      ManagerInfo,
      ManagerAdd
    },
    data () {
      return {
        showList: true,
        showAdd: false,
        showInfo: false,
        editID: '', // 编辑id
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
              authority: 'manager_add' // 权限
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
            title: '名称',
            dataIndex: 'name'
          },
          {
            title: '账号',
            dataIndex: 'account'
          },
          {
            title: '手机号码',
            dataIndex: 'phone'
          },
          {
            title: '性别',
            dataIndex: 'sex'
          },
          {
            title: '头像',
            dataIndex: 'photo',
            scopedSlots: { customRender: 'photo' }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
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
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          return this.getList(requestParameters)
        }
      }
    },
    filters: {
    },
    computed: {
    },
    created () {
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
        return baseManagerFindList(data).then(res => {
          return res
        })
      },
      // 添加
      onAdd() {
        this.editID = ''
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 查看
      handleLook (data) {
        this.editID = data.id
        this.showList = false
        this.showAdd = false
        this.showInfo = true
      },
      // 编辑
      handleEdit(data) {
        this.editID = data.id
        this.showList = false
        this.showInfo = false
        this.showAdd = true
      },
      // 编辑关闭
      editClose () {
        this.showList = true
        this.showAdd = false
        this.showInfo = false
        // 刷新当前页
        this.onRefresh()
      },
      // 删除
      handleDelete(data) {
        const that = this
        this.$confirm({
          title: '删除提示',
          content: `真的要删除 ${data.name} 吗?`,
          okText: '删除',
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const obj = {
              ids: []
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await baseManagerDeleteAll(obj)
            if (res) {
              that.$message.info('删除成功')
              that.onRefresh()
            }
          }
        })
      },
      // 刷新当前页
      onRefresh() {
        this.$refs.table.refresh()
      },
      // 重置密码
      handleReset (data) {
        const that = this
        this.$confirm({
          title: '重置提示',
          content: `真的要重置 ${data.name} 密码吗?`,
          okText: '重置',
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const { returnValue: res, message } = await baseManagerResetPassword({ id: data.id })
            if (res) {
              that.$message.info(message)
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
