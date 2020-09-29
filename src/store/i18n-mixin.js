import { mapState } from 'vuex'
// 语言设置的混入
const i18nMixin = {
  computed: {
    ...mapState({
      currentLang: state => state.app.lang
    })
  },
  methods: {
    setLang (lang) {
      this.$store.dispatch('setLang', lang)
    }
  }
}

export default i18nMixin
