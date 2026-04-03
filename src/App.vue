<script setup>
// 引入便利貼列表小幫手
import PostList from './components/PostList.vue'
</script>

<template>
  <!-- 畫面：社交平台的首頁 -->
  <div class="app">
    <!-- 最上面的標題 -->
    <header class="header">
      <h1>📘 社交平台</h1>
    </header>
    
    <!-- 便利貼列表（動態牆） -->
    <main>
      <PostList />
    </main>
  </div>
</template>

<style scoped>
/* 整個應用程式的樣式 */
.app {
  /* 最小高度（占滿螢幕） */
  min-height: 100vh;
  /* 淺淺的灰色背景 */
  background: #f5f5f5;
}

/* 最上面的標題列 */
.header {
  /* 白色背景 */
  background: white;
  /* 下面有一條線 */
  border-bottom: 1px solid #ddd;
  /* 裡面的空間 */
  padding: 16px;
  /* 文字靠左 */
  text-align: center;
}

/* 標題文字 */
.header h1 {
  /* 的大小 */
  font-size: 24px;
  /* 粗粗的 */
  font-weight: bold;
  /* 颜色 */
  color: #333;
  /* 拿掉預設的距離 */
  margin: 0;
}
</style>