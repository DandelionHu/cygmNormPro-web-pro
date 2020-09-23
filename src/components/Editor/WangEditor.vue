<template>
  <div :class="prefixCls">
    <div ref="editor" class="editor-wrapper"></div>
  </div>
</template>

<script>
import WEditor from 'wangeditor'
import { mapState } from 'vuex'
import { adminUpload, enpUpload, baseUrl } from '@/api/cygmNormPro'

export default {
  name: 'WangEditor',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-wang'
    },
    value: {
      type: String,
      default: ''
    },
    contenteditable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editor: null,
      editorContent: null
    }
  },
  watch: {
    value (val) {
      this.editorContent = val
      this.editor.txt.html(val)
    }
  },
  computed: {
    ...mapState({
      roles: state => state.user.roles
    })
  },
  mounted () {
    this.initEditor()
  },
  methods: {
    // 初始化
    initEditor () {
      this.editor = new WEditor(this.$refs.editor)
      // this.editor.onchangeTimeout = 200
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('change', this.editorContent)
      }
      this.uploadImg()
      this.editor.create()
      this.editor.$textElem.attr('contenteditable', this.contenteditable)
    },
    // 上传图片
    uploadImg() {
      // 将图片大小限制为 3M
      this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024
      // 限制一次最多上传 5 张图片
      this.editor.customConfig.uploadImgMaxLength = 1
      this.editor.customConfig.customUploadImg = (files, insert) => {
        // files 是 input 中选中的文件列表
        // insert 是获取图片 url 后，插入到编辑器的方法
        const obj = {
          file: files[0],
          fileType: 'editor'
        }
        if (this.roles === 1) {
          adminUpload(obj).then((response) => {
            this.$message.success('上传成功')
            const url = baseUrl + response.returnValue.filePath
            // 上传代码返回结果之后，将图片插入到编辑器中
            insert(url)
          })
        } else {
          enpUpload(obj).then((response) => {
            this.$message.success('上传成功')
            const url = baseUrl + response.returnValue.filePath
            // 上传代码返回结果之后，将图片插入到编辑器中
            insert(url)
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-editor-wang {
  .editor-wrapper {
    text-align: left;
  }
}
</style>
