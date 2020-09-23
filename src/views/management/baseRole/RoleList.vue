<template>
  <page-header-wrapper>
    <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
      <div v-show="showList">
        <a-form layout="inline">
          <a-form-item
            class="width250"
            label="关键字"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
          </a-form-item>
          <a-form-item
            class="width250"
            label="类型"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-select v-model="queryParam.type" placeholder="请选择" default-value="" @change="onSearch">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">管理员角色</a-select-option>
              <a-select-option value="2">企业角色</a-select-option>
            </a-select>
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
          <span slot="type" slot-scope="text">
            {{ text | isType }}
          </span>
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a class="table-look" @click="handleLook(record)">查看</a>
              <a-divider type="vertical"/>
              <a class="table-edit" @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical"/>
              <a class="table-delete" @click="handleDelete(record)">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 详情页面 -->
      <role-info v-if="showInfo" @editClose="editClose" :editID="editID"></role-info>
      <!--添加页面-->
      <role-add v-if="showAdd" @editClose="editClose" :editID="editID"></role-add>
    </a-card>
  </page-header-wrapper>
</template>

<script>
  import { baseRoleFindList, baseRoleDeleteAll } from '@/api/cygmNormPro'
  import { STable, Ellipsis } from '@/components'
  import RoleInfo from './RoleInfo'
  import RoleAdd from './RoleAdd'
  export default {
    name: 'RoleList',
    components: {
      STable,
      Ellipsis,
      RoleInfo,
      RoleAdd
    },
    data () {
      return {
        showList: true,
        showAdd: false,
        showInfo: false,
        editID: '', // 编辑id
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
        // 日期
        searchData: [],
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
    computed: {
    },
    created () {
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
