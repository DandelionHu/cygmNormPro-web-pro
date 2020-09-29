import { mapState } from 'vuex'
// 登录调用的混入
const deviceMixin = {
  computed: {
    ...mapState({
      isMobile: state => state.app.isMobile
    })
  }
}

export { deviceMixin }
