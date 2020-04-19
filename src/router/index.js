//导入vue
import Vue from 'vue'
//导入路由模块
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import singleNode from '../views/dataDisplay/singleNode'
import test from '../views/test/Test'

Vue.use(Router)

export default new Router({
    routes: [
      {
        //定义路由链接路径
        path: '/test',
        name: 'Test',
        component: test,
        hidden: true,
      },
      {
        //定义路由链接路径
        path: '/home',
        name: 'Login',
        component: Login,
        hidden: true,
      },
      {
        path: '/',
        name: '数据监控',
        component: Home,
        iconCls:"el-icon-video-camera",
        children: [
          ////子菜单一
          {
            path: '/real-time',
            name: '实时数据',
            component: singleNode,
          }
        ]
      }
    ]
  }
)

