module.exports = ctx => ({ 
    title: '网格公共组件',  // 设置网站标题
    dest: 'docs/.vuepress/dist',    // 设置输出目录
    base: '/vue-press-grid/', // 设置站点根路径
    repo: 'https://github.com/Never99/vue-press-grid.git', // 添加 github 链接
    keywords: '前端开发',
    description: '前端开发 lhs的个人博客',
    head: [['link', { rel: 'icon', href: '/logo.ico' }]], 
    theme: '@vuepress/theme-default', 
    themeConfig: { 
        nav: [
            { text: '首页', link: '/' }, 
            { text: 'cube-ui组件', link: '/grid-cube/' }, 
            { 
                text: '知识点', items: [ 
                    { text: 'vue知识点', link: '/knows/vue/' }, 
                    { text: 'js知识点', link: '/knows/js/' } 
                ] 
            }
        ], 
        sidebar: { 
            "/grid-cube/": [
                '/grid-cube/', // grid文件夹的README.md 不是下拉框形式
                {
                    title: '网格--常用组件',
                    children: [
                        '/grid-cube/tabbar',
                        '/grid-cube/date-picker',
                        '/grid-cube/picker',
                        '/grid-cube/cascade-picker',
                        '/grid-cube/upload',
                        '/grid-cube/dialog',
                        '/grid-cube/scroll',
                    ]
                },
                {
                    title: '项目---常用Vue方法',
                    children: [
                        '/grid-cube/vue/axios',
                        '/grid-cube/vue/phone-type',
                        '/grid-cube/vue/date-time',
                        '/grid-cube/vue/common',
                        '/grid-cube/vue/directive',
                        '/grid-cube/vue/vuex',
                    ]
                },
                {
                    title: '注意事项',
                    children: [
                        '/grid-cube/warning',
                    ]
                }
            ],
            "/knows/vue/": [
                '/knows/vue/', // grid文件夹的README.md 不是下拉框形式
                {
                    title: 'Vue知识点',
                    children: [
                        '/knows/vue/model',
                        '/knows/vue/hook',
                        '/knows/vue/simpleDouble',
                        '/knows/vue/allFn',
                    ]
                }
            ],
            "/knows/js/": [
                '/knows/js/', // grid文件夹的README.md 不是下拉框形式
                {
                    title: 'js知识点',
                    children: [
                        '/knows/js/array-api',
                        '/knows/js/call-apply',
                        '/knows/js/cookie-storage',
                        '/knows/js/js-inherit',
                        '/knows/js/Object.defineProperty',
                        '/knows/js/prototype',
                        '/knows/js/shakeOrthrottle',
                        '/knows/js/WebSocket',
                        '/knows/js/webWorker',
                    ]
                }
            ]
        }
        
    } 
}) 