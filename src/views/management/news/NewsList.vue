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
        <img :src="text" slot="picture" slot-scope="text"/>
        <span slot="state" slot-scope="text">
          {{ text | state }}
        </span>
        <span slot="isRecommend" slot-scope="text">
          {{ text | isRecommend }}
        </span>
        <span slot="releaseTime" slot-scope="text">
          {{ text | dayjs }}
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a class="table-look" @click="handleLook(record)">查看</a>
            <a-divider type="vertical"/>
            <a class="table-edit" @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
            <template v-if="record.state === 1 || record.state === 3">
              <a
                class="table-again"
                @click="handleState(record)">{{ record.state==1?'禁用':record.state==3?'启用':'' }}</a>
              <a-divider type="vertical"/>
            </template>
            <template v-if="record.state === 2">
              <a class="table-again" @click="handleState(record)">审核</a>
              <a-divider type="vertical"/>
            </template>
            <a class="table-delete" @click="handleDelete(record)">删除</a>
          </template>
        </span>
      </s-table>
    </div>
    <!-- 详情页面 -->
    <news-info v-if="showInfo" @editClose="editClose" :editID="editID"></news-info>
    <!--添加页面-->
    <news-add v-if="showAdd" @editClose="editClose" :editID="editID"></news-add>
  </a-card>
</template>

<script>
  import { baseNewsFindList, baseNewsDeleteAll, baseNewsUpdateState } from '@/api/cygmNormPro'
  import { STable, Ellipsis } from '@/components'
  import NewsInfo from './NewsInfo'
  import NewsAdd from './NewsAdd'

  export default {
    name: 'NewsList',
    components: {
      STable,
      Ellipsis,
      NewsInfo,
      NewsAdd
    },
    data() {
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
            title: '标题',
            dataIndex: 'title'
          },
          {
            title: '封面图片',
            dataIndex: 'picture',
            scopedSlots: { customRender: 'picture' }
          },
          {
            title: '来源于',
            dataIndex: 'source'
          },
          {
            title: '作者',
            dataIndex: 'author'
          },
          {
            title: '栏目',
            dataIndex: 'fieldName'
          },
          {
            title: '公司',
            dataIndex: 'enterpriseName'
          },
          {
            title: '状态',
            dataIndex: 'state',
            scopedSlots: { customRender: 'state' }
          },
          {
            title: '是否推荐',
            dataIndex: 'isRecommend',
            scopedSlots: { customRender: 'isRecommend' }
          },
          {
            title: '发布时间',
            dataIndex: 'releaseTime',
            scopedSlots: { customRender: 'releaseTime' }
          },
          {
            title: '点击次数',
            dataIndex: 'clickNum'
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
        // 类型
        type: 1, // 1资讯，2政策
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          requestParameters.type = this.type
          return this.getList(requestParameters)
        }
      }
    },
    filters: {
      state(value) {
        const stateObj = {
          1: '正常',
          2: '待审',
          3: '禁用',
          4: '不通过'
        }
        return stateObj[value] || ''
      },
      isRecommend(value) {
        const isRecommendObj = {
          1: '是',
          0: '否'
        }
        return isRecommendObj[value] || ''
      }
    },
    computed: {},
    created() {
    },
    methods: {
      // 搜索
      onSearch() {
        // 刷新到第一页
        this.$refs.table.refresh(true)
      },
      // 重置
      onReset() {
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
      getList(data) {
        return baseNewsFindList(data).then(res => {
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
          content: `真的要删除 ${data.title} 吗?`,
          okText: '删除',
          okType: 'primary',
          cancelText: '取消',
          async onOk() {
            const obj = {
              ids: []
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await baseNewsDeleteAll(obj)
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
      // 禁用
      handleState(data) {
        const that = this
        const stateObject = {
          1: '禁用',
          2: '审核通过',
          3: '启用'
        }
        this.$confirm({
          title: stateObject[data.state] + '提示',
          content: `真的要${stateObject[data.state]}${data.title} 吗?`,
          okText: `${stateObject[data.state]}`,
          okType: 'primary',
          cancelText: data.state === 2 ? '不通过' : '取消',
          async onOk() {
            const obj = {
              ids: [],
              state: data.state === 1 ? 3 : 1
            }
            obj.ids.push(data.id)
            const { returnValue: res } = await baseNewsUpdateState(obj)
            if (res) {
              that.$message.info(`${stateObject[data.state]}成功`)
              setTimeout(() => {
                that.onRefresh()
              }, 1000)
            }
          },
          async onCancel() {
            if (data.state === 2) {
              const obj = {
                ids: [],
                state: 4
              }
              obj.ids.push(data.id)
              const { returnValue: res } = await baseNewsUpdateState(obj)
              if (res) {
                that.$message.info(`${stateObject[data.state]}成功`)
                setTimeout(() => {
                  that.onRefresh()
                }, 1000)
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
