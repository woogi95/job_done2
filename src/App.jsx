import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/login/Index";
import SignUpPage from "./pages/auth/login/SignUpPage";
import EmailPage from "./pages/auth/login/EmailPage";
import SignUpDone from "./pages/auth/login/SignUpDone";
import PasswordEmail from "./pages/auth/login/PasswordEmail";
import PasswordEmailCheck from "./pages/auth/login/PasswordEmailCheck";
import PasswordEdit from "./pages/auth/login/PasswordEdit";
import BusinessSignUp from "./pages/auth/business/Index";
import BusinessNumber from "./pages/auth/business/BusinessNumber";

import MyPage from "./pages/mypage/Index";
import MyMessage from "./pages/mypage/MyMessage";
import ReviewPage from "./pages/mypage/ReviewPage";
import UsageDetails from "./pages/mypage/UsageDetails";
import Wishlist from "./pages/mypage/Wishlist";
import MyReservation from "./pages/mypage/MyReservation";

import ExpertMain from "./pages/expert/ExpertMain";

import NotFound from "./pages/NotFound";

// 서비스페이지 (업체리스트/업체디테일)
// import CarWashPage from "./pages/servicepage/carwash/Index";
// import CleaningPage from "./pages/servicepage/cleaning/Index";
import Service from "./pages/servicepage/Index";
import Detail from "./pages/servicepage/Detail";
// 예약페이지
import Reservation from "./pages/reservation/Index";
import ReservationHistory from "./pages/reservation/ReservationHistory";

// --- 전문가 페이지
import ExportLayout from "./components/ExpertLayout";
// 업체관리
import CompanyInfo from "./pages/expert/company-management/CompanyInfo";
import EditCompanyInfo from "./pages/expert/company-management/EditCompanyInfo";
import EditDetailPage from "./pages/expert/company-management/EditDetailPage";
import ExpertDetailPage from "./pages/expert/company-management/ExpertDetailPage";
import Portfolio from "./pages/expert/company-management/Portfolio";
// 예약관리
import ReservationList from "./pages/expert/reservation-management/Index";
// 견적관리
import QuoteList from "./pages/expert/quote-management/Index";
import QuotationForm from "./pages/expert/quote-management/QuotationForm";
import EditQuotation from "./pages/expert/quote-management/EditQuotation";
// 결제관리
import PaymentList from "./pages/expert/payment-management/Index";
// 일정관리 - 3차
import ScheduleList from "./pages/expert/schedule-management/Index";
// 고객문의
import MessageCenter from "./pages/expert/message-center/Index";
// 리뷰센터
import ReviewCenter from "./pages/expert/review-center/Index";
// 통계
import Statistics from "./pages/expert/statistics/Index";
import ReviewView from "./pages/expert/review-center/ReviewView";
import ContactUs from "./pages/servicepage/ContactUs";
import Qna from "./pages/Qna";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import Estimate from "./components/papers/Estimate";
import UserReservLook from "./pages/mypage/UserReservLook";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* 카카오페이 관련 */}
          <Route path="/paySuccess" element={<PaymentSuccess />} />
          <Route path="/payFailed" element={<PaymentFailed />} />
          {/* QnA */}
          <Route path="/qna" element={<Qna />} />
          {/* 메인 페이지 */}
          <Route path="/" element={<Index />} />
          {/* 로그인 및 회원가입 */}
          <Route path="/login">
            <Route index element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="email" element={<EmailPage />} />
            <Route path="signupdone" element={<SignUpDone />} />
            <Route path="epwcheck" element={<PasswordEmail />} />
            <Route path="epw" element={<PasswordEmailCheck />} />
            <Route path="epwedit" element={<PasswordEdit />} />
          </Route>
          {/* 사업자 등록*/}
          <Route path="/business">
            <Route index element={<BusinessSignUp />} />
            <Route path="number" element={<BusinessNumber />} />
          </Route>
          {/* 예약페이지 */}
          <Route path="/reservation">
            <Route index element={<Reservation />} />
            <Route path="history" element={<ReservationHistory />} />
          </Route>
          {/* 세차 페이지 */}
          {/* <Route path="/carwash">
            <Route index element={<CarWashPage />} />
          </Route> */}
          {/* 청소 페이지 */}
          {/* <Route path="/cleaning">
            <Route index element={<CleaningPage />} />
          </Route> */}
          {/* 이사 페이지 */}
          <Route path="/service">
            <Route index element={<Service />} />
            <Route path="contactus" element={<ContactUs />} />
            <Route path=":id" element={<Detail />} />
          </Route>
          {/* 마이페이지 */}
          <Route path="/mypage">
            <Route index element={<MyPage />} />
            <Route path="message" element={<MyMessage />} />
            <Route path="reservation" element={<MyReservation />} />
            <Route path="review" element={<ReviewPage />} />
            <Route path="usage" element={<UsageDetails />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="/estimate/:serviceId" element={<Estimate />} />
          <Route
            path="/UserReservLook/:serviceId"
            element={<UserReservLook />}
          />
        </Route>
        {/* ----- 전문가 페이지 ----- */}
        <Route element={<ExportLayout />}>
          <Route path="/expert">
            {/* 관리자 */}
            <Route index element={<ExpertMain />} />
            {/* 업체관리 */}
            <Route path="/expert/company-management">
              <Route index element={<CompanyInfo />} />
              <Route path="edit" element={<EditCompanyInfo />} />
              <Route path="editdetail" element={<EditDetailPage />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="detail" element={<ExpertDetailPage />} />
            </Route>
            {/* 예약관리 */}
            <Route path="/expert/reservation-management">
              <Route index element={<ReservationList />} />
            </Route>
            {/* 견적관리 */}
            <Route path="/expert/quote-management">
              <Route index element={<QuoteList />} />
              <Route path="quotation-form" element={<QuotationForm />} />
              <Route path="edit-quotation" element={<EditQuotation />} />
            </Route>
            {/* 결제관리 */}
            <Route path="/expert/payment-management">
              <Route index element={<PaymentList />} />
            </Route>
            {/* 일정관리 - 3차 */}
            <Route path="/expert/schedule-management">
              <Route index element={<ScheduleList />} />
            </Route>
            {/* 고객문의 */}
            <Route path="/expert/message-center">
              <Route index element={<MessageCenter />} />
            </Route>
            {/* 리뷰문의 */}
            <Route path="/expert/review-center">
              <Route index element={<ReviewCenter />} />
              <Route path="reviewview" index element={<ReviewView />} />
            </Route>
            {/* 통계 */}
            <Route path="/expert/statistics">
              <Route index element={<Statistics />} />
            </Route>
          </Route>
        </Route>
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
