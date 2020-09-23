<template>
  <div>
    <a-form layout="inline">
      <a-form-item
        :wrapperCol="{span: 24 }">
        <a-input name="keyword" placeholder="请输入关键字" v-model="queryParam.keyword" @change="onSearch"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">查询</a-button>
        <a-button class="m-l10" @click="onReset" type="primary" ghost>重置</a-button>
      </a-form-item>
    </a-form>
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
  import { STable, Ellipsis } from '@/components'
  export default {
    name: 'ChooseUser',
    components: {
      STable,
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
      // 搜索
      onSearch () {
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset () {
        this.queryParam = {}
        this.onSearch()
      },
      // 查询
      getList (data) {
        return baseUserFindList(data).then(res => {
          return res
        })
      },
      // 选择
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys)
        console.log(selectedRows)
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
