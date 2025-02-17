const AdminHeader = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-gray-800">관리자님 환영합니다</span>
          <button className="ml-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
