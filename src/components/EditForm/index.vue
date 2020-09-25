<template>
  <div>
    <a-form-model
      ref="formData"
      :model="formData"
      :rules="rules"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-row>
        <a-col :span="item.elCol" v-for="(item, index) in formItems" :key="index">
          <a-form-model-item
            :class="[item.desc?'modelItem':'']"
            :ref="formData[item.name]"
            :label="item.title"
            :prop="item.name"
            :labelCol="item.labelCol"
            :wrapperCol="item.wrapperCol"
            :required="item.required">
            <!-- string类型 -->
            <a-input
              :disabled="item.enable"
              v-if="item.type ==='string'"
              :style="'width:'+item.width+'px;'"
              :placeholder="item.placeholder"
              v-model="formData[item.name]"></a-input>
            <!-- password类型 -->
            <a-input
              :disabled="item.enable"
              v-if="item.type==='password'"
              type="password"
              :style="'width:'+item.width+'px;'"
              :placeholder="item.placeholder"
              v-model="formData[item.name]"></a-input>
            <!-- number类型 -->
            <a-input
              :disabled="item.enable"
              v-if="item.type ==='number'"
              type="number"
              :style="'width:'+item.width+'px;'"
              :placeholder="item.placeholder"
              v-model="formData[item.name]"></a-input>
            <!-- textarea 类型 -->
            <a-input
              :disabled="item.enable"
              v-if="item.type==='textarea'"
              type="textarea"
              :autosize="item.autosize"
              :style="'width:'+item.width+'px;'"
              :placeholder="item.placeholder"
              v-model="formData[item.name]"></a-input>
            <!-- date类型 -->
            <a-range-picker
              class="seek-item"
              v-if="item.type==='date'"
              style="width: auto"
              format="YYYY-MM-DD"
              @change="onDateChange"
              :default-value="(formData[item.startName]&&formData[item.endName])?[moment(switchTime(formData[item.startName]), 'YYYY-MM-DD'), moment(switchTime(formData[item.endName]), 'YYYY-MM-DD')]:null"
              v-model="formData[item.name]"
              :placeholder="['开始时间','结束时间']"></a-range-picker>
            <!-- 下拉框 -->
            <a-select
              clearIcon
              v-if="item.type === 'select'"
              class="seek-item select-item"
              :style="'width:'+item.width+'px;'"
              :placeholder="item.placeholder || '请选择'"
              allowClear
              v-model="formData[item.name]">
              <a-select-option
                v-for="it in item.options"
                :value="it.value"
                :key="it.value">{{ it.label }}
              </a-select-option>
            </a-select>

            <!-- 单选框 -->
            <a-radio-group v-if="item.type === 'radio'" :name="item.name" v-model="formData[item.name]" :options="item.options"/>

            <!-- checkbox类型 -->
            <a-checkbox-group
              class="seek-item"
              v-if="item.type === 'checkbox'"
              style="width: auto"
              v-model="formData[item.name]"
              :name="item.name"
              :options="item.options"></a-checkbox-group>
            <!-- images 类型 -->
            <UploadImg
              v-if="item.type === 'images'"
              @uploadList="getUploadList"
              :keys="item.name"
              :fileList="formData[item.name]?formData[item.name]:[]"
              :num="item.num"/>
            <!--百度富文本-->
            <u-editor
              v-if="item.type === 'BaiduFulltext'"
              :value="formData[item.name]"
              :keys="item.name"
              name="content"
              @change="editorChange"></u-editor>

            <div
              v-if="item.desc"
              :style="item.descStyle"
              class="tips">{{ item.desc }}
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="onSubmit">
          保存
        </a-button>
        <a-button
          style="margin-left: 10px;"
          @click="resetForm">
          重置
        </a-button>
        <a-button
          style="margin-left: 10px;"
          @click="cancel">
          取消
        </a-button>
      </a-form-model-item>

    </a-form-model>
  </div>
</template>
<script>
  import { UploadImg, UEditor } from '@/components'
  import moment from 'moment'

  export default {
    components: {
      UploadImg,
      UEditor
    },
    props: {
      editData: {
        type: Object,
        default() {
          return {}
        }
      },
      labelCol: {
        type: Object,
        default() {
          return {}
        }

      },
      wrapperCol: {
        type: Object,
        default() {
          return {}
        }

      },
      items: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        moment,
        formData: {},
        rules: this.getFormItems('rules'),
        formItems: this.getFormItems(),
        createValue: []
      }
    },
    watch: {
      editData: {
        handler() {
          this.formData = { ...this.editData }
        },
        deep: true
      }
    },
    methods: {
      // 装换时间
      switchTime(time) {
        time += ''
        const dateTime = Number(time.length === 10 ? time + '000' : time)

        const date = new Date(dateTime)
        const Y = date.getFullYear()
        const M = date.getMonth() + 1
        const D = date.getDate()
        return `${Y}/${M}/${D}`
      },
      isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]'
      },
      // 获取 图片数组
      getUploadList(item) {
        console.log(item, 'getUploadList')
        this.formData[item.keys] = item.fileList
      },
      // 日期选择
      onDateChange(time, dateStrings) {
        console.log(time, dateStrings, 'time, dateStrings')
      },
      // 富文本
      editorChange(item) {
        this.formData[item.keys] = item.val
      },
      onSubmit() {
        const that = this
        this.$refs.formData.validate(valid => {
          if (valid) {
            const o = { ...that.formData }
            that.formItems.forEach(e => {
              if (e.type === 'number') {
                o[e.name] = parseInt(o[e.name])
              }
              if (e.type === 'date') {
                if (o[e.name]) {
                  const times = o[e.name]
                  o[e.startName] = times.length ? times[0].format('YYYY-MM-DD') : ''
                  o[e.endName] = times.length ? times[1].format('YYYY-MM-DD') : ''
                }
              }
              if (e.type === 'images') {
                const imgList = []
                o[e.name].forEach(val => {
                  imgList.push(val.url)
                })
                o[e.name] = imgList
              }
            })
            that.$emit('on_submit', o)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm() {
        for (const key in this.formData) {
          if (key !== 'id') {
            this.formData[ key ] = ''
          }
        }
        this.$refs.formData.resetFields()
      },
      cancel() {
        this.resetForm()
        this.$emit('on_cancel')
      },
      getColumnDefault(type) {
        switch (type) {
          case 'string':
            return ''
          case 'number':
            return 0
          case 'date':
            return []
          case 'array':
            return []
          case 'img':
            return ''
          case 'ratio':
            return 0
          default:
            return ''
        }
      },
      getFormItems(_type) {
        // 封装字段
        const list = []
        const rules = {}
        // 字段的封装
        this.items.forEach(item => {
          const value = item.options ? item.options : this.getColumnDefault(item.type)
          list.push({
            name: item.type === 'date' ? null : item.name ? item.name : '',
            elCol: item.elCol ? item.elCol : 24,
            width: item.width ? item.width : '100%',
            title: item.title ? item.title : '', // 标题
            type: item.type ? item.type : 'string', //
            enable: item.enable ? item.enable : false, // 是否禁用
            class: item.class ? item.class : 'success', // 如果类型是按钮，这个是按钮的类型
            autosize: item.autosize ? item.autosize : { minRows: 2, maxRows: 4 },
            options: value,
            placeholder: item.placeholder ? item.placeholder : '请输入内容',
            list_type: item.list_type ? item.list_type : 'picture',
            desc: item.desc ? item.desc : '',
            required: item.required ? item.required : false,
            validate: item.validate ? item.validate : [], // 验证 requie email number array
            startName: item.startName || '',
            endName: item.endName || '',
            num: item.num || 1,
            descStyle: item.descStyle || '',
            labelCol: item.labelCol,
            wrapperCol: item.wrapperCol
          })
        })
        // rule，验证规则
        list.forEach(item => {
          if (item.name === '') {
            // name字段不能为空
            return
          }
          if (!(item.validate instanceof Array) || item.validate.length <= 0 || !item.required) {
            // 为空为不验证
            return
          }

          const rule = []
          item.validate.forEach(el => {
            // 遍历验证属性，生成规则
            rule.push(el)
          })
          rules[item.name] = rule
        })
        return _type === 'rules' ? rules : list
      }
    },
    mounted() {
      console.log(this.editData, 'this.editData')
      this.$nextTick(() => {
        this.formData = { ...this.editData }
      })
    }
  }
</script>

<style scoped lang="less">
  .modelItem {
  }

  .tips {
    line-height: 20px;
  }
</style>
