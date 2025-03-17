import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loginApi } from "../../apis/login";
import { QaListType } from "../../types/WriteQa";
import { Image } from "@chakra-ui/react";

interface AnswerType {
  answer: string;
  createdAt: string;
}

const QaDetail = () => {
  const { qaId } = useParams<{ qaId: string }>();
  const [post, setPost] = useState<QaListType | null>(null);
  const [answers, setAnswers] = useState<AnswerType[]>([]); // Updated type

  const PIC_URL = "http://112.222.157.157:5234";

  const fetchPostDetail = async () => {
    try {
      const res = await loginApi.get(`/api/qa/qaBoardDetail`, {
        params: { qaId: qaId },
      });
      setPost(res.data.resultData);
    } catch (error) {
      console.log("게시물 상세 정보 가져오기 에러:", error);
    }
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
    fetchPostDetail();
    fetchAnswers();
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
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">답글</h2>
            {answers.length > 0 ? (
              answers.map((answer, index) => (
                <div key={index} className="border-b border-gray-300 py-4">
                  <div className="font-semibold text-gray-800">
                    <span>잡던 관리자</span>
                  </div>
                  <div className="text-gray-600">{answer.answer}</div>
                  <div className="text-sm text-gray-500">
                    {answer.createdAt}
                  </div>
                </div>
              ))
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
