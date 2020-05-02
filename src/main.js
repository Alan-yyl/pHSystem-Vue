// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//配置了路由以后地址栏会变成http://localhost:8081/#/
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import 'font-awesome/css/font-awesome.css'


import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";

Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;



Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})
Vue.prototype.$echarts = echarts;
//把Date对象转为指定的字符串，重写toDateString方法
Date.prototype.toDateString = function () {
  return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + "/ " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
//日期格式化方法
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
