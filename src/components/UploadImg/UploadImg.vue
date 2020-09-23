<template>
  <a-upload
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :file-list="fileList"
    :before-upload="beforeUpload"
    @change="handleChange">
    <div v-if="fileList.length < num">
      <a-icon :type="loading ? 'loading' : 'plus'"/>
      <div class="ant-upload-text">
        上传
      </div>
    </div>
  </a-upload>
</template>

<script>
  import { mapState } from 'vuex'
  import { adminUpload, enpUpload } from '@/api/cygmNormPro'

  export default {
    name: 'UploadImg',
    props: {
      num: {
        type: Number,
        default: 1
      },
      keys: {
        type: String,
        default: ''
      },
      fileList: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        roles: state => state.user.roles
      })
    },
    methods: {
      // 上传图片
      handleChange(info) {
        console.log(info)
        if (info.file.status === 'removed') {
          // 删除
          const uid = info.file.uid
          this.fileList.splice(this.fileList.findIndex(item => item.uid === uid), 1)
          this.$emit('uploadList', this.fileList)
        } else {
          // 上传
          if (this.fileVerify(info.file)) {
            this.loading = true
            // 上传
            if (this.roles === 1) {
              adminUpload({ file: info.file }).then((response) => {
                this.$message.success('上传成功')
                this.loading = false
                const obj = {
                  status: 'done',
                  uid: response.returnValue.filePath,
                  name: response.returnValue.fileName,
                  url: response.returnValue.filePath
                }
                this.fileList.push(obj)
                const list = this.keys ? { keys: this.keys, fileList: this.fileList } : this.fileList
                this.$emit('uploadList', list)
              })
            } else {
              enpUpload({ file: info.file }).then((response) => {
                this.$message.success('上传成功')
                this.loading = false
                const obj = {
                  status: 'done',
                  uid: response.returnValue.filePath,
                  name: response.returnValue.fileName,
                  url: response.returnValue.filePath
                }
                this.fileList.push(obj)
                const list = this.keys ? { keys: this.keys, fileList: this.fileList } : this.fileList
                this.$emit('uploadList', list)
              })
            }
          }
        }
      },
      // 上传之前
      beforeUpload(file) {
        this.fileVerify(file)
        return false
      },
      // 验证
      fileVerify(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          this.$message.error('只能上传图片')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('大小在2MB!')
        }
        return isJpgOrPng && isLt2M
      }
    }
  }
</script>
