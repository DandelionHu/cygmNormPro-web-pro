<template>
  <div>
    <editForms :editData="editData"
               :items="items"
               @on_submit="onSubmit"
               @onCancel="onCancel" />
  </div>
</template>

<script>
import editForms from '@/components/EditForm/index'
let img = `https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600746677884&di=d75d63c5e5a1da81b7ccbc9c995d9e73&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F14ce36d3d539b6002ac5706de850352ac75cb7e4.jpg`
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
  watch: {
    editForm () {
      this.editData = { ...this.editForm }
    }
  },
  data () {
    return {
      editData: {},
      //fulltext 和expression 还没加上
      items: [
        {
          title: "分类：", //lable 
          elCol: 12, //占一行的多少 不传为24
          width: '', //宽度 Number 不传就auto 
          name: "category_id", // 对应字段
          type: "select", // string  password textarea number  date  select ratio checkbox  img   fulltext(富文本)   expression(带有表情的文本框),
          enable: "", //disabled  true 不可以输入 false 或不填 为可输入
          placeholder: '请选择分类', //提示
          desc: '活动时效为空时，默认为当前时间后3天', //其他提示
          descStyle: {
            color: 'red',
            fontSize: '20px'
          }, //提示语样式
          required: true, // true false 是否为必须填写？
          validate: [ //required为true时 必填
            { required: true, message: "请选择分类", trigger: "blur" },
            { required: true, message: "请选择分类", trigger: "change" }
          ],
          options: [ //选择item
            {
              label: 'label',
              value: 1
            }
          ],
        },
        {
          title: "时间：",
          elCol: 12,
          defaultValue: [],
          name: "startName",
          startName: 'startName', //开始日期字段
          endName: 'endName',//结束日期字段
          desc: '活动时效为空时，默认为当前时间后3天',
          type: "date",
          placeholder: '请选择活动时效',
        },

        {
          title: "图片数组：",
          elCol: 18,
          num: 3, //上传张数
          name: "images",
          type: "images",
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
    let editData = {
      category_id: '',
      startName: '1422222222',
      endName: '1622222222',
      images: [{ status: 'done', uid: img, name: img, url: img }]
    };
    this.editData = { ...editData }

  },
}
</script>

<style scoped lang="scss">
</style>
