<template>
    <a-card
      :body-style="{padding: '15px 20px'}"
      :bordered="false">
      <div v-if="!showAdd">
        <TableFiltrate
          :filtrate="filtrate"
          @btnClick="btnClick"
          @selectUserChange="selectUserChange"
          @filtrateChange="filtrateChange"/>
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          showPagination="auto"
          class="m-t10">
          <img
            class="advImg"
            :src="text"
            slot="content"
            slot-scope="text"/>
          <span
            slot="action"
            slot-scope="text, record">
            <template>

              <a
                class="table-edit"
                @click="handleEdit(record,'edit')">编辑</a>
              <a-divider type="vertical"/>
              <a
                class="table-delete"
                @click="handleEdit(record,'del')">删除</a>
            </template>
          </span>
        </s-table>
      </div>
      <!-- 编辑 添加 -->
      <banner-add
        v-if="showAdd"
        ref="forms"
        :editForm="editForm"
        @dataChange="dataChange"
        @onCancel="showAdd = false"/>
    </a-card>
</template>
<script>
  import { baseFieldFindList, baseFieldDeleteAll } from '@/api/cygmNormPro'
  import { STable, TableFiltrate } from '@/components'
  import BannerAdd from './BannerAdd'

  export default {
    name: 'BannerList',
    components: {
      TableFiltrate,
      BannerAdd,
      STable
    },
    data() {
      return {
        showAdd: false,
        editForm: {},
        // 表头
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            customRender: (text, record, index) => index + 1
          },
          {
            title: '广告图片',
            dataIndex: 'content',
            scopedSlots: { customRender: 'content' }
          },
          {
            title: '链接地址',
            dataIndex: 'others'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '220px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          // 将所有可枚举属性的值从一个或多个源对象复制到目标对象
          const requestParameters = Object.assign({}, parameter, this.queryParam)
          requestParameters.type = this.type
          return this.getList(requestParameters)
        },
        filtrate: {
          resetBtn: false, // 是否显示重置按钮
          // 表格按钮
          headBtnList: [
            {
              name: '新增',
              className: 'ant-btn-normal'
            }
          ]
        }
      }
    },
    methods: {
      // form 发生改变时
      dataChange() {
      },
      // 自定义按钮事件
      btnClick() {
        this.editForm = {}
        this.showAdd = !this.showAdd
      },
      // 查询
      getList(data) {
        data.groups = 'groups_banner'

        return baseFieldFindList(data).then(res => {
          return res
        })
      },
      // 编辑、删除
      handleEdit(row, _type) {
        const that = this
        if (_type === 'edit') {
          const { id, others } = { ...row }
          let { content } = { ...row }
          this.showAdd = true
           content = [{
            status: 'done',
            uid: content,
            name: content,
            url: content
          }]
          this.editForm = { id, content, others, checkbox: [1], radio: 1 }
        } else {
          this.$confirm({
            title: '删除提示',
            content: `真的要删除吗?`,
            okText: '删除',
            okType: 'primary',
            cancelText: '取消',
            async onOk() {
              const obj = {
                ids: []
              }
              obj.ids.push(row.id)
              const { returnValue: res } = await baseFieldDeleteAll(obj)
              if (res) {
                that.$message.info('删除成功')
                setTimeout(() => {
                  that.onRefresh()
                }, 1000)
              }
            }
          })
        }
      },
      // 刷新当前页
      onRefresh() {
        this.$refs.table.refresh()
      },

      // 表格头部筛选发生改变时触发
      filtrateChange(item) {
        console.log(item, 'filtrateChange')
      },
      // 点击选择按钮 要改变seek 里的默认值
      selectUserChange(item) {
        item.defaultValue = {
          name: '123456',
          id: 1
        }
        this.filtrate.seek.forEach(val => {
          if (val.type === item.type) {
            val = item
          }
        })
      }
    }

  }
</script>

<style lang="less" scoped>
  .advImg {
    max-width: 800px;
  }
</style>
