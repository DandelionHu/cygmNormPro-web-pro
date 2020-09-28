<template>
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
            label="选择用户"
            :labelCol="{span: 8 }"
            :wrapperCol="{span: 16 }">
            <a-input name="keyword" disabled="" placeholder="选择用户" v-model="userInfo.name" @change="onSearch"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onChoose">选择</a-button>
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
          <img slot="photo" slot-scope="text" :src="text" />
          <span slot="state" slot-scope="text">
            {{ text | state }}
          </span>
          <span slot="createTime" slot-scope="text">
            {{ text | dayjs }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a class="table-look" @click="handleLook(record)">查看</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 详情页面 -->
      <resume-info v-if="!showList" @editClose="editClose" :editID="editID"></resume-info>
    </a-card>
</template>

<script>
  import { baseUserResumeFindList } from '@/api/cygmNormPro'
  import { STable, Ellipsis } from '@/components'
  import ResumeInfo from './UserInfo'
  import ChooseUser from './ChooseUser'
  export default {
    name: 'ResumeList',
    components: {
      STable,
      Ellipsis,
      ResumeInfo,
      ChooseUser
    },
    data () {
      return {
        showList: true,
        editID: '', // 编辑id
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '简历标题',
            dataIndex: 'title'
          },
          {
            title: '姓名',
            dataIndex: 'name'
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
            title: '出生年月',
            dataIndex: 'years',
            scopedSlots: { customRender: 'years' }
          },
          {
            title: '学历',
            dataIndex: 'schooling'
          },
          {
            title: '专业',
            dataIndex: 'major'
          },
          {
            title: '工作年限',
            dataIndex: 'workLength'
          },
          {
            title: '求职意向',
            dataIndex: 'intention'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 查询参数
        queryParam: {},
        // 日期
        searchData: [],
        // 用户
        userInfo: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          requestParameters.userId = this.userInfo ? this.userInfo.id : ''
          return this.getList(requestParameters)
        }
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
        this.userInfo = {}
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
        return baseUserResumeFindList(data).then(res => {
          return res
        })
      },
      // 查看
      handleLook (data) {
        this.editID = data.id
        this.showList = !this.showList
      },
      // 编辑关闭
      editClose () {
        this.showList = !this.showList
        // 刷新当前页
        this.$refs.table.refresh()
      },
      // 选择客户
      onChoose() {
        const that = this
        this.$dialog(ChooseUser,
            {
              record: that.userInfo ? [that.userInfo.id] : [],
              on: {
                ok (data) {
                  if (data.length > 0) {
                    that.userInfo = data[0]
                    that.onSearch()
                  }
                },
                cancel () {
                  console.log('取消回调')
                },
                close () {
                  console.log('关闭回调')
                }
              }
            },
            {
              title: '选择客户',
              width: 950,
              centered: true,
              maskClosable: false
            })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
