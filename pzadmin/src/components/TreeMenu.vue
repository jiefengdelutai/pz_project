<template>
    <!-- 递归渲染路由，使用v-for遍历每个路由 -->
    <template v-for="(item) in props.menuData">
      <!-- 如果没有子菜单 -->
      <el-menu-item
        @click="handleClick(item,`${props.index}-${item.meta.id}`)"
        v-if=" !item.children || item.children.length == 0" 
        :index="`${props.index}-${item.meta.id}`"
        :key="`${props.index}-${item.meta.id}`"
      >
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
      <!-- 如果有子菜单，设置父项，递归渲染子项 -->
      <el-sub-menu 
        v-else 
        :index="`${props.index}-${item.meta.id}`"
        :key="`1-${props.index}-${item.meta.id}`"
      >
        <template #title>
          <el-icon size="20">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
        </template>
        <tree-menu :index="`${props.index}-${item.meta.id}`" :menuData="item.children"></tree-menu>
      </el-sub-menu>
    </template>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// 获取父组件传过来的数据
const props = defineProps(["menuData", "index"])

// 创建router实例
const router = useRouter()
const store = useStore()

// 点击菜单跳转
const handleClick = (item, active) => {
  store.commit('addMenu', item.meta)
  store.commit('updateMenuActive',active)
  router.push(item.meta.path)
}
</script>

<style lang='less' scoped></style>