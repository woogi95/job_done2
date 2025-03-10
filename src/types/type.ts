// 고객 정보 조회
export interface UserInfoType {
  userName: string;
  phone: string;
  detailTypeName: string | null;
  serviceNumber: number;
  userId: number;
  type: string;
}
// 카테고리별 업체 조회
export interface CategoryBusiType {
  applicationCreatedAt: string;
  reviewScore: number;
  reviewNumbers: number;
  detailTypeName: string;
  userName: string;
  businessName: string;
  tel: string;
}
// 카테고리 등록
export interface CategoryResiType {
  categoryName: string;
}
// 업체 신청 리스트
export interface BusinessApplyType {
  applicationCreatedAt: string;
  paper: string;
  detailTypeName: string;
  userName: string;
  businessName: string;
  state: number;
  businessId: number;
}
// 통계
// 일주일 방문자 수
export interface StatsvisitorType {
  date: string;
  dateOfWeek: string;
  visitorCount: number;
}
// 6개월 총매출 조회
export interface StatssalesType {
  month: string;
  totalSales: number;
  cleaningSales: number;
  movingSales: number;
  carWashSales: number;
}
// 카테고리 별 업체 비율 조회
// 데이터형태 바꿔야됨 카테고리별 조회
// 주요 통계
export interface StatsMain {
  growthRate: number;
  newCustomerCount: number;
  averageRating: number;
  cleaningAverageRating: number;
  movingAverageRating: number;
  carWashAverageRating: number;
  compeletedServiceCount: number;
}
// 대쉬보드 정보 조회
export interface StatesDashType {
  newServiceCount: number;
  newServicePercent: number;
  newUserCount: number;
  newUserPercent: number;
  unprocessedInquiries: number;
  increaseUnprocessedInquiries: number;
  newBusinessCount: number;
  newBusinessCountThenYesterday: number;
}
// 관리자 메인페이지
// 6개월 매출 조회
export interface SalesInfoDtosType {
  categoryName: string;
  totalPrice: number;
}
export interface StateSixMonthType {
  month: string;
  totalPrice: number;
  salesInfoDtos: SalesInfoDtosType[];
}
// 일주일 접속한 유저 수
export interface StateVitorType {
  date: string;
  dateOfWeek: string;
  visitorCount: number;
}
// ===============================================================
// 문의 사항
export interface QaType {
  createdAt: string;
  qaId: number;
  userName: string;
  userType: string;
  qaType: string;
  qaState: string;
}
// 관리자 > 문의내역 상세 조회
export interface DetailQaType {
  contents: string;
  pics: [string];
}
// 유저 > 문의 등록
export interface QaResisterType {
  qaTypeDetailId: number;
  contents: string;
  qaReportReason: string;
  qaTargetId: number;
}
// 관리자 > 문의 답변
export interface QAnswerType {
  qaId: number;
  answer: string;
}
