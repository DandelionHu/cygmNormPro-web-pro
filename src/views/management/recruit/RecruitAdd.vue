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
      label="有效期"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'effective',
          {rules: [{ required: true, message: '请输入有效期',whitespace: true }]}
        ]"
        name="effective"
        placeholder="请输入有效期"/>
    </a-form-item>
    <a-form-item
      label="招聘类型"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-select
        v-decorator="[
          'fieldId',
          {rules: [{ required: true, message: '请选择招聘类型',whitespace: true }]}
        ]"
        name="fieldId"
        placeholder="请选择招聘类型">
        <a-select-option :value="item.id" v-for="(item,index) in tagList" :key="index">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="企业"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-select
        v-decorator="[
          'enpId',
          {rules: [{ required: true, message: '请选择企业',whitespace: true }]}
        ]"
        name="enpId"
        @change="onChangeEnp"
        placeholder="请选择企业">
        <a-select-option :value="item.id" v-for="(item,index) in enpList" :key="index">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="联系人"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'contact',
          {rules: [{ required: true, message: '请输入联系人',whitespace: true }]}
        ]"
        name="contact"
        placeholder="请输入联系人"/>
    </a-form-item>
    <a-form-item
      label="联系电话"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-input
        v-decorator="[
          'tel',
          {rules: [{ required: true, message: '请输入联系电话',whitespace: true }]}
        ]"
        name="tel"
        placeholder="请输入联系电话"/>
    </a-form-item>
    <a-form-item
      label="联系地址"
      :labelCol="{lg: {span: 2}, sm: {span: 3}}"
      :wrapperCol="{lg: {span: 6}, sm: {span: 6}}">
      <a-cascader :options="options" placeholder="选择省市区" @change="onChangeCascader" />
      <a-input
        v-decorator="[
          'address',
          {rules: [{ required: true, message: '请输入联系地址',whitespace: true }]}
        ]"
        name="address"
        placeholder="请输入联系地址"/>
    </a-form-item>
    <a-form-item
      label="招聘内容"
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
  import { baseRecruitSaveRecruit, baseRecruitFindById, baseFieldFindList, baseEnterpriseFindList } from '@/api/cygmNormPro'
  import { UEditor } from '@/components'
  import { provinceJson } from '@/utils/province'

  export default {
    name: 'RecruitAdd',
    components: {
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
        options: provinceJson,
        form: this.$form.createForm(this),
        lodingBtn: false,
        tagList: [], // 栏目列表
        enpList: [], // 公司列表
        groups: 'groups_recruit'
      }
    },
    mounted() {
      this.getTagList()
      this.getEnpList()
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
            baseRecruitSaveRecruit(params)
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
        const { returnValue: res } = await baseRecruitFindById({ id })
        form.setFieldsValue({
          title: res.title,
          effective: res.effective,
          fieldId: res.fieldId,
          enpId: res.enpId,
          content: res.content,
          contact: res.contact,
          tel: res.tel,
          address: res.address
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
      },
      // 获取公司
      async getEnpList() {
        const { returnValue: res } = await baseEnterpriseFindList({})
        this.enpList = res
      },
      // 选择企业
      onChangeEnp(value) {
        this.enpList.forEach((v, i) => {
          if (v.id === value) {
            this.form.setFieldsValue({
              content: v.contacts,
              tel: v.phone,
              address: v.address,
              province: v.province,
              city: v.city,
              area: v.area
            })
          }
        })
      },
      // 选择省市区
      onChangeCascader(value) {
        console.log(value)
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
