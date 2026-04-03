// 這個檔案用來放「假的」貼文資料
// 就像便利貼工廠，先做好幾張假的便利貼給大家看

// 便利貼清單（記錄所有便利貼的資訊）
export const posts = [
  {
    // 便利貼編號 1
    id: 1,
    // 誰寫的便利貼
    author: '小明',
    // 便利貼的圖片（Q版卡通風格）
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=ming',
    // 便利貼裡寫什麼
    content: '今天天氣真好！去公園玩囉～',
    // 有幾個人按讚
    likes: 5,
    // 按讚了嗎（是/否）
    liked: false,
    // 什麼時候寫的
    time: '2 小時前'
  },
  {
    // 便利貼編號 2
    id: 2,
    author: '小華',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=hua',
    content: '吃到好吃的冰淇淋！開心～',
    likes: 12,
    liked: false,
    time: '5 小時前'
  },
  {
    // 便利貼編號 3
    id: 3,
    author: '小美',
    avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=mei',
    content: '看完一本好書，推薦給大家！',
    likes: 8,
    liked: false,
    time: '昨天'
  }
]