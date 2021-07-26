import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'

// 导入全局样式
import '../src/assets/css/quanju.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入父文本编辑器
import VueQuillEditor from "vue-quill-editor";
// require styles 导入父文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入 Nprogress 包对应的js和css
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 在 request 拦截器中，显示进度条 Nprogress.start()
axios.interceptors.request.use(config => {
        //console.log(config)
        Nprogress.start()
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    })
    //  在response 拦截器中，隐藏进度条 Nprogress.done()
axios.interceptors.response.use(config => {
    Nprogress.done()
    return config
})
Vue.prototype.$http = axios

Vue.use(ElementUI);

Vue.component('tree-table', TreeTable)
    // 将父文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)


//对名称进行定义,提供一个function函数   originVal  为形参
Vue.filter('dateFormat', function(originVal) {

    const dt = new Date(originVal)
        //年的时间	
    const y = dt.getFullYear()
        //月的时间  .padStart 不足两位自动补0  2位长度
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
        //日的时间
    const d = (dt.getDate() + '').padStart(2, '0')

    //小时
    const hh = (dt.getHours() + '').padStart(2, '0')
        //分钟
    const mm = (dt.getMinutes() + '').padStart(2, '0')
        //秒数
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    //将它们拼接成完整的字符串
    //return 'yyyy-mm-dd hh:mm:ss'  可以改成下面的方法
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})


import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')