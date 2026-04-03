Q : 做出第一階段(便利貼列表)後，請跟我講哪一行程式碼負責記錄便利貼資訊的?那一行長什麼樣子?

A : 📋 程式碼解說
第一個檔案：src/data/mock.js（便利貼工廠）
這裡是記錄便利貼資訊的地方！整個檔案就像一個「便利貼工廠」，生產假資料給我們用。
// 便利貼清單（記錄所有便利貼的資訊）
- export const posts = [...] - 把便利貼清單「輸出」給其他檔案使用
- 每個 { } 大括號就是一張便利貼
- 便利貼裡有：id（編號）、author（誰寫的）、avatar（頭像）、content（內容）、likes（幾個讚）、liked（有沒有按讚）、time（什麼時候）
---
第二個檔案：src/components/PostList.vue（便利貼列表）
這裡負責把便利貼排成列表！
// 引入便利貼卡片小幫手
- v-for="post in posts" - 像迴圈一樣，把清單裡的每一張便利貼都跑一次
- :post="post" - 把便利貼的資料傳給卡片小幫手
---
第三個檔案：src/components/PostCard.vue（便利貼卡片）
這裡負責顯示一張便利貼的樣子！
// 這是「接收的禮物」- 從外面傳進來的便利貼資料
- defineProps({ post: {...} }) - 從外面接收「便利貼資料」這個禮物
- 收到後，在畫面中用 post.author、post.content、post.likes 來顯示