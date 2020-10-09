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
                <a class="table-again"  @click="handleState(record)">{{ record.state==1?'禁用':record.state==3?'启用':''}}</a>
                <a-divider type="vertical"/>
              </template>
              <template v-if="record.state === 2">
                <a class="table-again"  @click="handleState(record)">审核</a>
                <a-divider type="vertical" />
              </template>
              <a class="table-delete" @click="handleDelete(record)">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 详情页面 -->
      <policy-info v-if="showInfo" @editClose="editClose" :editID="editID"></policy-info>
      <!--添加页面-->
      <policy-add v-if="showAdd" @editClose="editClose" :editID="editID"></policy-add>
    </a-card>
</template>

<script>
  import { baseNewsFindList, baseNewsDeleteAll, baseNewsUpdateState, baseFieldFindList } from '@/api/cygmNormPro'
  import { STable, Ellipsis, TableFiltrate } from '@/components'
  import PolicyInfo from './PolicyInfo'
  import PolicyAdd from './PolicyAdd'
  export default {
    name: 'PolicyList',
    components: {
      STable,
      Ellipsis,
      TableFiltrate,
      PolicyInfo,
      PolicyAdd
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
              type: 'select',
              name: 'fieldId',
              label: '选择栏目',
              placeholder: '请选择',
              defaultValue: '',
              options: [
                {
                  label: '全部',
                  value: ''
                }
              ]
            },
            {
              type: 'date',
              name: 'date',
              label: '创建日期',
              startName: 'startDate', // 开始日期字段
              endName: 'endDate', // 结束日期字段
              placeholder: '请选择日期',
              defaultValue: []// 默认值
            },
            {
              type: 'radioDate',
              name: 'radio',
              label: '',
              startName: 'startDate', // 开始日期字段
              endName: 'endDate', // 结束日期字段
              defaultValue: 1,
              options: [
                {
                  label: '今天',
                  value: 1
                },
                {
                  label: '昨天',
                  value: 2
                },
                {
                  label: '本周',
                  value: 3
                },
                {
                  label: '本月',
                  value: 4
                }
              ]
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
        groups: 'groups_policy',
        // 类型
        type: 2, // 1资讯，2政策
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
    computed: {
    },
    created () {
    },
    mounted() {
      this.getTagList()
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
      },
      // 获取栏目
      async getTagList() {
        const data = {
          groups: this.groups
        }
        const { returnValue: res } = await baseFieldFindList(data)
        res.forEach((v, i) => {
          this.filtrate.seekList[1].options.push({
            label: v.title,
            value: v.id
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
