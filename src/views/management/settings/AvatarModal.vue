<template>
  <a-modal
    title="修改头像"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    :footer="null"
    @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :lg="2" :md="2">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
      </a-col>
      <a-col :lg="{span: 1, offset: 2}" :md="2">
        <a-button icon="plus" @click="changeScale(1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="minus" @click="changeScale(-1)"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="undo" @click="rotateLeft"/>
      </a-col>
      <a-col :lg="{span: 1, offset: 1}" :md="2">
        <a-button icon="redo" @click="rotateRight"/>
      </a-col>
      <a-col :lg="{span: 2, offset: 6}" :md="2">
        <a-button type="primary" @click="finish()">保存</a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
  import { adminUpload, enpUpload } from '@/api/cygmNormPro'
  export default {
    data () {
      return {
        visible: false,
        id: null,
        confirmLoading: false,
        fileList: [],
        uploading: false,
        fileName: '',
        options: {
          img: '',
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },
        previews: {}
      }
    },
    methods: {
      edit (id) {
        this.visible = true
        this.id = id
      },
      close () {
        this.id = null
        this.visible = false
      },
      // 关闭弹框
      cancelHandel () {
        this.close()
      },
      // 放大缩小
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      // 旋转
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      // 旋转
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 上传之前，用base64预览
      beforeUpload (file) {
        this.fileName = file.name
        const reader = new FileReader()
        // 把Array Buffer转化为blob 如果是base64不需要
        // 转化为base64
        reader.readAsDataURL(file)
        reader.onload = () => {
          this.options.img = reader.result
        }
        // 转化为blob
        // reader.readAsArrayBuffer(file)
        return false
      },
      // 上传图片（点击保存按钮）
      finish () {
        const _this = this
        // 上传
        if (this.id === 1) {
          // 管理员
          this.$refs.cropper.getCropBlob((data) => {
            const img = window.URL.createObjectURL(data)
            this.model = true
            const file = new File([ img ], this.fileName)
            adminUpload({ file: file }).then((response) => {
              _this.$message.success('上传成功')
              _this.$emit('ok', response.returnValue.filePath)
              _this.visible = false
            })
          })
        } else {
          // 企业主
          this.$refs.cropper.getCropData((data) => {
            const img = window.URL.createObjectURL(data)
            this.model = true
            const file = new File([ img ], this.fileName)
            enpUpload({ file: file }).then((response) => {
              _this.$message.success('上传成功')
              _this.$emit('ok', response.returnValue.filePath)
              _this.visible = false
            })
          })
        }
      },
      realTime (data) {
        this.previews = data
      }
    }
  }
</script>

<style lang="less" scoped>

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
