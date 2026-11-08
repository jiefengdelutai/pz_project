<template>
  <el-menu 
    :style="{width:!isCollapse ? '230px' : '64px'}"
    active-text-color="#ffd04b" 
    background-color="#545c64" 
    class="aside-container" 
    :default-active="active"
    text-color="#fff" 
    @open="handleOpen" 
    @close="handleClose"
    :collapse="isCollapse"
  >
    <p class="logo-lg">{{ isCollapse ? '安馨' : '安馨陪诊' }}</p>
    <Tree-Menu :index="1" :menuData="menuData"></Tree-Menu>
  </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TreeMenu from './TreeMenu.vue';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex'

// 获取路由信息，设置侧边栏
const router = useRouter()

// 创建store实例
const store = useStore()

// const menuData = reactive(router.options.routes[0].children)
const menuData = computed(() => {
  return store.state.menu.routerList
})

const active = computed(()=>store.state.menu.menuActive)

const isCollapse = computed(() => {
  return store.state.menu.isCollapse
})

const handleOpen = () => { }
const handleClose = ()=>{}
</script>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  .logo-lg {
      font-size: 20px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #fff;
  }
}
</style>