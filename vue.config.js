const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
    },
    css: [],
    // cdn加速
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    ]
}

// vue.config.js
const vueConfig = {
    configureWebpack: {
        // webpack 插件
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                APP_VERSION: `"${require('./package.json').version}"`,
                GIT_HASH: JSON.stringify(GitRevision.version()),
                BUILD_DATE: buildDate
            })
        ],
        // if prod, add externals
        externals: isProd ? assetsCDN.externals : {}
    },

    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        // if prod is on
        // assets require on cdn
        if (isProd) {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN
                return args
            })
        }
    },

    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // less vars，customize ant design theme

                    // 'primary-color': '#F5222D',
                    // 'link-color': '#F5222D',
                    'border-radius-base': '2px'
                },
                // DO NOT REMOVE THIS LINE
                javascriptEnabled: true
            }
        }
    },
    // publicPath: '/normProBaseWeb/',
    publicPath: '/',
    outputDir: 'dist',
    filenameHashing: false,
    productionSourceMap: false,
    lintOnSave: undefined,
    devServer: {
        // 本地启动端口
        port: 8000,
        // 代理服务器
        proxy: {
            '/normProBase': {
                target: 'http://139.159.154.140:8280/',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/normProBaseApi': '/normProBase'
                        // pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
                        // pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
                }
            }
        }
    },
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
    console.log('VUE_APP_PREVIEW', true)
        // add `ThemeColorReplacer` plugin to webpack plugins
    vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig