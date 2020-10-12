<template>
  <a-card :body-style="{padding: '15px 20px'}" :bordered="false">
    <div v-show="showList">
      <table-search :searchDataSource="searchDataSource" :chooseName="userInfo.name"  @change="tableSearchChange" @chooseChange="onChoose">
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
        <img slot="photo" slot-scope="text" :src="text" />
        <span slot="state" slot-scope="text">
          {{ text | state }}
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a class="table-look" v-action:resume_info @click="handleLook(record)">查看</a>
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
  import { STable, Ellipsis, TableSearch } from '@/components'
  import ResumeInfo from './UserInfo'
  import ChooseUser from './ChooseUser'
  export default {
    name: 'ResumeList',
    components: {
      STable,
      Ellipsis,
      ResumeInfo,
      TableSearch,
      ChooseUser
    },
    data () {
      return {
        showList: true,
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
            type: 'chooseText', // 控件类型
            labelText: '选择用户', // 控件显示的文本
            fieldName: 'userName',
            placeholder: '请选择用户' // 默认控件的空值文本
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
        // 用户
        userInfo: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
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
      // 搜索框改变
      tableSearchChange(obj) {
        if (obj.queryParams.userName) {
          obj.queryParams.userId = this.userInfo.id
          delete obj.queryParams.userName
        }
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
      // 搜索
      onSearch () {
        // 刷新到第一页
        this.$refs.table.refresh(true)
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
              maskClosable: false,
              cancelText: '取消',
              okText: '确认'
            })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
