<template>
  <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
    <div v-show="showList">
      <table-search :searchDataSource="searchDataSource" @change="tableSearchChange">
        <template v-slot:extra>
          <a-button class="m-l10" type="normal" v-action:role_add @click="onAdd">添加</a-button>
        </template>
      </table-search>
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
        class="m-t10"
      >
        <span slot="type" slot-scope="text">
          {{ text | isType }}
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a class="table-look" v-action:role_info @click="handleLook(record)">查看</a>
            <span v-action:role_edit>
              <a-divider type="vertical"/>
              <a class="table-edit" @click="handleEdit(record)">编辑</a>
            </span>
            <span v-action:role_delete>
              <a-divider type="vertical"/>
              <a class="table-delete" @click="handleDelete(record)">删除</a>
            </span>
          </template>
        </span>
      </s-table>
    </div>
    <!-- 详情页面 -->
    <role-info v-if="showInfo" @editClose="editClose" :editID="editID"></role-info>
    <!--添加页面-->
    <role-add v-if="showAdd" @editClose="editClose" :editID="editID"></role-add>
  </a-card>
</template>

<script>
  import { baseRoleFindList, baseRoleDeleteAll } from '@/api/cygmNormPro'
  import { STable, Ellipsis, TableSearch } from '@/components'
  import RoleInfo from './RoleInfo'
  import RoleAdd from './RoleAdd'

  export default {
    name: 'RoleList',
    components: {
      STable,
      Ellipsis,
      RoleInfo,
      TableSearch,
      RoleAdd
    },
    data() {
      return {
        showList: true,
        showAdd: false,
        showInfo: false,
        editID: '', // 编辑id
        // 搜索数据源
        searchDataSource: [
          {
            type: 'text', // 控件类型
            labelText: '关键字', // 控件显示的文本
            fieldName: 'keyword',
            placeholder: '请输入关键字' // 默认控件的空值文本
          },
          {
            labelText: '创建日期',
            type: 'datetimeRange',
            fieldName: 'createDate',
            startName: 'startDate', // 开始日期字段
            endName: 'endDate', // 结束日期字段
            placeholder: ['开始日期', '选择日期']
          }
        ],
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '角色名称',
            dataIndex: 'name'
          },
          {
            title: '描述',
            dataIndex: 'content'
          },
          {
            title: '类型',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' }
          },
          {
            title: '创建人',
            dataIndex: 'creator'
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
      isType(value) {
        const typeObj = {
          1: '管理员角色',
          2: '企业角色'
        }
        return typeObj[value] || ''
      }
    },
    computed: {},
    created() {
    },
    methods: {
      // 搜索框改变
      tableSearchChange(obj) {
        this.queryParam = obj.queryParams
        if (obj.type === 'submit') {
          // 执行查询
          this.onRefresh() // 刷新当前页
        } else if (obj.type === 'filtrate') {
          // 执行了筛选
          this.$refs.table.refresh(true) // 刷新到第一页
        } else if (obj.type === 'reset') {
          // 执行了重置
          this.$refs.table.refresh(true) // 刷新到第一页
        }
      },
      // 查询
      getList(data) {
        return baseRoleFindList(data).then(res => {
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
      handleLook(data) {
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
      editClose() {
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
            const { returnValue: res } = await baseRoleDeleteAll(obj)
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
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
