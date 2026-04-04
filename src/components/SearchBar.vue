<script setup>
// 引入「盒子」功能
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 這是「接收的禮物」- 所有用戶的資料
const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

// 這是「發送訊號」- 告訴外面有人選了某個用戶
const emit = defineEmits(['select-user'])

// 這個「盒子」用來存放搜尋框裡打字的內容
// 就像一張「記錄紙」，你打什麼字，它就記什麼
const searchQuery = ref('')

// 這個「盒子」用來記錄「有沒有顯示候選人名單」
const showResults = ref(false)

// 這個「盒子」用來記錄「有沒有顯示查無此人的彈窗」
const showNotFound = ref(false)

// 這個「計算盒」會自動做篩選
// 當你打字的時候，它會自動找出「名字有包含那個字」的同學
const filteredUsers = computed(() => {
  // 如果沒打任何字，就不顯示
  if (searchQuery.value.trim() === '') {
    return []
  }

  // 從「同學名單」中挑出名字有包含搜尋內容的
  return props.users.filter(user => 
    user.name.includes(searchQuery.value)
  )
})

// 當使用者在搜尋框打字時，會觸發這個功能
function handleInput() {
  // 顯示候選人名單
  showResults.value = true
}

// 當使用者按 Enter 鍵時，會觸發這個功能
function handleEnter() {
  // 檢查「候選人名單」有幾個
  if (filteredUsers.value.length === 1) {
    // 如果只有 1 個，直接選取那個人
    selectUser(filteredUsers.value[0])
  } else if (filteredUsers.value.length === 0) {
    // 如果是 0 個，顯示「查無此人」的彈窗
    showNotFound.value = true
    // 3 秒後自動關閉彈窗
    setTimeout(() => {
      showNotFound.value = false
    }, 3000)
  }
}

// 當使用者點擊某個候選人時，會觸發這個功能
// 就像說：「我選這個同學！」，然後發送訊號給外面
function selectUser(user) {
  // 把這個用戶的名字填入搜尋框
  searchQuery.value = user.name

  // 發送訊號出去，告訴外面：「有人選這個用戶了！）
  emit('select-user', user)

  // 隱藏候選人名單
  showResults.value = false
}

// 當使用者點擊「搜尋小幫手」外面時，會觸發這個功能
// 用來隱藏候選人名單
function handleClickOutside(event) {
  // 檢查點擊的地方是不是在「搜尋小幫手」裡面
  // 如果不是，就隱藏候選人名單
  const searchBar = document.querySelector('.search-bar')
  if (searchBar && !searchBar.contains(event.target)) {
    showResults.value = false
  }
}

// 「頁面出生時」- 開始監聽點擊事件
onMounted(() => {
  // 監聽整個文件的點擊
  document.addEventListener('click', handleClickOutside)
})

// 「頁面消失時」- 停止監聽點擊事件
onUnmounted(() => {
  // 不再監聽
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- 畫面：搜尋小幫手 -->
  <div class="search-bar">
    <!-- 搜尋框 -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="搜尋用戶..."
      class="search-input"
      @input="handleInput"
      @focus="showResults = true"
      @keydown.enter="handleEnter"
    />

    <!-- 候選人名單（當有結果時顯示） -->
    <div v-if="showResults && filteredUsers.length > 0" class="search-results">
      <!-- 把每個相符的用戶變成一個選項 -->
      <div
        v-for="user in filteredUsers"
        :key="user.name"
        class="search-result"
        @click="selectUser(user)"
      >
        <!-- 用戶頭像 -->
        <img :src="user.avatar" alt="頭像" class="result-avatar" />
        <!-- 用戶名字 -->
        <span class="result-name">{{ user.name }}</span>
      </div>
    </div>

    <!-- 查無此人的彈窗（當沒找到人時顯示） -->
    <div v-if="showNotFound" class="not-found-popup">
      查無此人
    </div>
  </div>
</template>

<style scoped>
/* 搜尋小幫手的樣式 */
.search-bar {
  /* 相對定位（讓候選人名單固定在這裡） */
  position: relative;
  /* 下面的間隔 */
  margin-bottom: 20px;
}

/* 搜尋框 */
.search-input {
  /* 寬度 100% */
  width: 100%;
  /* 沒有邊框 */
  border: 1px solid #ddd;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 12px 16px;
  /* 字體大小 */
  font-size: 15px;
  /* 盒子-sizing */
  box-sizing: border-box;
}

/* 搜尋框 focus 時的樣式 */
.search-input:focus {
  /* 藍色邊框 */
  border-color: #1976d2;
  /* 陰影 */
  outline: none;
  /* 陰影效果 */
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

/* 候選人名單 */
.search-results {
  /* 絕對定位（浮在搜尋框下面） */
  position: absolute;
  /* 充滿整個寬度 */
  left: 0;
  right: 0;
  /* 白色背景 */
  background: white;
  /* 陰影 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  /* 圓角 */
  border-radius: 8px;
  /* 裡面的空間 */
  padding: 8px 0;
  /* 最大的高度（可以滾動） */
  max-height: 200px;
  /* 自動滾動 */
  overflow-y: auto;
  /* 最上面留一點空間 */
  z-index: 100;
}

/* 候選人選項 */
.search-result {
  /* 橫向排列（頭像 + 名字） */
  display: flex;
  align-items: center;
  /* 內邊距 */
  padding: 10px 16px;
  /* 游標變手指 */
  cursor: pointer;
  /* 動畫效果 */
  transition: background 0.2s;
}

/* 滑鼠移到候選人上 */
.search-result:hover {
  /* 淡淡的灰色背景 */
  background: #f5f5f5;
}

/* 候選人頭像 */
.result-avatar {
  /* 圓圓的 */
  border-radius: 50%;
  /* 大小 */
  width: 32px;
  height: 32px;
  /* 右邊間隔 */
  margin-right: 12px;
}

/* 候選人名字 */
.result-name {
  /* 字的大小 */
  font-size: 15px;
  /* 顏色 */
  color: #333;
}

/* 查無此人的彈窗 */
.not-found-popup {
  /* 絕對定位（浮在搜尋框下面） */
  position: absolute;
  /* 充滿整個寬度 */
  left: 0;
  right: 0;
  /* 紅色背景 */
  background: #ffebee;
  /* 深紅色文字 */
  color: #c62828;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 12px 16px;
  /* 字體大小 */
  font-size: 15px;
  /* 文字居中 */
  text-align: center;
  /* 陰影 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  /* 最上面留一點空間 */
  z-index: 101;
}
</style>
