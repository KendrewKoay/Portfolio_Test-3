export interface CreatorStats {
  followers: number;
  likesAndCollects: number;
  notesCount: number;
  engagementRate: string;
}

export interface CreatorProfile {
  name: string;
  englishName: string;
  redId: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  bioEn: string;
  location: string;
  verifiedBadge: string;
  tags: string[];
  profileUrl: string;
  wechatId: string;
  email: string;
  instagram: string;
  stats: CreatorStats;
}

export interface RedNoteComment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

export interface RedNote {
  id: string;
  title: string;
  titleEn?: string;
  coverUrl: string;
  category: 'Lifestyle' | 'Visual Design' | 'Tech & AI' | 'Fashion' | 'Vlog';
  likes: number;
  collects: number;
  commentsCount: number;
  publishDate: string;
  isHot?: boolean;
  isFeatured?: boolean;
  images: string[];
  content: string;
  tags: string[];
  redNoteUrl?: string;
  comments?: RedNoteComment[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  client: string;
  year: string;
  coverUrl: string;
  summary: string;
  metrics: { label: string; value: string }[];
  gallery: string[];
  description: string;
}

export interface BrandCollab {
  id: string;
  brandName: string;
  brandLogo: string;
  category: string;
  campaignTitle: string;
  deliverables: string;
  impressions: string;
  engagementRate: string;
  coverImage: string;
  quote?: string;
}

export interface GuestbookMessage {
  id: string;
  authorName: string;
  authorAvatar: string;
  role?: string;
  date: string;
  content: string;
  likesCount: number;
  isLiked?: boolean;
  tag?: string;
}
