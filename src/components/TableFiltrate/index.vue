<template>
  <div>
    <div class="seek-box">
      <div
        class="seekItemBox"
        v-for="(item,index) in filtrate.seek"
        :key="index">
        <span
          class="item-label"
          v-if="item && item.label">{{ item.label }}</span>
        <!--						文本框 选择用户-->
        <a-input
          v-if="item.type === 'input'||item.type === 'selectUser'"
          :disabled="item.type === 'selectUser'"
          v-model="seek[item.name]"
          :placeholder="item.placeholder || '请输入内容'"
          allowClear
          class="seek-item"/>
        <a-button
          v-if="item.type === 'selectUser'"
          type="primary"
          class="m-l10"
          @click="selectUserChange(item)">{{ item.btnName||'选择' }}
        </a-button>
        <!--						下拉框-->
        <a-select
          clearIcon
          v-model="seek[item.name]"
          v-if="item.type === 'select'"
          class="seek-item select-item"
          :placeholder="item.placeholder || '请选择'"
          allowClear>
          <a-select-option
            v-for="(item,index) in item.options"
            :value="item.value"
            :key="index">{{ item.label }}
          </a-select-option>
        </a-select>

        <!--					日期-->
        <a-range-picker
          class="seek-item"
          style="width: auto"
          format="YYYY-MM-DD"
          v-if="item.type === 'date'"
          @change="onDateChange"
          :value="createValue"
          :placeholder="['开始时间','结束时间']"/>
        <!--					单选-->
        <a-radio-group
          class="seek-item"
          style="width: auto"
          v-model="seek[item.name]"
          v-if="item.type === 'radio'"
          :default-value="item.defaultValue">
          <a-radio-button
            v-for="(item,index) in item.options"
            :value="item.value"
            :key="index">
            {{ item.label }}
          </a-radio-button>

        </a-radio-group>
        <!--					复选框-->
        <a-checkbox-group
          class="seek-item"
          style="width: auto"
          v-model="seek[item.name]"
          v-if="item.type === 'checkbox'"
          name="checkboxgroup"
          :options="item.options"/>
      </div>
      <div class="btnBox">
        <a-button
          :class="['btnItem',item.className]"
          v-for="(item, index) in filtrate.headBtnList"
          @click="ListBtnClick(item)"
          :type="item.type || ''"
          :style="item.style"
          :key="index">{{ item.name }}
        </a-button>
        <a-button
          v-if="filtrate.resetBtn"
          class="btnItem ant-btn-primary ant-btn-background-ghost"
          @click="resetBtn">重置
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      filtrate: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        seek: {}, // 筛选
        createValue: [],
        checkbox: [],
        selectUser: {}// 选中的客户
      }
    },
    watch: {
      'filtrate.seek': {
        handler() {
          this.filtrate.seek.forEach(val => {
            if (val.type === 'selectUser') {
              const value = val.defaultValue ? val.defaultValue.name : ''
              this.selectUser = val.defaultValue ? val.defaultValue : {}
              this.$set(this.seek, val.name, value)
            }
          })
        },
        deep: true
      }
    },
    methods: {
      // 重置筛选条件
      resetBtn() {
        this.createValue = []

        this.forEachSeek('reset')
        this.getParameter()
      },
      // 日期选择
      onDateChange(time, dateStrings) {
        this.createValue = dateStrings
        this.getParameter()
      },
      // 自定义按钮的点击事件 发回父级处理
      ListBtnClick(btn) {
        this.$emit('btnClick', {
          btn: btn
        })
      },
      // 选择按钮
      selectUserChange(item) {
        this.$emit('selectUserChange', item)
      },
      // 获取筛选参数返回
      getParameter() {
        const o = { ...this.seek }
        if (this.filtrate && this.filtrate.seek && this.filtrate.seek.length) {
          this.filtrate.seek.forEach(e => {
            if (e.type === 'date') {
              o[e.startName] = this.createValue.length ? this.createValue[0] : ''
              o[e.endName] = this.createValue.length ? this.createValue[1] : ''
              delete o[e.name]
            }
            if (e.type === 'selectUser' && JSON.stringify(this.selectUser) !== '{}') {
              o[e.name] = this.selectUser.id
            }
          })
        }
        this.$emit('filtrateChange', o)
      },
      forEachSeek(_type) {
        if (this.filtrate.seek && this.filtrate.seek.forEach) {
          this.filtrate.seek.forEach(val => {
            let value
            switch (val.type) {
              case 'select':
                value = val.defaultValue ? val.defaultValue : undefined
                break
              case 'selectUser':
                value = _type === 'reset' ? '' : val.defaultValue ? val.defaultValue.name : ''
                this.selectUser = _type === 'reset' ? {} : val.defaultValue ? val.defaultValue : {}
                break
              case 'checkbox':
                value = val.defaultValue ? val.defaultValue : []
                break
              default:
                value = val.defaultValue ? val.defaultValue : ''
            }
            this.$set(this.seek, val.name, value)
          })
        }
      }
    },
    mounted() {
      this.forEachSeek()
      // 监听筛选
      this.$watch('seek', {
        handler() {
          this.getParameter()
        },
        deep: true
      })
    }
  }
</script>

<style scoped lang="less">
  .seek-box {
    box-sizing: border-box;
    min-height: 28px;
    width: 100%;

    .btnBox {
      /*padding-left: 20px;*/
      display: inline-block;
      margin-top: 10px;
      vertical-align: middle;

      .btnItem {
        margin-right: 10px;
      }
    }

    .item-label {
      color: #333333;
      margin-right: 3px;
      /*padding-left: 10px;*/
      font-size: 14px;
    }

    .select-item {
      display: inline-block;
      vertical-align: middle;
    }

    .seekItemBox {
      margin-top: 8px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 20px;
    }

    .seek-item {
      width: 200px;
    }

    .dateTime {
      width: 325px;
      margin-right: 20px;
    }

    .select {
      width: 120px;
      padding: 0 0 !important;
    }

    .seek-input-list-item {
      width: 380px;

      .el-input-group__prepend {
        background-color: #fff;
      }
    }
  }
</style>
