<template>
  <a-form :form="form">
    <a-form-item
      label="标题"
      :labelCol="{lg: {span: 2}, sm: {span: 4}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 8}}">
      <a-input
        v-decorator="[
          'title',
          {rules: [{ required: true, message: '请输入标题',whitespace: true },
                   { min:2, max:15, message: '请输入长度2到15位',whitespace: true }]}
        ]"
        name="title"
        placeholder="请输入标题"/>
    </a-form-item>
    <a-form-item
      label="来源"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="['source']"
        name="source"
        placeholder="请输入来源"/>
    </a-form-item>
    <a-form-item
      label="作者"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="['author']"
        name="author"
        placeholder="请输入作者"/>
    </a-form-item>
    <a-form-item
      label="栏目"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-select
        v-decorator="[
          'fieldId',
          {rules: [{ required: true, message: '请选择栏目',whitespace: true }]}
        ]"
        name="fieldId"
        placeholder="请选择栏目">
        <a-select-option :value="item.id" v-for="(item,index) in tagList" :key="index">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="是否推荐"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-radio-group
        v-decorator="['isRecommend',{ 'initialValue': 0 }]">
        <a-radio :value="0">
          否
        </a-radio>
        <a-radio :value="1">
          是
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="封面图片"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <upload-img
        v-decorator="[
          'picture',
          {rules: [{ required: true, message: '请上传图片',whitespace: true }]}
        ]"
        name="picture"
        :num="1"
        :fileList="fileList"
        @uploadList="uploadList">
      </upload-img>
    </a-form-item>
    <a-form-item
      label="内容"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 16}, sm: {span: 16}}">
      <u-editor
        v-decorator="['content',
            {'initialValue': '',
              rules: [{ required: true, message: '请输入内容',whitespace: true }]
            }]"
        name="content"
        @change="editorChange"></u-editor>
    </a-form-item>
    <a-form-item
      :wrapperCol="{lg: {span: 6}, sm: {span: 9}}"
      class="ta-c">
      <a-button type="primary" ghost @click="onCancel">取消</a-button>
      <a-button
        class="m-l10"
        type="primary"
        @click="onSave"
        :loading="lodingBtn"
        :disabled="lodingBtn">保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import { baseNewsSaveNews, baseNewsFindById, baseFieldFindList } from '@/api/cygmNormPro'
  import { UploadImg, UEditor } from '@/components'

  export default {
    name: 'PolicyAdd',
    components: {
      UploadImg,
      UEditor
    },
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        form: this.$form.createForm(this),
        lodingBtn: false,
        fileList: [],
        type: 2, // 1资讯，2政策
        tagList: [], // 栏目列表
        groups: 'groups_policy'
      }
    },
    mounted() {
      this.getTagList()
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        this.handleReset()
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 重置表单
      handleReset() {
        this.form.resetFields()
      },
      // 取消
      onCancel() {
        this.$emit('editClose')
      },
      // 保存
      onSave(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.lodingBtn = true
            const params = { ...values }
            params.id = this.editID
            params.type = this.type
            baseNewsSaveNews(params)
                .then((res) => {
                  if (res.returnValue) {
                    if (this.editID) {
                      this.$message.info('编辑成功')
                    } else {
                      this.$message.info('保存成功')
                    }
                    this.onCancel()
                  }
                })
                .catch(err => {
                  console.log(err)
                })
                .finally(() => {
                  this.lodingBtn = false
                })
          }
        })
      },
      // 获取详情
      async loadInfo(id) {
        const { form } = this
        const { returnValue: res } = await baseNewsFindById({ id })
        form.setFieldsValue({
          title: res.title,
          source: res.source,
          fieldId: res.fieldId,
          enpId: res.enpId,
          isRecommend: res.isRecommend,
          picture: res.picture,
          content: res.content,
          author: res.author
        })
        if (res.picture) {
          const obj = {
            status: 'done',
            uid: res.picture,
            name: res.picture,
            url: res.picture
          }
          this.fileList.push(obj)
        }
      },
      // 图片列表
      uploadList(list) {
        const photoList = []
        list.forEach((v, i) => {
          photoList.push(v.url)
        })
        this.form.setFieldsValue({
          picture: photoList.join(',')
        })
      },
      // 编辑器
      editorChange(html) {
        this.form.setFieldsValue({
          content: html
        })
      },
      // 获取栏目
      async getTagList() {
        const data = {
          groups: this.groups
        }
        const { returnValue: res } = await baseFieldFindList(data)
        this.tagList = res
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
