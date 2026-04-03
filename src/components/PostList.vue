<script setup>
// 引入便利貼卡片小幫手
import PostCard from './PostCard.vue'
// 引入假資料小幫手（便利貼工廠）
import { posts } from '../data/mock.js'
</script>

<template>
  <!-- 畫面：便利貼列表（很多張便利貼排在一起） -->
  <div class="post-list">
    <!-- 用「迴圈」把每一張便利貼都變成卡片小幫手 -->
    <!-- posts 是裝便利貼的盒子，post 是裡面的每一張 -->
    <PostCard 
      v-for="post in posts" 
      :key="post.id" 
      :post="post" 
    />
  </div>
</template>

<style scoped>
/* 便利貼列表的樣式 */
.post-list {
  /* 最大的寬度 */
  max-width: 600px;
  /* 居中（放在中間） */
  margin: 0 auto;
  /* 上下左右都有空間 */
  padding: 20px;
}
</style>