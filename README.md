

- node
- yarn
- webpack
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - Picture edit
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - AntV G2
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - Antv/G2 of Vue


### Project setup

- Clone repo
```bash
git clone https://github.com/vueComponent/ant-design-vue-pro.git
cd ant-design-vue-pro
```

- Install dependencies
```
yarn install
```

- Compiles and hot-reloads for development
```
yarn run serve
```

- Compiles and minifies for production
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```
## 目录文件说明
1. public 
   - logo.png             # LOGO
   - index.html           # Vue 入口模板
2. config
   - themePluginConfig.js #主题色应用
2. src
   - api                  # 后台接口
   - assets               # 本地静态资源
   - config               # 项目基础配置，包含路由，全局设置
   - components           # 业务通用组件
   - core                 # 项目引导, 全局配置初始化，依赖包引入等
   - layouts              # 页面布局等
   - router               # Vue-Router
   - store                # Vuex
   - utils                # 工具库
   - locales              # 国际化资源
   - views                # 业务页面入口和常用模板
   - App.vue              # Vue 模板入口
   - main.js              # Vue 入口 JS
   - permission.js        # 路由守卫(路由权限控制)
   - style                # 全局样式
3. tests                  # 测试工具
4. README.md
5. package.json