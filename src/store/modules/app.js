// 系统主题设置
import storage from 'store' // 存储到localstorage
import {
  SIDEBAR_TYPE,
  TOGGLE_MOBILE_TYPE,
  TOGGLE_NAV_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_COLOR,
  TOGGLE_WEAK,
  TOGGLE_MULTI_TAB,
  // i18n
  APP_LANGUAGE
} from '@/store/mutation-types'
import { loadLanguageAsync } from '@/locales'

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    theme: 'dark',
    layout: 'sidemenu',
    contentWidth: false,
    fixedHeader: true,
    fixedSidebar: true,
    color: '#00b38b',
    weak: false,
    multiTab: false,
    lang: 'zh-CN',
    _antLocale: {}
  },
  mutations: {
    [SIDEBAR_TYPE]: (state, type) => {
      state.sideCollapsed = type
      storage.set(SIDEBAR_TYPE, type)
    },
    [TOGGLE_MOBILE_TYPE]: (state, isMobile) => {
      state.isMobile = isMobile
    },
    [TOGGLE_NAV_THEME]: (state, theme) => {
      state.theme = theme
      storage.set(TOGGLE_NAV_THEME, theme)
    },
    [TOGGLE_LAYOUT]: (state, mode) => {
      state.layout = mode
      storage.set(TOGGLE_LAYOUT, mode)
    },
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode
      storage.set(TOGGLE_FIXED_HEADER, mode)
    },
    [TOGGLE_FIXED_SIDEBAR]: (state, mode) => {
      state.fixedSidebar = mode
      storage.set(TOGGLE_FIXED_SIDEBAR, mode)
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type
      storage.set(TOGGLE_CONTENT_WIDTH, type)
    },
    [TOGGLE_COLOR]: (state, color) => {
      state.color = color
      storage.set(TOGGLE_COLOR, color)
    },
    [TOGGLE_WEAK]: (state, mode) => {
      state.weak = mode
      storage.set(TOGGLE_WEAK, mode)
    },
    [APP_LANGUAGE]: (state, lang, antd = {}) => {
      state.lang = lang
      state._antLocale = antd
      storage.set(APP_LANGUAGE, lang)
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      storage.set(TOGGLE_MULTI_TAB, bool)
      state.multiTab = bool
    }
  },
  actions: {
    setLang ({ commit }, lang) {
      return new Promise((resolve, reject) => {
        commit(APP_LANGUAGE, lang)
        loadLanguageAsync(lang).then(() => {
          resolve()
        }).catch((e) => {
          reject(e)
        })
      })
    },
    ToggleTheme ({ commit }, theme) {
      commit(TOGGLE_NAV_THEME, theme)
    },
    ToggleColor ({ commit }, theme) {
      commit(TOGGLE_COLOR, theme)
    },
    ToggleLayoutMode ({ commit }, theme) {
      commit(TOGGLE_LAYOUT, theme)
    },
    ToggleFixSiderbar ({ commit }, theme) {
      commit(TOGGLE_FIXED_SIDEBAR, theme)
    },
    ToggleContentWidth ({ commit }, theme) {
      commit(TOGGLE_CONTENT_WIDTH, theme)
    },
    ToggleFixedHeader ({ commit }, theme) {
      commit(TOGGLE_FIXED_HEADER, theme)
    },
    ToggleWeak ({ commit }, theme) {
      commit(TOGGLE_WEAK, theme)
    },
    ToggleMultiTab ({ commit }, theme) {
      commit(TOGGLE_MULTI_TAB, theme)
    }
  }
}
export default app
