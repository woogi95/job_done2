import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loginApi } from "../../apis/login";
import { QaListType } from "../../types/WriteQa";
import { Image } from "@chakra-ui/react";
import { Answer } from "../../types/TypeBox";

const QaDetail = () => {
  const { qaId } = useParams<{ qaId: string }>();
  const [post, setPost] = useState<QaListType | null>(null);
  const [answers, setAnswers] = useState<Answer>();

  const PIC_URL = "https://job-done.r-e.kr:52340";

  const fetchPostDetail = async () => {
    try {
      const res = await loginApi.get(`/api/qa/qaBoardDetail`, {
        params: { qaId: qaId },
      });
      setPost(res.data.resultData);
    } catch (error) {}
  };

  const fetchAnswers = async () => {
    try {
      const res = await loginApi.get("/api/qa/answer", {
        params: { qaId: qaId },
      });
      setAnswers(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (qaId) {
      fetchPostDetail();
      fetchAnswers();
    }
  }, [qaId]);

  return (
    <div className="max-w-[1000px] mx-auto p-6 bg-white rounded-lg shadow-md">
      {post && (
        <>
          {/* 제목 영역 */}
          <h1 className="text-[32px] font-bold mb-6 text-gray-800">
            {post.title}
          </h1>

          {/* 내용 영역 */}
          <div className="mb-8">
            <div className="flex border-2 border-gray-700 rounded-lg px-5 py-10 bg-gray-100">
              <div className="whitespace-pre-wrap font-sans text-gray-700 text-lg">
                {post.contents}
              </div>
            </div>
          </div>

          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(post.pics) &&
              post.pics.map((imgUrl: string, index: number) => (
                <div key={index} className="aspect-w-1 aspect-h-1">
                  <Image
                    src={`${PIC_URL}${imgUrl}`}
                    alt={`첨부 이미지 ${index + 1}`}
                    className="w-full h-auto object-contain rounded-lg max-w-[250px]"
                  />
                </div>
              ))}
          </div>

          {/* 답글 영역 */}
          <div className="flex justify-center items-center w-[100%] h-[2px] mt-20 bg-gray-300 mx-auto"></div>
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-700">답글</h2>
            {answers ? (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="font-medium text-gray-600 mb-2">
                  <span>작성자 : 잡던 관리자</span>
                </div>
                <div className="flex items-center py-5 border-t border-b border-gray-200">
                  <span className="flex font-semibold text-gray-800">
                    답변 :{" "}
                  </span>
                  <div className="flex ml-2 text-gray-700">
                    {answers.answer}
                  </div>
                </div>
                <div className="text-sm text-gray-500 my-2">
                  답변 시각 : {answers.createdAt}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">답글이 없습니다.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QaDetail;
