export type WriteQaType = {
  p: {
    qaTypeDetailId: number;
    contents: string;
    qaReportReason: string;
    qaTargetId: number;
  };
};

export type ImageInfoType = {
  pk: number;
};

export type QaType = {
  qaTypeDetailId: number;
  qaDetailReason: string;
};

export interface QaListType {
  id: number;
  title: string;
  userName: string;
  createdAt: string;
  qaView: number;
  qaId: number;
  contents: string;
  reason: string;
  pics: string[];
  userType: string;
  qaType: string;
  qaState: string;
}
