type User = {
  id: string;
  name: string?;
  email: string;
  password: string;
  customTag: string?;
  createdAt: Date;
  updatedAt: Date;
  bio: string?;
  emailVerified: Date?;
  image: string?;
  coverImage: string?;
  profileImage: string?;
  hashedPassword: string;
  isVerified: boolean;
  deletedAt: Date?;
  followingId: string[];
  followerId: string[];
  hasNotifications: boolean;
  isActived: boolean;
  posts: Post[];
  comments: _Comment[];
  notifications: Notification[];
  replays: Replay[];
  nestedReplays: NestedReplay[];
  skills: Skill[];
  projects: Project[];
};

type Post = {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date?;
  image: string?;
  likesId: string[];
  viewsId: string[];
  user: User;
  comments: _Comment[];
  isShared: boolean;
  fromSharedId: string?;
  postSharedCreatedAt: Date?;
  hashTags: string[];
};

type _Comment = {
  id: string;
  userId: string;
  postId: string;
  body: string;
  likesId: string[];
  createdAt: Date;
  updatedAt: Date;
  replays: Replay[];
};

type Replay = {
  id: string;
  userId: string;
  postId: string;
  commentId: string;
  body: string;
  likesId: string[];
  createdAt: Date;
  updatedAt: Date;
  nestedReplays: NestedReplay[];
};

type NestedReplay = {
  id: string;
  userId: string;
  replayId: string;
  body: string;
  likesId: string[];
  createdAt: Date;
  updatedAt: Date;
};

type Notification = {
  id: string;
  userId: string;
  body: string;
  createdAt: Date;
  type: string;
  link: string;
  isRead: boolean;
  fromId: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  startDate: Date?;
  endDate: Date?;
  link: string;
  userId: string;
};

type Skill = {
  id: string;
  name: string;
  userId: string;
};
