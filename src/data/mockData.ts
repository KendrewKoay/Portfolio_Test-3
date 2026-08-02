import { CreatorProfile, RedNote, PortfolioProject, BrandCollab, GuestbookMessage } from '../types';

import avatarImg from '../assets/images/creator_avatar_1785685393864.jpg';
import heroCoverImg from '../assets/images/hero_cover_1785685476259.jpg';
import noteCover1 from '../assets/images/red_note_cover_1_1785685494523.jpg';

export const RED_PROFILE_URL = "https://www.xiaohongshu.com/user/profile/5c66dbe60000000012002e94?xsec_token=YBmJSkMa8GqmQd8b8bx9pvC-tO7lRtwASqTtgxZ_gD9JA=&xsec_source=app_share&xhsshare=WeixinSession&appuid=5c66dbe60000000012002e94&apptime=1785685228&share_id=21318ee888e34ed9a6e013657eff235e&wechatWid=7be47578dd281e20efa3709fbf0f2f26&wechatOrigin=menu";

export const initialProfile: CreatorProfile = {
  name: "冰山啦啦啦",
  englishName: "Bingshan Lalala",
  redId: "896235769",
  avatarUrl: "https://sns-avatar-qc.xhscdn.com/avatar/625a65f3570af4d25f0cb24a.jpg",
  coverUrl: heroCoverImg,
  bio: "📍野生插画师｜设计师｜ISFJ\n🟡每日速写/插画  🟢看看新展\n🟣记录生活VLOG  ⚫️养了一只叫丸子的奶牛咪\n📚有关于绘本请戳👉@冰山的绘本藏宝洞\n✉️欢迎约稿，请私信",
  bioEn: "Wild Illustrator & Designer | ISFJ\nDaily sketches, exhibition vlogs, and creative illustration ZINEs. Cat mom to Maru. Commissions welcome!",
  location: "中国 南京 (Nanjing, China)",
  verifiedBadge: "小红书艺术创作者 / 野生插画师 & 设计师",
  tags: ["艺术创作者", "野生插画师", "巨蟹座", "绘本创作者", "ZINE/小豆本", "日常VLOG"],
  profileUrl: RED_PROFILE_URL,
  wechatId: "Bingshan_Art",
  email: "bingshan.art@gmail.com",
  instagram: "@bingshan_illust",
  stats: {
    followers: 10800,
    likesAndCollects: 18500,
    notesCount: 32,
    engagementRate: "12.8%"
  }
};

export const initialNotes: RedNote[] = [
  {
    id: "note-1",
    title: "插画小书｜RISO ZINE-房子的情绪 🏠",
    titleEn: "Illustration ZINE: Emotions of Houses (RISO Print)",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    category: "Visual Design",
    likes: 43,
    collects: 32,
    commentsCount: 12,
    publishDate: "2026-07-28",
    isHot: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🏠 用 RISO 孔版印刷制作的迷你艺术插画小书《房子的情绪》。

每一栋房子都有它独特的性格与喜怒哀乐，有微风吹拂窗帘的惬意，也有夜晚小灯独亮时的孤单...

配合特种纸与大豆油墨的温润质感，希望能给你带来一份治愈的情绪包裹～`,
    tags: ["#插画小书", "#RISO印刷", "#ZINE", "#插画师日常", "#审美日常"],
    redNoteUrl: RED_PROFILE_URL,
    comments: [
      { id: "c1", user: "丸子大厨的小粉丝", avatar: "https://picsum.photos/seed/user1/100/100", text: "抢到了！大豆油墨印刷色彩真的美哭我！", time: "2小时前", likes: 14 },
      { id: "c2", user: "ZINE爱好者", avatar: "https://picsum.photos/seed/user2/100/100", text: "请问什么时候会二次印制呀？好喜欢这套配色！", time: "5小时前", likes: 8 }
    ]
  },
  {
    id: "note-2",
    title: "插画|红山动物园游玩大攻略 🦒",
    titleEn: "Nanjing Hongshan Zoo Illustrated Guide",
    coverUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
    category: "Visual Design",
    likes: 159,
    collects: 112,
    commentsCount: 36,
    publishDate: "2026-07-15",
    isHot: true,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🐾 终于把去南京红山动物园的游玩路线画成手绘攻略啦！

包含杜杜（白面僧面猴）、考拉馆、小熊猫馆的打卡路线与避坑指南。手绘小地图非常适合随身携带打卡！`,
    tags: ["#红山动物园", "#插画攻略", "#南京旅游", "#手绘地图"],
    redNoteUrl: RED_PROFILE_URL,
    comments: [
      { id: "c3", user: "南京游玩小助手", avatar: "https://picsum.photos/seed/user3/100/100", text: "手绘攻略太可爱了！拿着去逛动物园超方便！", time: "1天前", likes: 25 }
    ]
  },
  {
    id: "note-3",
    title: "插画稿件｜谁会不爱夏日冰饮🍦和鸭鸭店长🦆",
    titleEn: "Summer Iced Drinks & Duck Store Manager",
    coverUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    category: "Visual Design",
    likes: 25,
    collects: 18,
    commentsCount: 8,
    publishDate: "2026-07-02",
    isHot: false,
    isFeatured: true,
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🍹 炎炎夏日约稿完成！萌萌的小鸭鸭店长为大家端上刨冰和冰汽水～用亮丽鲜艳的色彩传递清凉好心情！`,
    tags: ["#商业插画", "#插画约稿", "#夏日冰饮", "#治愈系插画"],
    redNoteUrl: RED_PROFILE_URL
  },
  {
    id: "note-4",
    title: "昆虫控狂喜🪲最近在南京可冲的虫虫展👀",
    titleEn: "Nanjing Insect Exhibition Vlog & Sketch",
    coverUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    category: "Vlog",
    likes: 14,
    collects: 9,
    commentsCount: 4,
    publishDate: "2026-06-25",
    isHot: false,
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🪲 最近沉浸在各种珍稀甲虫与昆虫形态的世界里！去看了超棒的昆虫展，现场做了一些速写记录，甲虫外壳的光泽真的太神奇了！`,
    tags: ["#看展VLOG", "#昆虫展", "#南京看展", "#速写练习"],
    redNoteUrl: RED_PROFILE_URL
  },
  {
    id: "note-5",
    title: "超迷你小豆本来啦～来自咪咪大厨的故事🧑‍🍳",
    titleEn: "Mini Bean Book - Story of Chef Cat",
    coverUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    category: "Visual Design",
    likes: 18,
    collects: 14,
    commentsCount: 6,
    publishDate: "2026-06-18",
    isHot: false,
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🐱 掌心大小的手工折叠小豆本！记录我家丸子咪咪大厨在厨房忙碌的一天～风琴折页排版，翻起来特别有仪式感！`,
    tags: ["#小豆本", "#手工书", "#绘本插画", "#猫咪插画"],
    redNoteUrl: RED_PROFILE_URL
  },
  {
    id: "note-6",
    title: "谁说平凡人的生活不值得记录 🌈📓",
    titleEn: "Everyday Life Visual Journal",
    coverUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    likes: 26,
    collects: 19,
    commentsCount: 9,
    publishDate: "2026-06-10",
    isHot: false,
    isFeatured: false,
    images: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80"
    ],
    content: `🖍️ 拿起画笔和手帐，把普通的早饭、路边的树影、窗外的雨滴画下来。平凡的日子也闪闪发光～`,
    tags: ["#手帐插画", "#生活记录", "#插画师速写"],
    redNoteUrl: RED_PROFILE_URL
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "proj-1",
    title: "《房子的情绪》RISO 艺术插画小书出版全案",
    titleEn: "RISO Art ZINE: Emotions of Houses",
    category: "Editorial & ZINE Publishing",
    client: "独立出版 / 冰山工作室",
    year: "2026",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    summary: "以自然建筑与情绪拟人为概念，采用大豆油墨孔版印刷（RISO），打造限量版插画小书，全网售罄并获得极高审美口碑。",
    metrics: [
      { label: "小红书互动量", value: "2.8k+" },
      { label: "首印售罄时间", value: "48 小时" },
      { label: "爆款转存率", value: "14.2%" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "全案包含故事拆解、孔版分色设计、特种纸张选型与线下艺术书展展位视觉布置。"
  },
  {
    id: "proj-2",
    title: "南京红山动物园 手绘导览指南与文创设计",
    titleEn: "Nanjing Hongshan Zoo Illustrated Guide & Merch",
    category: "Illustration & IP Design",
    client: "南京红山森林动物园",
    year: "2026",
    coverUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
    summary: "为南京红山动物园创作手绘折页导览与动物明星IP插画，吸引数万游客收藏与小红书打卡分享。",
    metrics: [
      { label: "全网阅读量", value: "50w+" },
      { label: "收藏转发量", value: "8,200+" },
      { label: "周边销售额", value: "Top 1" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
    ],
    description: "将对动物的关爱与科学科普融入温馨治愈的画风中，展现高品质的动物福利理念与自然之美。"
  },
  {
    id: "proj-3",
    title: "儿童科普刊物《天气与虫虫》画报插画系列",
    titleEn: "Children's Magazine Science Illustration Series",
    category: "Children's Book & Editorial",
    client: "少年儿童出版社",
    year: "2025",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    summary: "受邀为儿童画报创作连载插画，以趣味可爱的童心视角引导孩子观察自然天气与昆虫世界。",
    metrics: [
      { label: "期刊发行量", value: "100,000+" },
      { label: "读者好评率", value: "99.2%" },
      { label: "入选美展", value: "全国插画展" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    description: "用丰富的色彩与生动的造型表现自然科学规律，深受家长与小朋友们的喜爱。"
  }
];

export const brandCollabs: BrandCollab[] = [
  {
    id: "b1",
    brandName: "红山森林动物园",
    brandLogo: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=120&q=80",
    category: "文旅 IP & 插画",
    campaignTitle: "手绘动物园地图与导览特辑",
    deliverables: "小红书爆款图文笔记 + 手绘地图授权",
    impressions: "350,000+",
    engagementRate: "16.8%",
    coverImage: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80",
    quote: "“冰山啦啦啦老师的插画作品赋予了动物园生动治愈的情感，小红书薯友打卡好评如潮！”"
  },
  {
    id: "b2",
    brandName: "Twelve Moons 艺术空间",
    brandLogo: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=120&q=80",
    category: "艺术展览 & ZINE",
    campaignTitle: "《房子的情绪》独立插画新展",
    deliverables: "Vlog视频 + 线下画展特辑",
    impressions: "180,000+",
    engagementRate: "14.2%",
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    quote: "“现场画展反响热烈，冰山的作品具有极强的个人风格与审美辨识度。”"
  },
  {
    id: "b3",
    brandName: "少年儿童出版社",
    brandLogo: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=120&q=80",
    category: "出版 & 绘本",
    campaignTitle: "《与孩子一起观察天气》刊物特约插画",
    deliverables: "封面与内页插画连载",
    impressions: "250,000+",
    engagementRate: "11.5%",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    quote: "“细腻且充满童趣的笔触，将知识点转化为打动人心的视觉艺术。”"
  }
];

export const initialGuestbook: GuestbookMessage[] = [
  {
    id: "g1",
    authorName: "南京红山动物园文创团队",
    authorAvatar: "https://picsum.photos/seed/hongshan/100/100",
    role: "品牌合作方",
    date: "2026-07-29",
    content: "冰山老师手绘的红山攻略太棒啦！园里的游客们都拿着小红书打卡，期待接下来的第二季周边合作！",
    likesCount: 38,
    isLiked: true,
    tag: "合作好评"
  },
  {
    id: "g2",
    authorName: "丸子大厨的小粉丝",
    authorAvatar: "https://picsum.photos/seed/maru/100/100",
    role: "粉丝朋友",
    date: "2026-07-25",
    content: "抢到了《房子的情绪》小豆本！纸张质感和RISO印出来的大豆油墨色彩美哭我！冰山老师继续加油！",
    likesCount: 22,
    isLiked: false,
    tag: "忠实读者"
  }
];
