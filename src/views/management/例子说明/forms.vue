<template>
  <div>
    <editForms
      :editData="editData"
      :items="items"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      @on_submit="onSubmit"
      @onCancel="onCancel" />
  </div>
</template>

<script>
  import editForms from '@/components/EditForm/index'
  const img = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600746677884&di=d75d63c5e5a1da81b7ccbc9c995d9e73&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F14ce36d3d539b6002ac5706de850352ac75cb7e4.jpg`
  export default {
    editForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    components: {
      editForms
    },
    watch:{
      editForm:{
        handler(){
          this.editData= { ...this.editForm }
        },
        deep:true
      }
    },
    data () {
      return {
        editData: {},
        labelCol:{lg: {span: 2}, sm: {span: 3}}, //form的整体配置
        wrapperCol:{lg: {span: 6}, sm: {span: 6}},
        items: [
          {
            title:'分类：', // lable
            width: '', // 宽度 Number 不传就auto
            name: 'category_id', // 对应字段

            type: 'select', // string  password textarea number  date  select ratio checkbox  img   BaiduFulltext(百度富文本)   expression(带有表情的文本框还没有加上),
            enable: '', // disabled  true 不可以输入 false 或不填 为可输入
            placeholder: '请选择分类', //提示
            desc: '活动时效为空时，默认为当前时间后3天', //其他提示
            descStyle: {
              color: 'red',
              fontSize: '20px'
            }, //提示语样式
            labelCol:{lg: {span: 2}, sm: {span: 3}},// 单独配置
            wrapperCol:{lg: {span: 6}, sm: {span: 6}},
            required: true, // true false 是否为必须填写？
            validate: [ // required为true时 必填
              { required: true, message: '请选择分类', trigger: 'blur' },
              { required: true, message: '请选择分类', trigger: 'change' }
            ],
            /**
             * select ratio checkbox 是使用这三个时需要传 options
             *
             */
            options: [ // 选择item
              {
                label: 'label',
                value: 1
              }
            ],
          },
          {
            title: '时间：',
            name: 'startName',
            startName: 'startName', //开始日期字段
            endName: 'endName',//结束日期字段
            desc: '活动时效为空时，默认为当前时间后3天',
            type: 'date',
            placeholder: '请选择活动时效',
          },

          {
            title: '图片数组：',
            num: 3, //上传张数
            name: 'images',
            type: 'images',
          },
          {
            title: '富文本：',
            name: 'BaiduFulltext',
            type: 'BaiduFulltext'
          },
          {
            title: 'radio：',
            name: 'radio',
            type: 'radio',
            options: [ // 选择item
              {
                label: 'label',
                value: 1
              },
              {
                label: 'label2',
                value: 2
              },
              {
                label: 'label3',
                value: 3
              },
            ],
          },

          {
            title: 'checkbox：',
            name: 'checkbox',
            type: 'checkbox',
            options: [ // 选择item
              {
                label: 'label',
                value: 1
              }
            ],
          },

        ]

      }
    },
    //方法
    methods: {
      //保存按钮
      onSubmit (item) {
        console.log(item, '保存按钮')
      },
      // 取消按钮
      onCancel () { },
    },
    //计算属性
    computed: {

    },
    mounted () {
      // 测试数据
      const editData = {
        category_id: '1', //选择器
        startName: '1422222222', //开始时间
        endName: '1622222222',// 结束时间
        images: [{ status: 'done', uid: img, name: img, url: img }], //图片
        checkbox:[1],// checkbox
        radio:1,// radio
        BaiduFulltext:'88888888888', // 百度富文本
      }
      this.editData = { ...editData }

    },
  }
</script>

<style scoped lang="less">
</style>
