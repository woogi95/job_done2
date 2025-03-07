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
