module.exports = ctx => ({ 
    title: '网格公共组件', 
    head: [['link', { rel: 'icon', href: '/logo.ico' }]], 
    description: 'Just playing around', 
    theme: '@vuepress/theme-default', 
    themeConfig: { 
        nav: [
            { text: '首页', link: '/' }, 
            { text: '指南', link: '/guide/' }, 
            { 
                text: '接口', items: [ 
                    { text: 'pc端（中屏）', link: '/interface/wxapi/' }, 
                    { text: 'h5端（移动端、小屏）', link: '/interface/web/' } 
                ] 
            }
        ], 
        sidebar: { 
            "/guide/": ["", "one", "two"]
        }
        
    } 
}) 