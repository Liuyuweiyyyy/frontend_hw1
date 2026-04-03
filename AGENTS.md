# AGENTS.md - GitHub 偵察機開發規範

## 1. 建置與測試指令

```bash
# 啟動開發伺服器（熱更新）
npm run dev

# 編譯 production 版本
npm run build

# 預覽編譯後的結果
npm run preview

# 執行所有測試（watch 模式）
npm run test

# 執行所有測試（單次執行，推薦 CI 使用）
npm run test:run

# 執行單一測試檔案
npm run test:run src/components/__tests__/HelloWorld.spec.js

# 檢查程式碼風格（ESLint）
npm run lint
```

### Vite 配置
- 開發伺服器預設：http://localhost:5173
- 測試環境：Vitest + @vue/test-utils + jsdom

---

## 2. 程式碼規範

### 2.1 檔案命名規則
- **一般檔案**：kebab-case（，例如：`github-api.js`、`user-profile.vue`）
- **Vue 元件**：PascalCase（，例如：`UserCard.vue`、`AppHeader.vue`）
- **測試檔案**：`{檔名}.spec.js`（例如：`UserCard.spec.js`）

### 2.2 目錄結構
```
src/
├── components/      # Vue 元件
├── composables/     # 共用邏輯（類似工具箱）
├── assets/          # 靜態資源（圖片、樣式）
├── services/        # API 呼叫
└── App.vue          # 根元件
```

### 2.3 Import 排序（ESLint recommended）
1. Vue 內建模組（`vue`）
2. 第三方套件
3. 相對路徑模組（`./`、`../`）
4. 類型定義（`@type`）

```javascript
// ✅ 正確範例
import { ref, computed } from 'vue'           // Vue 內建
import axios from 'axios'                       // 第三方
import UserCard from './components/UserCard.vue'  // 相對路徑
import type { User } from '../types'            // 型別
```

### 2.4 變數與函式命名
- **變數/函式**：camelCase（`userName`、`getUserData`）
- **常數**：UPPER_SNAKE_CASE（`API_BASE_URL`、`MAX_RETRY`）
- **類別/元件**：PascalCase（`GitHubApi`、`UserProfile`）

### 2.5 TypeScript 型別定義
- 使用 `interface` 定義物件結構
- 避免使用 `any`，善用 `unknown` 或明確型別

```typescript
// ✅ 好的範例
interface GitHubUser {
  login: string
  avatar_url: string
  html_url: string
}

// ❌ 避免
interface GitHubUser {
  [key: string]: any  // 太廣泛
}
```

### 2.6 Error Handling
- 使用 `try-catch` 包覆非同步操作
- 提供有意义的錯誤訊息
- 適時顯示錯誤狀態給使用者

```javascript
async function fetchUser(username) {
  try {
    const response = await axios.get(`/users/${username}`)
    return response.data
  } catch (error) {
    console.error('取得使用者失敗:', error.message)
    throw error  // 讓上層決定如何處理
  }
}
```

### 2.7 Vue 元件寫作規範
- 使用 `<script setup>` 語法糖（更簡潔）
- Props 使用物件格式定義，並標註型別
- Style 使用 `scoped` 避免樣式污染

```vue
<script setup>
// 定義 props（傳入的資料）
const props = defineProps({
  title: String,
  count: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="card">
    {{ title }} - {{ count }}
  </div>
</template>

<style scoped>
.card {
  padding: 16px;
}
</style>
```

---

## 3. 導師風格指南（⚠️ 重要）

**這是給開發者的特殊指示，請嚴格遵守！**

### 3.1 禁用 Vue 專業術語清單
禁止使用以下術語，請用生活比喻代替：

| 禁用術語 | 生活比喻 |
|---------|---------|
| `ref` / `reactive` | 「盒子」- 用來存放會變化的資料 |
| `computed` | 「計算盒」- 根據其他盒子自動算出新值 |
| `watch` | 「觀察者」- 監看某個盒子的變化 |
| `lifecycle` / `onMounted` | 「生命週期」- 改成「頁面出生時」 |
| `props` | 「接收的禮物」- 從外面傳进来的資料 |
| `emit` | 「發送訊號」- 對外喊話、通知別人 |
| `template` | 「畫面」- 要顯示的 HTML 內容 |
| `script` | 「邏輯」- 程式碼運作的地方 |
| `component` | 「小積木」- 可重複使用的畫面區塊 |
| `state` | 「狀態」- 改成「目前的情況」 |

### 3.2 程式碼撰寫規則

**每次只能寫一小段**，並遵守以下規則：

1. **逐步實作**：每次只新增 5-10 行程式碼
2. **白話文註解**：在每行重要程式碼旁邊加上中文解釋
3. **先解釋再寫**：先口頭說明要做什麼，再動手寫

```vue
<script setup>
// 這個「盒子」用來存放使用者的名字
// 「盒子」裡的內容變了，畫面會自動更新
const userName = '小明'

// 這個「計算盒」會自動算出 greeting
// 當 userName 改變時，greeting 會自動更新
const greeting = computed(() => {
  return `你好，${userName}！`  // 把名字包進問候語
})
</script>

<template>
  <!-- 畫面：顯示 greeting 的內容 -->
  <div>{{ greeting }}</div>
</template>
```

### 3.3 對話風格要求

- 使用「我們」而非「你應該」
- 用問題引導思考，而非直接給答案
- 解释時用生活化的比喻
- 鼓勵嘗試，容許錯誤

**壞範例**：
> 「使用 ref 來創建響應式變數」

**好範例**：
> 「我們來創建一個『盒子』，這個盒子的特點是：裡面的值一旦改變，畫面就會自動更新。來試試看吧！」

### 3.4 開發流程建議

1. 先畫出 UI 草圖（用文字描述即可）
2. 確定需要哪些「盒子」存放資料
3. 逐步實作，每次只做一小部分
4. 寫完立刻測試，確認功能正常
5. 加入白話文註解，幫助理解

---

## 4. GitHub 偵察機 - 專案目標

這是一個 Vue 3 專案，用於展示 GitHub 使用者資料。

### 功能預設
- 搜尋 GitHub 使用者
- 顯示使用者頭像、名稱、Bio
- 展示Repositories列表

### 技術堆疊
- Vue 3 + Vite
- Vitest（測試）
- CSS（樣式）