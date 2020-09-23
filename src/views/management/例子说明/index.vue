<template>
  <div>
    <!--
btnClick：自定义按钮点击事件
selectUserChange：选择按钮事件
filtrateChange：筛选发生改变时触发
      -->
    <TableFiltrate :filtrate='filtrate'
                   @btnClick="btnClick"
                   @selectUserChange='selectUserChange'
                   @filtrateChange="filtrateChange" />
  </div>
</template>

<script>
import TableFiltrate from '@/components/TableFiltrate/index'
export default {
  name: 'BannerList',
  components: {
    TableFiltrate
  },
  data () {
    return {
      filtrate: {
        resetBtn: false,//是否显示重置按钮
        seek: [
          //表格的筛选项
          {
            type: "input", //文本框搜索   input（文本框）  select（下拉框）  date(日期) selectUsr（选择用户)
            name: "name", //对应的字段
            label: "用户名字", //文字描述
            placeholder: "请输入名字",
            defaultValue: '',//默认值
          },
          {
            type: "selectUser",
            name: "user", //对应的字段
            label: "选择用户", //文字描述
            placeholder: "请选择用户",
            btnName: '5555',//按钮名称 如果不传默认为：选择
            defaultValue: '',//默认值

          },
          {
            type: 'select',
            name: 'select',
            label: '下拉',
            placeholder: '',
            defaultValue: 'option',
            options: [
              {
                label: "哈哈",
                value: "option"
              },
              {
                label: "哈哈1",
                value: "option1"
              },
            ],
          },

          {
            type: 'date',
            name: 'date',
            label: '日期',
            startName: 'startName', //开始日期字段
            endName: 'endName',//结束日期字段
            placeholder: '请选择xxx',
          },
          {
            type: 'radio',
            name: 'radio',
            label: '',
            defaultValue: '',
            options: [
              {
                label: "哈哈",
                value: "option"
              },
              {
                label: "哈哈1",
                value: "option1"
              },
              {
                label: "哈哈2",
                value: "option2"
              }
            ],
          },
          {
            type: 'checkbox',
            name: 'checkbox',
            label: '',
            defaultValue: ['option'], //如果checkBox 默认选中多个时传数组，其他传字符串
            options: [
              {
                label: "哈哈",
                value: "option"
              },
            ],
          },
        ],
        //表格按钮
        headBtnList: [
          {
            name: "新增",
            type: "primary",
            className: 'ant-btn-normal',
            style: {
              background: 'red',
              borderColor: 'red'
            }
          },
          {
            name: "订单积分设置",
            type: "primary",
          }]
      }
    }
  },
  methods: {
    //自定义按钮事件
    btnClick (item) {
      console.log(item)
    },
    //筛选发生改变时触发
    filtrateChange (item) {
      console.log(item, 'filtrateChange');
    },
    //点击选择按钮 要改变seek 里的默认值
    selectUserChange (item) {
      item.defaultValue = {
        name: '123456',
        id: 1,
      }
      this.filtrate.seek.forEach(val => {
        if (val.type === item.type) {
          val = item
        }
      });
    },
  },

}
</script>

<style lang="less" scoped>
</style>
