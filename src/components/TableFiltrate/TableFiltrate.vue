<template>
  <a-form :class="filtrate.className" layout="inline">
    <a-form-item
      v-for="(item,index) in filtrateContent.seekList"
      :key="index"
      :label="item.label">
      <!--文本框-->
      <a-input
        v-if="item.type === 'input'|| item.type === 'selectUser'"
        :disabled="item.type === 'selectUser'"
        v-model="item.defaultValue"
        :name="item.name"
        :placeholder="item.placeholder || '请输入内容'"
        allowClear/>
      <!--选择按钮-->
      <a-button
        v-if="item.type === 'selectUser'"
        type="primary"
        class="m-l10"
        @click="selectUserChange(item)">{{ item.btnName||'选择' }}
      </a-button>
      <!--下拉选择-->
      <a-select
        clearIcon
        v-model="item.defaultValue"
        :name="item.name"
        v-if="item.type === 'select'"
        :placeholder="item.placeholder || '请选择'"
        allowClear>
        <a-select-option
          v-for="(itemoption,indexOption) in item.options"
          :value="itemoption.value"
          :key="indexOption">{{ itemoption.label }}
        </a-select-option>
      </a-select>
      <!--日期选择-->
      <a-range-picker
        format="YYYY-MM-DD"
        v-if="item.type === 'date'"
        @change="onDateChange"
        v-model="item.defaultValue"
        :placeholder="['开始日期','结束日期']"/>
      <a-radio-group
        v-model="item.defaultValue"
        v-if="item.type === 'radioDate'">
        <a-radio-button
          v-for="(itemRadio,indexRadio) in item.options"
          :value="itemRadio.value"
          :key="indexRadio">
          {{ itemRadio.label }}
        </a-radio-button>
      </a-radio-group>
      <!--单选-->
      <a-radio-group
        v-model="item.defaultValue"
        v-if="item.type === 'radio'">
        <a-radio-button
          v-for="(itemRadio,indexRadio) in item.options"
          :value="itemRadio.value"
          :key="indexRadio">
          {{ itemRadio.label }}
        </a-radio-button>
      </a-radio-group>
      <!--多选-->
      <a-checkbox-group
        v-model="item.defaultValue"
        v-if="item.type === 'checkbox'"
        :options="item.options"/>
    </a-form-item>
    <a-form-item>
      <a-button
        :class="['m-l10',item.className]"
        v-for="(item, index) in filtrateContent.headBtnList"
        @click="ListBtnClick(item)"
        :type="item.type || ''"
        :ghost="item.ghost"
        v-action:[item.authority]
        :key="index">{{ item.name }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { getTodayDate, getYesterdayDate, getCurrentWeekDate, getCurrentMonthDate } from '@/utils/dateFormat'
  export default {
    name: 'TableFiltrate',
    props: {
      filtrate: {
        type: Object,
        default: () => {
          return {
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
      }
    },
    data() {
      return {
        filtrateContent: {}, // 复制一份初始值
        searchData: [], // 日期
        selectUser: {} // 选中的客户
      }
    },
    watch: {
      // 监听 seekList 改变
      'filtrateContent': {
        handler() {
          this.getParameter()
        },
        deep: true
      },
      // 父级数据改变
      'filtrate': {
        handler() {
          this.filtrateContent = JSON.parse(JSON.stringify(this.filtrate))
        },
        deep: true
      }
    },
    methods: {
      // 日期选择
      onDateChange(time, dateStrings) {
        this.searchData = dateStrings
        this.filtrateContent.seekList.forEach(e => {
          if (e.type === 'radioDate') {
            e.defaultValue = ''
          }
        })
      },
      // 自定义按钮的点击事件 发回父级处理
      ListBtnClick(btn) {
        if (btn.name === '重置') {
          this.filtrateContent = JSON.parse(JSON.stringify(this.filtrate))
        }
        this.$emit('btnClick', {
          btn: btn,
          nowValue: this.getParameter(true) // 现在值
        })
      },
      // 选择按钮
      selectUserChange(item) {
        this.$emit('selectUserChange', item)
      },
      // 获取筛选参数返回
      getParameter(res) {
        const obj = {}
        if (this.filtrateContent && this.filtrateContent.seekList && this.filtrateContent.seekList.length) {
          this.filtrateContent.seekList.forEach(e => {
            if (e.type === 'date') {
              obj[e.startName] = this.searchData.length ? this.searchData[0] : ''
              obj[e.endName] = this.searchData.length ? this.searchData[1] : ''
            } else if (e.type === 'selectUser' && JSON.stringify(this.selectUser) !== '{}') {
              obj[e.name] = this.selectUser.id
            } else if (e.type === 'radioDate') {
              const defaultValue = e.defaultValue
              if (defaultValue) {
                let searchData = ''
                switch (defaultValue) {
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
                obj[e.startName] = searchData[0] || ''
                obj[e.endName] = searchData[1] || ''
                if (this.searchData.length !== 0) {
                  // 清空时间范围
                  this.initDate()
                }
              }
            } else {
              obj[e.name] = e.defaultValue
            }
          })
        }
        if (res) {
          return obj
        } else {
          // 通知
          this.$emit('filtrateChange', obj)
        }
      },
      // 初始化时间
      initDate() {
        this.filtrateContent.seekList.forEach(e => {
          if (e.type === 'date') {
            this.searchData = []
            e.defaultValue = []
          }
        })
      }
    },
    mounted() {
      // 复制一份初始值 深拷贝 使用内部的数据，不影响父级初始数据
      this.filtrateContent = JSON.parse(JSON.stringify(this.filtrate))
    }
  }
</script>

<style scoped lang="less">
  .ant-input-affix-wrapper {
    width: auto;
  }

  .ant-select {
    width: 200px;
  }
</style>
