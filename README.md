>Q : - v-for="post in posts" - 像迴圈一樣，把清單裡的每一張便利貼都跑一次。
>這一行的v-for是什麼意思呢，為什麼="post in posts"?

```
A : 🔄 什麼是 v-for？
你有一疊便利貼，裡面有 3 張：
📋 便利貼疊（posts）
   ├── 第1張：小明的便利貼
   ├── 第2張：小華的便利貼
   └── 第3張：小美的便利貼
v-for="post in posts" 是什麼意思？
就像老師說：「把便利貼一張一張拿出來，每張都變成卡片！」
v-for="post in posts"
        │       │
        │       ▼ 便利貼疊（全部）
        ▼
   一次拿一張出來（叫做 post）
```

>Q : 📋 v-if="page === 'home'" → 不顯示
>📋 v-else-if="page === 'profile'" → 顯示 UserProfile 
>這邊的v-if和v-else-if是什麼意思呢，為什麼要==='home'或'profile'

```
A : 📋 完整的比喻
┌─────────────────────────────────────────┐
│  檢查天氣盒子（第1個）                    │
│  如果（if）天氣是「晴天」→ 顯示 ☀️        │
│  不然不然（else-if）天氣是「雨天」→ 🌧️    │
│  不然不然（else-if）天氣是「陰天」→ ☁️    │
└─────────────────────────────────────────┘
因為 page 是一個盒子，它裡面可能放：
- 'home'（首頁）
- 'profile'（個人檔案）
=== 就像問問題：
「這個盒子的值是不是等於 'home'？」
```

>Q : 跟我講解第三階段的程式碼

```
A : 🔑 關鍵程式碼說明
1. v-model="newPostContent"（CreatePost.vue 第 41 行） 
v-model 就像「綁定繩子」：
輸入框 ↔ 盒子（同步更新）
你打字 → 盒子裡的字跟著變
盒子裡的字變 → 輸入框跟著變
2. emit('add-post', newPost)（CreatePost.vue 第 26 行）
emit 就像「發送訊號」：
告訴外面：「有人按發布了，這是新貼文！）
3. @add-post="handleAddPost"（App.vue 第 78 行）
@add-post 就像「接收訊號」：
接住 emit 的訊號，然後執行 handleAddPost
4. posts.value.unshift(newPost)（App.vue 第 47 行）
unshift 就像「從前面放」：
便利貼盒子：[舊貼文1, 舊貼文2]
                   │
                   ▼ 放新貼文
便利貼盒子：[新貼文, 舊貼文1, 舊貼文2]
                   ↑
              出現在最前面！
```

>Q : 這其中的post.liked是什麼，怎麼做出愛心轉換的?

```
A : post.liked程式碼說明
<span class="heart">{{ post.liked ? '❤️' : '🤍' }}</span>
post.liked ? '❤️' : '🤍'
            │
            ▼ 這叫「三元運算子」
            如果 post.liked 是 true → 顯示 ❤️
            如果 post.liked 是 false → 顯示 🤍
按讚就像開關電燈：
 - 本來是暗的（沒按讚），按下去變亮（有按讚）
 - 本來是亮的（有按讚），再按一次變暗（取消讚）
 ```
