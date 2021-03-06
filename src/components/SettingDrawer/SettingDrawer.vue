<template>
  <div class="setting-drawer">
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
    >
      <div class="setting-drawer-index-content">
        <div class="m-b20">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>
          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light">
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        <div class="m-b20">
          <h3 class="setting-drawer-index-title">主题色</h3>
          <div style="height: 20px">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <div class="m-b20">
          <h3 class="setting-drawer-index-title">导航模式</h3>
          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                侧边栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="sidemenu">
                <div class="setting-drawer-index-selectIcon" v-if="layout === 'sidemenu'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                顶部栏导航
              </template>
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="topmenu">
                <div class="setting-drawer-index-selectIcon" v-if="layout !== 'sidemenu'">
                  <a-icon type="check"/>
                </div>
              </div>
            </a-tooltip>
          </div>
          <div class="m-b20">
            <a-list :split="false">
              <a-list-item v-if="layout !== 'sidemenu'">
                <a-tooltip slot="actions">
                  <template slot="title">
                    该设定仅 [顶部栏导航] 时有效
                  </template>
                  <a-select
                    size="small"
                    style="width: 80px;"
                    :defaultValue="contentWidth === true ? 'Fixed' : 'Fluid'"
                    @change="handleContentWidthChange">
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option value="Fluid">流式</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="fixedHeader" @change="handleFixedHeader"/>
                <a-list-item-meta>
                  <div slot="title">固定 Header</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch
                  slot="actions"
                  size="small"
                  :disabled="(layout === 'topmenu')"
                  :defaultChecked="fixedSidebar"
                  @change="handleFixSiderbar"/>
                <a-list-item-meta>
                  <div slot="title" :style="{ textDecoration: layout === 'topmenu' ? 'line-through' : 'unset' }">
                    固定侧边菜单
                  </div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider/>
        <div class="m-b20">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="colorWeak" @change="onColorWeak"/>
                <a-list-item-meta>
                  <div slot="title">色弱模式</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="multiTab" @change="onMultiTab"/>
                <a-list-item-meta>
                  <div slot="title">多页签模式</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle" slot="handle">
        <a-icon type="setting" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>

<script>
  import SettingItem from './SettingItem'
  import config from '@/config/defaultSettings'
  import { updateTheme, updateColorWeak, colorList } from './settingConfig'
  import { baseMixin } from '@/store/app-mixin'

  export default {
    components: {
      SettingItem
    },
    mixins: [baseMixin],
    data() {
      return {
        visible: false,
        colorList
      }
    },
    watch: {},
    mounted() {
      console.log(this.contentWidth)
      // 更新主题
      updateTheme(this.primaryColor)
      // 缓存不等于初始化配置
      if (this.colorWeak !== config.colorWeak) {
        updateColorWeak(this.colorWeak)
      }
    },
    methods: {
      showDrawer() {
        this.visible = true
      },
      onClose() {
        this.visible = false
      },
      toggle() {
        this.visible = !this.visible
      },
      // 色弱模式
      onColorWeak(checked) {
        this.$store.dispatch('ToggleWeak', checked)
        updateColorWeak(checked)
      },
      // 多标签页
      onMultiTab(checked) {
        this.$store.dispatch('ToggleMultiTab', checked)
      },
      // 整体风格设置
      handleMenuTheme(theme) {
        // 更新localstorage
        this.$store.dispatch('ToggleTheme', theme)
      },
      // 导航模式
      handleLayout(mode) {
        this.$store.dispatch('ToggleLayoutMode', mode)
        if (mode === 'sidemenu') {
          // 流式
          this.$store.dispatch('ToggleContentWidth', false)
        }
      },
      // 侧边栏固定
      handleFixSiderbar(fixed) {
        if (this.layout === 'topmenu') {
          this.$store.dispatch('ToggleFixSiderbar', false)
          return
        }
        this.$store.dispatch('ToggleFixSiderbar', fixed)
      },
      // 布局模式
      handleContentWidthChange(type) {
        this.$store.dispatch('ToggleContentWidth', type === 'Fixed')
      },
      // 改变主题色
      changeColor(color) {
        if (this.primaryColor !== color) {
          this.$store.dispatch('ToggleColor', color)
          updateTheme(color)
        }
      },
      // 固定头部
      handleFixedHeader(fixed) {
        this.$store.dispatch('ToggleFixedHeader', fixed)
      }
    }
  }
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }

    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
