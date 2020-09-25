<template>
  <pro-layout
    :title="title"
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :auto-hide-header="settings.autoHideHeader"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    v-bind="settings"
  >
    <setting-drawer :settings="settings" @change="handleSettingChange"/>
    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme"/>
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
  import LogoImg from '../assets/logo.png'

  export default {
    name: 'BasicLayout',
    mixins: [baseMixin],
    components: {
      SettingDrawer,
      RightContent,
      GlobalFooter
    },
    data() {
      return {
        // 导航栏
        menus: [],
        // 侧栏收起状态
        collapsed: false,
        title: defaultSettings.title,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // 定宽: true / 流式: false
          contentWidth: defaultSettings.layout === 'sidemenu' ? false : defaultSettings.contentWidth === 'Fixed',
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixedHeader: defaultSettings.fixedHeader,
          fixSiderbar: defaultSettings.fixSiderbar,
          autoHideHeader: defaultSettings.autoHideHeader,
          colorWeak: defaultSettings.colorWeak,
          multiTab: defaultSettings.multiTab,
          hideHintAlert: false,
          hideCopyButton: false
        },
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
          this.settings.contentWidth = false
          // this.settings.fixSiderbar = false
        }
      },
      // 导航
      handleCollapse(val) {
        this.collapsed = val
      },
      // 设置改变
      handleSettingChange({ type, value }) {
        console.log('type', type, value)
        type && (this.settings[type] = value)
        switch (type) {
          case 'contentWidth':
            this.settings[type] = value === 'Fixed'
            break
          case 'layout':
            if (value === 'sidemenu') {
              this.settings.contentWidth = false
            } else {
              // 关闭侧边栏固定
              this.settings.fixSiderbar = false
              // 布局模式
              this.settings.contentWidth = true
            }
            break
        }
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
