export const ServiceSkeleton = () => {
  return (
    <div className="flex flex-col rounded-xl w-1/3 gap-[10px] relative bg-white p-[10px] shadow-lg animate-pulse">
      <div className="aspect-[4/3] w-full rounded-lg bg-gray-200"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-7 bg-gray-200 rounded w-1/3"></div>
      <div className="flex justify-between items-center">
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};
