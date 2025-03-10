export type CustomFile = {
  name: string;
  type: string;
  data: string;
};

export type CustomPic = {
  pic: string;
  name: string;
};

export type MessageType = {
  message?: string;
  username?: string;
  file?: CustomFile;
  pic?: CustomPic;
  flag?: number;
  roomId?: number;
  contents?: string;
  logo?: string;
  createdAt?: string;
  userPic?: string;
  logo2?: string;
  recentlyChat?: string;
};

export type RoomType = {
  roomId: number;
  logo: string;
  businessName: string;
  title: string;
  roomCreatedAt: string;
  pic: string;
  recentlyChat: string;
  userName: string;
};

export type ApiError = {
  response?: any;
  message: string;
};
