module.exports = ctx => ({ 
    title: '网格公共组件',  // 设置网站标题
    dest: 'docs/.vuepress/dist',    // 设置输出目录
    base: '/', // 设置站点根路径
    repo: 'https://github.com/Never99/vue-press-grid.git', // 添加 github 链接
    keywords: '前端开发',
    description: '前端开发 lhs的个人博客',
    head: [['link', { rel: 'icon', href: '/logo.ico' }]], 
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