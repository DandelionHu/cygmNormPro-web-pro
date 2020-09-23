<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert v-if="isLoginError" type="error" showIcon class="mb24" message="账户或密码错误" />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="请输入帐户名或手机号码"
          v-decorator="[
            'account',
            {rules: [{ required: true, message: '请输入帐户名或手机号码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password
          size="large"
          placeholder="请输入密码"
          v-decorator="[
            'password',
            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
          ]"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>
      <a-form-item class="mt24">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { timeFix } from '@/utils/util'

  export default {
    data () {
      return {
        isLoginError: false, // 登录成功
        form: this.$form.createForm(this),
        state: {
          time: 60,
          loginBtn: false
        }
      }
    },
    created () {

    },
    methods: {
      ...mapActions(['Login']),
      // 提交
      handleSubmit (e) {
        e.preventDefault()
        const {
          form: { validateFields },
          state,
          Login
        } = this

        state.loginBtn = true

        const validateFieldsKey = ['account', 'password']

        validateFields(validateFieldsKey, { force: true }, (err, values) => {
          if (!err) {
            console.log('login form', values)
            const loginParams = { ...values }
            Login(loginParams)
                .then((res) => this.loginSuccess(res))
                .catch(err => this.requestFailed(err))
                .finally(() => {
                  state.loginBtn = false
                })
          } else {
            setTimeout(() => {
              state.loginBtn = false
            }, 600)
          }
        })
      },
      // 登陆成功
      loginSuccess (res) {
        console.log(res)
        this.$router.push({ path: '/' }).catch(err => {
          console.log(err)
        })
        // 延迟 1 秒显示欢迎信息
        setTimeout(() => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        }, 1000)
        this.isLoginError = false
      },
      // 请求失败
      requestFailed () {
        this.isLoginError = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .mt24{
    margin-top: 24px;
  }
  .mb24{
    margin-bottom: 24px;
  }
</style>
