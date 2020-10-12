<template>
  <div>
    <table-search :searchDataSource="searchDataSource" @change="tableSearchChange"></table-search>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ y: 440 }"
      class="m-t10"
    >
      <span slot="state" slot-scope="text">
        {{ text | state }}
      </span>
    </s-table>
  </div>
</template>

<script>
  import { baseUserFindList } from '@/api/cygmNormPro'
  import { STable, Ellipsis, TableSearch } from '@/components'
  export default {
    name: 'ChooseUser',
    components: {
      STable,
      TableSearch,
      Ellipsis
    },
    props: {
      record: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        // 表头
        columns: [
          {
            title: '名称',
            dataIndex: 'name'
          },
          {
            title: '手机号码',
            dataIndex: 'phone'
          },
          {
            title: '邮箱账号',
            dataIndex: 'email'
          },
          {
            title: '性别',
            dataIndex: 'sex'
          },
          {
            title: '状态',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' }
          }
        ],
        // 搜索数据源
        searchDataSource: [
          {
            type: 'text', // 控件类型
            labelText: '关键字', // 控件显示的文本
            fieldName: 'keyword',
            placeholder: '请输入关键字' // 默认控件的空值文本
          }
        ],
        // 查询参数
        queryParam: {
        },
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          console.log('提交参数', requestParameters)
          return this.getList(requestParameters)
        },
        // 选中的key
        selectedRowKeys: [],
        // 选中的行
        selectedRows: []
      }
    },
    filters: {
      state(value) {
        const stateObj = {
          1: '正常',
          2: '冻结'
        }
        return stateObj[value] || ''
      }
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          type: 'radio',
          onChange: this.onSelectChange
        }
      }
    },
    created () {
    },
    mounted () {
      // 回填数据
      this.$nextTick(() => {
        this.selectedRowKeys = this.record
      })
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
          this.onSearch() // 刷新到第一页
        } else if (obj.type === 'reset') {
          // 执行了重置
          this.onSearch() // 刷新到第一页
        }
      },
      // 刷新当前页
      onRefresh() {
        this.$refs.table.refresh()
      },
      // 搜索 刷新到第一页
      onSearch () {
        this.$refs.table.refresh(true)
      },
      // 查询
      getList (data) {
        return baseUserFindList(data).then(res => {
          return res
        })
      },
      // 选择
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      // 弹框确认
      onOk () {
        if (this.selectedRowKeys.length) {
          return new Promise(resolve => {
            // 选中的值传回去
            resolve(this.selectedRows)
          })
        } else {
          this.$message.error('请选择客户')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
