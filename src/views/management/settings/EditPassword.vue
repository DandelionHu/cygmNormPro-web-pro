<template>
  <div class="page-header-index-wide">
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <div class="account-settings-info-main">
        <div class="account-settings-info-right">
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <a-row :gutter="16">
            <a-col :md="10" :lg="10">
              <a-form layout="vertical" :form="form">
                <a-form-item
                  label="原密码">
                  <a-input
                    type="password"
                    v-decorator="[
                      'oldPwd',
                      {rules: [{ required: true, message: '请输入原密码',whitespace: true },
                               { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
                    ]"
                    name="oldPwd"
                    placeholder="请输入原密码"/>
                </a-form-item>
                <a-form-item
                  label="新密码">
                  <a-input
                    type="password"
                    v-decorator="[
                      'nowPwd',
                      {rules: [{ required: true, message: '请输入新密码',whitespace: true },
                               { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
                    ]"
                    name="nowPwd"
                    placeholder="请输入新密码"/>
                </a-form-item>
                <a-form-item
                  label="确认新密码">
                  <a-input
                    type="password"
                    v-decorator="[
                      'nowPwdVerify',
                      {rules: [{ required: true, message: '请确认新密码',whitespace: true },
                               { min:2, max:15, message: '请输入长度2到15位',whitespace: true },{ validator: this.handleValidator }]}
                    ]"
                    name="nowPwdVerify"
                    placeholder="请确认新密码"/>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" @click="onSave">保存</a-button>
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { baseManagerEditPassword, baseEnterprisEditPassword } from '@/api/cygmNormPro'
  import { mapState } from 'vuex'

  export default {
    components: {},
    computed: {
      ...mapState({
        roles: state => state.user.roles
      })
    },
    data() {
      return {
        form: this.$form.createForm(this)
      }
    },
    methods: {
      handleValidator (rule, val, callback) {
        if (val !== this.form.getFieldsValue().nowPwd) {
          // eslint-disable-next-line standard/no-callback-literal
          callback('新密码和确认密码不一致')
        }
        callback()
      },
      // 保存
      onSave(e) {
        e.preventDefault()
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.lodingBtn = true
            const params = { ...values }
            // 管理员 企业主
            const { returnValue: res } = this.roles === 1 ? await baseManagerEditPassword(params) : await baseEnterprisEditPassword(params)
            if (res) {
              this.$message.info('修改成功')
              this.form.resetFields()
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }

      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0, 0, 0, .85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }

      .account-settings-info-view {
        padding-top: 12px;
      }
    }
  }
</style>
