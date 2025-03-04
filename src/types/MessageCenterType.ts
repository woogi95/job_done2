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
  pics?: CustomPic[];
  flag?: number;
  roomId?: number;
  contents?: string;
  logo?: string;
};

export type RoomType = {
  roomId: number;
  logo: string;
  businessName: string;
  title: string;
  roomCreatedAt: string;
};

export type ApiError = {
  response?: any;
  message: string;
};
