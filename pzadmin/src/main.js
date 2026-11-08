import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import store from './store/index.js'
import PaneHead from './components/PaneHead.vue'

// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 刷新后的动态路由添加的逻辑
const localData = localStorage.getItem('pz_v3pz')
if (localData) {
  store.commit("dynamicMenu", JSON.parse(localData).menu.routerList);
  store.state.menu.routerList.forEach(item => {
    router.addRoute('main',item)
  })
}

// 添加路由守卫，在跳转之前判断
router.beforeEach((to, from) => {
  const token = localStorage.getItem('pz_token')
  // 非登录页面token还不存在
  if (!token && to.path !== '/login') {
    return '/login'
  } else if (token && to.path === '/login') {
      if (localData) {
        // 如果有子菜单
        const child = JSON.parse(localData).menu.routerList[0].children;
        if (child) {
          return child[0].meta.path;
        } else {  // 没有子菜单
          return JSON.parse(localData).menu.routerList[0].meta.path;
        }
      } 
  } else {
    return true
  }
})

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.component('PanelHead', PaneHead)

// 路由挂载
app.use(router)
// vuex挂载
app.use(store)

app.mount('#app')
