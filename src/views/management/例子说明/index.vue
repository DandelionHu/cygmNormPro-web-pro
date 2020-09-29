<template>
  <div>
    <!--
    btnClick：自定义按钮点击事件
    selectUserChange：选择按钮事件
    filtrateChange：筛选发生改变时触发
    -->
    <table-filtrate
      :filtrate="filtrate"
      @btnClick="btnClick"
      @selectUserChange="selectUserChange"
      @filtrateChange="filtrateChange"></table-filtrate>
  </div>
</template>

<script>
  import { TableFiltrate } from '@/components'
  export default {
    name: 'template',
    components: {
      TableFiltrate
    },
    data () {
      return {
        filtrate: {
          className: '',
          seekList: [ // 表格的筛选项
            {
              type: 'input', // 文本框搜索   input（文本框）  select（下拉框）  date(日期) selectUsr（选择用户)
              name: 'name', // 对应的字段
              label: '用户名字', // 文字描述
              placeholder: '请输入名字',
              defaultValue: ''// 默认值
            },
            {
              type: 'selectUser',
              name: 'user', // 对应的字段
              label: '选择用户', // 文字描述
              placeholder: '请选择用户',
              btnName: '选择', // 按钮名称 如果不传默认为：选择
              defaultValue: ''// 默认值
            },
            {
              type: 'select',
              name: 'select',
              label: '下拉选择',
              placeholder: '请选择',
              defaultValue: 1,
              options: [
                {
                  label: '全部',
                  value: ''
                },
                {
                  label: '哈哈',
                  value: 1
                },
                {
                  label: '哈哈1',
                  value: 2
                }
              ]
            },
            {
              type: 'date',
              name: 'date',
              label: '创建日期',
              startName: 'startData', // 开始日期字段
              endName: 'endData', // 结束日期字段
              placeholder: '请选择日期'
            },
            {
              type: 'radio',
              name: 'radio',
              label: '',
              defaultValue: 1,
              options: [
                {
                  label: '哈哈',
                  value: 1
                },
                {
                  label: '哈哈1',
                  value: 2
                },
                {
                  label: '哈哈2',
                  value: 3
                }
              ]
            },
            {
              type: 'checkbox',
              name: 'checkbox',
              label: '',
              defaultValue: [1, 2], // 如果checkBox 默认选中多个时传数组，其他传字符串
              options: [
                {
                  label: '哈哈',
                  value: 1
                },
                {
                  label: '哈哈1',
                  value: 2
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
              className: ''
            }]
        }
      }
    },
    methods: {
      // 自定义按钮事件
      btnClick (item) {
        console.log(item)
      },
      // 筛选发生改变时触发
      filtrateChange (item) {
        console.log(item)
      },
      // 点击选择按钮 要改变seek 里的默认值
      selectUserChange (item) {
        console.log(item)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
