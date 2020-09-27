<template>
  <pro-layout
    :title="title"
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    :theme="navTheme"
    :layout="layout"
    :contentWidth="contentWidth"
    :fixedHeader="fixedHeader"
    :fixSiderbar="fixedSidebar"
  >
    <setting-drawer/>
    <template v-slot:rightContentRender>
        <right-content :top-menu="layout === 'topmenu'" :is-mobile="isMobile" :theme="navTheme"/>
        <multi-tab></multi-tab>
    </template>
    <template v-slot:footerRender>
      <global-footer/>
    </template>
    <router-view/>
  </pro-layout>
</template>

<script>
  import { baseMixin } from '@/store/app-mixin'
  import { mapState } from 'vuex'
  import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

  import defaultSettings from '@/config/defaultSettings'
  import RightContent from '@/components/GlobalHeader/RightContent'
  import GlobalFooter from '@/components/GlobalFooter'
  import SettingDrawer from '@/components/SettingDrawer'
  import MultiTab from '@/components/MultiTab'
  import LogoImg from '../assets/logo.png'

  export default {
    name: 'BasicLayout',
    mixins: [baseMixin],
    components: {
      SettingDrawer,
      RightContent,
      MultiTab,
      GlobalFooter
    },
    data() {
      return {
        // 导航栏
        menus: [],
        // 侧栏收起状态
        collapsed: false,
        title: defaultSettings.title,
        // 媒体查询
        query: {},
        // 是否手机模式
        isMobile: false
      }
    },
    computed: {
      ...mapState({
        // 动态主路由
        mainMenu: state => state.permission.addRouters
      })
    },
    created() {
      const routes = this.mainMenu.find(item => item.path === '/')
      this.menus = (routes && routes.children) || []
      // 处理侧栏收起状态
      this.$watch('collapsed', () => {
        this.$store.commit(SIDEBAR_TYPE, this.collapsed)
      })
      this.$watch('isMobile', () => {
        this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
      })
    },
    mounted() {
      const userAgent = navigator.userAgent
      if (userAgent.indexOf('Edge') > -1) {
        this.$nextTick(() => {
          this.collapsed = !this.collapsed
          setTimeout(() => {
            this.collapsed = !this.collapsed
          }, 16)
        })
      }
    },
    methods: {
      // 设备宽度改变
      handleMediaQuery(val) {
        this.query = val
        if (this.isMobile && !val['screen-xs']) {
          this.isMobile = false
          return
        }
        if (!this.isMobile && val['screen-xs']) {
          this.isMobile = true
          this.collapsed = false
          this.$store.dispatch('ToggleContentWidth', false)
        }
      },
      // 导航
      handleCollapse(val) {
        this.collapsed = val
      },
      // 加载logo
      logoRender() {
        return (<img class='logo' src={LogoImg}/>)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./BasicLayout.less";

  .logo {
    width: 38px;
  }
</style>
