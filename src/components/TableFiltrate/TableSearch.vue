<template>
  <a-form layout="inline" :form="form" @submit="handleSubmit">
    <a-form-item
      v-for="(item, index) in renderDataSource"
      :key="index"
      v-show="index < SearchGlobalOptions.maxItem || (index >= SearchGlobalOptions.maxItem && collapsed)"
      :label="item.labelText">
      <!--文本框-->
      <a-input
        v-if="item.type === 'text' || item.type === 'chooseText'"
        :disabled="item.type === 'chooseText'"
        :size="item.size ? item.size : 'default'"
        allowClear
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : '' }
        ]"
        @change="handleFiltrate"
        :placeholder="item.placeholder"/>
      <!--选择按钮-->
      <a-button
        v-if="item.type === 'chooseText'"
        type="primary"
        class="m-l10"
        @click="chooseChange(item)">选择</a-button>
      <!--数字输入框-->
      <a-input-number
        v-if="item.type === 'number'"
        :size="item.size ? item.size : 'default'"
        :min="item.min ? item.min : 1"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : '' }
        ]"
        @change="handleFiltrate"
        :placeholder="item.placeholder"/>
      <!--下拉选择-->
      <a-select
        v-if="item.type === 'select'"
        showSearch
        :filterOption="selectFilterOption"
        :size="item.size ? item.size : 'default'"
        allowClear
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : undefined }
        ]"
        @change="handleFiltrate"
        :placeholder="item.placeholder">
        <a-select-option
          v-for="(itemoption, indexOption) in item.options"
          :value="itemoption.value"
          :key="indexOption">
          {{ itemoption.label }}
        </a-select-option>
      </a-select>
      <!--单选-->
      <a-radio-group
        v-if="item.type === 'radio' && Array.isArray(item.options)"
        :size="item.size ? item.size : 'default'"
        @change="handleFiltrate"
        buttonStyle="solid"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : '' }
        ]">
        <a-radio-button
          v-for="(itemRadio,indexRadio) in item.options"
          :key="indexRadio"
          :value="itemRadio.value">
          {{ itemRadio.label }}
        </a-radio-button>
      </a-radio-group>
      <!--时间选择-->
      <a-date-picker
        v-if="item.type === 'datetime'"
        :size="item.size ? item.size : 'default'"
        :placeholder="item.placeholder"
        @change="handleFiltrate"
        format="YYYY-MM-DD"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : null }
        ]"></a-date-picker>
      <!--范围选择-->
      <a-range-picker
        v-if="item.type === 'datetimeRange'"
        :size="item.size ? item.size : 'default'"
        format="YYYY-MM-DD"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : null }
        ]"
        @change="handleCreateDate"
        :placeholder="item.placeholder"/>
      <a-radio-group
        v-if="item.type === 'radioDate' && Array.isArray(item.options)"
        :size="item.size ? item.size : 'default'"
        @change="handleRadioDate"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : '' }
        ]">
        <a-radio-button
          v-for="(itemRadio,indexRadio) in item.options"
          :key="indexRadio"
          :value="itemRadio.value">
          {{ itemRadio.label }}
        </a-radio-button>
      </a-radio-group>
      <!--多选-->
      <a-checkbox-group
        v-if="item.type === 'checkbox'"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : '' }
        ]"
        @change="handleFiltrate"
        :options="item.options"/>
      <!--级联选择-->
      <a-cascader
        v-if="item.type === 'cascader'"
        :size="item.size ? item.size : 'default'"
        :options="item.options"
        :showSearch="{ cascaderFilter }"
        v-decorator="[
          item.fieldName,
          { initialValue: item.defaultValue ? item.defaultValue : [] }
        ]"
        @change="handleFiltrate"
        :placeholder="item.placeholder"
      />
    </a-form-item>
    <a-form-item>
      <a-button class="m-l10" type="primary" @click="handleSubmit">查询</a-button>
      <a-button class="m-l10" type="primary" ghost @click="resetSearchForm">重置</a-button>
      <!--其他按钮插槽-->
      <slot name="extra"/>
      <template v-if="maxItem < renderDataSource.length">
        <a @click="togglecollapsed" class="m-l10">
          {{ collapsed ? '收起' : '展开' }}
          <a-icon :type="collapsed ? 'up' : 'down'"/>
        </a>
      </template>
    </a-form-item>
  </a-form>
</template>
<script>
  import { getTodayDate, getYesterdayDate, getCurrentWeekDate, getCurrentMonthDate } from '@/utils/dateFormat'
  export default {
    computed: {
      SearchGlobalOptions() {
        // 全局配置
        return {
          maxItem: this.maxItem,
          size: this.size,
          immediate: this.datetimeTotimeStamp
        }
      },
      renderDataSource() {
        // 重组传入的数据，合并全局配置，子项的配置优先全局
        return this.searchDataSource.map(item => ({ ...this.SearchGlobalOptions, ...item }))
      }
    },
    props: {
      // 是否把时间控件的返回值全部转为时间戳
      datetimeTotimeStamp: {
        type: Boolean,
        default: false
      },
      // 超过多少个折叠
      maxItem: {
        type: Number,
        default: 3
      },
      // 控件规格大小(大部分都有default,small,large)
      size: {
        type: String,
        default: 'default'
      },
      // 就是需要渲染控件的数据源
      searchDataSource: {
        type: Array,
        default: function () {
          return [
            {
              type: 'text', // 控件类型
              labelText: '控件名称', // 控件显示的文本
              fieldName: 'formField1',
              placeholder: '文本输入区域' // 默认控件的空值文本
            },
            {
              labelText: '数字输入框',
              type: 'number',
              fieldName: 'formField2',
              placeholder: '这是一个数字输入框'
            },
            {
              labelText: '下拉框',
              type: 'select',
              fieldName: 'formField3',
              placeholder: '请选择',
              defaultValue: '0',
              options: [
                {
                  label: '全部',
                  value: '0'
                },
                {
                  label: 'text1',
                  value: '1'
                },
                {
                  label: 'text2',
                  value: '2'
                }
              ]
            },
            {
              labelText: '单选框',
              type: 'radio',
              fieldName: 'formField4',
              defaultValue: '1',
              options: [
                {
                  label: '选项1',
                  value: '0'
                },
                {
                  label: '选项2',
                  value: '1'
                }
              ]
            },
            {
              labelText: '日期选择',
              type: 'datetime',
              fieldName: 'formField5',
              placeholder: '选择日期'
            },
            {
              labelText: '日期范围',
              type: 'datetimeRange',
              fieldName: 'createDate', // 固定
              placeholder: ['开始日期', '选择日期']
            },
            {
              labelText: '',
              type: 'radioDate',
              fieldName: 'radioDate', // 固定
              defaultValue: '',
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
            },
            {
              labelText: '多选框',
              type: 'checkbox',
              fieldName: 'formField8',
              defaultValue: ['0', '1'],
              options: [
                {
                  label: '选项1',
                  value: '0'
                },
                {
                  label: '选项2',
                  value: '1'
                }
              ]
            },
            {
              labelText: '联动',
              type: 'cascader',
              fieldName: 'formField9',
              placeholder: '级联选择',
              options: [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'xihu',
                          label: 'West Lake'
                        },
                        {
                          value: 'xiasha',
                          label: 'Xia Sha',
                          disabled: true
                        }
                      ]
                    }
                  ]
                },
                {
                  value: 'jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'zhonghuamen',
                          label: 'Zhong Hua men'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      // 选择的用户名
      chooseName: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // 高级搜索 展开/关闭
        collapsed: false
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this)
    },
    methods: {
      // 下拉框过滤函数
      selectFilterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      // 级联过滤函数
      cascaderFilter(inputValue, path) {
        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
      },
      // 展开 收起
      togglecollapsed() {
        this.collapsed = !this.collapsed
      },
      // 处理表单数据
      handleParams(obj) {
        // 判断必须为obj
        if (!(Object.prototype.toString.call(obj) === '[object Object]')) {
          return {}
        }
        const tempObj = {}
        for (let [key, value] of Object.entries(obj)) {
          // 清除两边空格
          if (key && typeof key === 'string') {
            key = key.trim()
          }
          // 无值
          if (!value) continue
          // 空数组
          if (Array.isArray(value) && value.length <= 0) continue
          // 函数
          if (Object.prototype.toString.call(value) === '[object Function]') continue

          if (this.datetimeTotimeStamp) {
            // 若是为true,则转为时间戳
            if (Object.prototype.toString.call(value) === '[object Object]' && value._isAMomentObject) {
              // 判断moment
              value = value.valueOf()
            }
            if (Array.isArray(value) && value[0]._isAMomentObject && value[1]._isAMomentObject) {
              // 判断moment
              value = value.map(item => item.valueOf())
            }
          } else {
            // 格式化日期
            if (Object.prototype.toString.call(value) === '[object Object]' && value._isAMomentObject) {
              // 判断moment
              value = value.format('YYYY-MM-DD')
            }
            if (Array.isArray(value) && value[0]._isAMomentObject && value[1]._isAMomentObject) {
              // 判断moment
              value = value.map(item => item.format('YYYY-MM-DD'))
            }
          }
          // 若是为字符串则清除两边空格
          if (value && typeof value === 'string') {
            value = value.trim()
          }
          if (key === 'createDate') {
            // 范围
            const { startName, endName } = this.searchDataSource.filter(item => item.fieldName === key)[0]
            tempObj[startName] = value[0]
            tempObj[endName] = value[1]
          } else if (key === 'radioDate' && value) {
            // 今天 昨天 本周 本月
            const { startName, endName } = this.searchDataSource.filter(item => item.fieldName === key)[0]
            let searchData = ''
            switch (value) {
              case 1:
                // 今天
                searchData = getTodayDate()
                break
              case 2:
                // 昨天
                searchData = getYesterdayDate()
                break
              case 3:
                // 本周
                searchData = getCurrentWeekDate()
                break
              case 4:
                // 本月
                searchData = getCurrentMonthDate()
                break
            }
            tempObj[startName] = searchData[0] || ''
            tempObj[endName] = searchData[1] || ''
          } else if (key === 'radioDate' && value) {

          } else {
            tempObj[key] = value
          }
        }
        return tempObj
      },
      // 查询 触发表单提交，也就是搜索按钮
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('处理前的表单数据', values)
            const queryParams = this.handleParams(values)
            this.$emit('change', { queryParams, type: 'submit' })
          }
        })
      },
      // 重置
      resetSearchForm() {
        // 重置整个查询表单
        this.form.resetFields()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('处理前的表单数据', values)
            const queryParams = this.handleParams(values)
            this.$emit('change', { queryParams, type: 'reset' })
          }
        })
      },
      // 筛选
      handleFiltrate() {
        setTimeout(() => {
          // 解决 onchange阶段表单值还未更新
          this.form.validateFields((err, values) => {
            if (!err) {
              console.log('处理前的表单数据', values)
              const queryParams = this.handleParams(values)
              this.$emit('change', { queryParams, type: 'filtrate' })
            }
          })
        }, 10)
      },
      // 本周
      handleRadioDate() {
        if (this.form.getFieldValue('createDate')) {
          this.form.setFieldsValue({
            createDate: null
          })
        }
        this.handleFiltrate()
      },
      // 范围
      handleCreateDate() {
        if (this.form.getFieldValue('radioDate')) {
          this.form.setFieldsValue({
            radioDate: ''
          })
        }
        this.handleFiltrate()
      },
      // 选择
      chooseChange(item) {
        this.$emit('chooseChange', item)
      }
    },
    watch: {
      chooseName(val) {
        const { fieldName } = this.searchDataSource.filter(item => item.type === 'chooseText')[0]
        this.form.setFieldsValue({
          [fieldName]: val
        })
        this.handleFiltrate()
      }
    }
  }
</script>

<style lang="less">
  .ant-input-affix-wrapper {
    width: auto;
  }
  form{
    .ant-select {
      width: 200px;
    }
  }
  .ant-input-number{
    width: 200px;
  }
</style>
