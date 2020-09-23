<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls"/>
  </div>
</template>

<script>
  import AvatarDropdown from './AvatarDropdown'
  import { mapState } from 'vuex'

  export default {
    name: 'RightContent',
    components: {
      AvatarDropdown
    },
    props: {
      prefixCls: {
        type: String,
        default: 'ant-pro-global-header-index-action'
      },
      isMobile: {
        type: Boolean,
        default: () => false
      },
      topMenu: {
        type: Boolean,
        required: true
      },
      theme: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        showMenu: true,
        currentUser: {}
      }
    },
    computed: {
      wrpCls() {
        return {
          'ant-pro-global-header-index-right': true,
          [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
        }
      },
      ...mapState({
        name: state => state.user.name,
        avatar: state => state.user.avatar,
        defaultAvatar: state => state.user.defaultAvatar
      })
    },
    mounted() {
      this.currentUser = {
        name: this.name,
        avatar: this.avatar ? this.avatar : this.defaultAvatar
      }
    }
  }
</script>
