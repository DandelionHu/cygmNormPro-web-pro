<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        :src="currentUser.avatar"
        class="antd-pro-global-header-index-avatar m-r10" />
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          信息设置
        </a-menu-item>
        <a-menu-item v-if="menu" key="editPassword" @click="handleToEditPassword">
          <a-icon type="unlock"/>
          修改密码
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 信息设置
    handleToSettings () {
      this.$router.push({ path: '/settings/index' })
    },
    // 修改密码
    handleToEditPassword () {
      this.$router.push({ path: '/settings/editPassword' })
    },
    // 退出
    handleLogout (e) {
      Modal.confirm({
        title: '退出登录',
        content: '确定要退出吗？',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk: () => {
          // 退出
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
