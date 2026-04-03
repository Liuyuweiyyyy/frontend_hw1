<script setup>
// 這是「接收的禮物」- 從外面傳進來的便利貼資料
// 便利貼上寫什麼、誰寫的、幾個讚...都是從這裡收到的
const props = defineProps({
  // 便利貼的完整資料
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- 畫面：便利貼卡片 -->
  <div class="post-card">
    <!-- 便利貼的作者資訊（左上角） -->
    <div class="post-header">
      <!-- 作者的頭像圖片 -->
      <img :src="post.avatar" alt="頭像" class="avatar" />
      <!-- 作者名字和發文時間 -->
      <div class="post-info">
        <span class="author-name">{{ post.author }}</span>
        <span class="post-time">{{ post.time }}</span>
      </div>
    </div>

    <!-- 便利貼的內容（中間） -->
    <div class="post-content">
      {{ post.content }}
    </div>

    <!-- 便利貼的按讚資訊（下方） -->
    <div class="post-footer">
      <!-- 愛心圖案和按讚數 -->
      <span class="like-count">❤️ {{ post.likes }}</span>
    </div>
  </div>
</template>

<style scoped>
/* 便利貼卡片樣式 */
.post-card {
  /* 白色背景像真的便利貼 */
  background: white;
  /* 四周有圓圓的角落 */
  border-radius: 12px;
  /* 輕輕的陰影，讓它浮起來 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 裡面的空間 padding */
  padding: 16px;
  /* 下面的間隔 */
  margin-bottom: 16px;
}

/* 作者資訊區塊 */
.post-header {
  /* 橫向排列（頭像 + 名字） */
  display: flex;
  align-items: center;
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 頭像樣式 */
.avatar {
  /* 圓圓的頭像 */
  border-radius: 50%;
  /* 大小 */
  width: 40px;
  height: 40px;
  /* 右边稍微间隔 */
  margin-right: 12px;
}

/* 作者資訊區塊 */
.post-info {
  /* 垂直排列（名字在上面，時間在下面） */
  display: flex;
  flex-direction: column;
}

/* 作者名字 */
.author-name {
  /* 粗粗的字 */
  font-weight: bold;
  /* 字的大小 */
  font-size: 16px;
  /* 顏色 */
  color: #333;
}

/* 發文時間 */
.post-time {
  /* 淡淡的灰色 */
  color: #888;
  /* 小小的字 */
  font-size: 12px;
}

/* 便利貼內容 */
.post-content {
  /* 内容稍微粗 */
  font-size: 15px;
  /* 行高（行與行之間的距离） */
  line-height: 1.5;
  /* 顏色 */
  color: #333;
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 底部（按讚資訊） */
.post-footer {
  /* 上面有一條線 */
  border-top: 1px solid #eee;
  /* 上面空間 */
  padding-top: 12px;
  /* 淡淡的灰色 */
  color: #666;
}
</style>