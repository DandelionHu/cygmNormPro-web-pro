<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" :form="form">
          <a-form-item
            label="名称">
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入名称',whitespace: true },
                         { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
              ]"
              name="name"
              placeholder="请输入名称" />
          </a-form-item>
          <a-form-item
            label="账号">
            <a-input
              v-decorator="[
                'account',
                {rules: [{ required: true, message: '请输入账号',whitespace: true },
                         { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
              ]"
              name="account"
              placeholder="请输入账号"/>
          </a-form-item>
          <a-form-item
            label="手机号码">
            <a-input
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入手机号码',whitespace: true },
                         { len:11, message: '请输入长度11位的手机号码',whitespace: true }]}
              ]"
              placeholder="请输入手机号码"/>
          </a-form-item>
          <a-form-item
            label="性别">
            <a-radio-group v-model="sex">
              <a-radio :value="1">
                男
              </a-radio>
              <a-radio :value="2">
                女
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onSave">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="uploadImg">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="photo"/>
        </div>
      </a-col>
    </a-row>
    <!--头像编辑框-->
    <avatar-modal ref="modal" @ok="setavatar"/>
  </div>
</template>

<script>
  import AvatarModal from './AvatarModal'
  import { mapState } from 'vuex'
  import { baseManagerSaveManager, baseManagerFindById } from '@/api/cygmNormPro'
  export default {
    components: {
      AvatarModal
    },
    computed: {
      ...mapState({
        avatar: state => state.user.avatar,
        defaultAvatar: state => state.user.defaultAvatar,
        roles: state => state.user.roles,
        info: state => state.user.info
      })
    },
    data () {
      return {
        photo: '',
        form: this.$form.createForm(this),
        sex: 1
      }
    },
    created() {
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        this.handleReset()
        if (this.info.id) {
          // 编辑
          this.loadInfo(this.info.id)
        }
      })
    },
    methods: {
      // 重置表单
      handleReset() {
        this.form.resetFields()
      },
      // 上传图片
      uploadImg() {
        this.$refs.modal.edit(this.roles)
      },
      // 上传图片成功
      setavatar (url) {
        this.photo = url
      },
      // 保存
      onSave(e) {
        e.preventDefault()
        this.form.validateFields(async (err, values) => {
          if (!err) {
            this.lodingBtn = true
            const params = { ...values }
            params.id = this.info.id
            params.photo = this.photo
            params.sex = this.sex === 1 ? '男' : '女'
            const { returnValue: res } = await baseManagerSaveManager(params)
            if (res) {
              this.$message.info('修改成功')
              this.$store.commit('SET_NAME', { name: res.name })
              this.$store.commit('SET_INFO', res)
              this.$store.commit('SET_AVATAR', res.photo)
            }
          }
        })
      },
      // 获取详情
      async loadInfo(id) {
        const { form } = this
        const { returnValue: res } = await baseManagerFindById({ id })
        form.setFieldsValue({
          name: res.name,
          account: res.account,
          phone: res.phone
        })
        this.sex = res.sex === '男' ? 1 : 2
        this.photo = res.photo ? res.photo : this.defaultAvatar
      }
    }
  }
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      min-height: 180px;
    }
  }
</style>
