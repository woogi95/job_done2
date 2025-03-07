import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import ReactQuill from "react-quill";

function TestPage2() {
  const [isClick, setIsClick] = useState(false);
  const [cate, setCate] = useState("문의사항");

  return (
    <div className="mt-[80px] flex-grow pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center">
            <div className="relative">
              <div
                className="flex gap-2 items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors w-48"
                onClick={() => setIsClick(!isClick)}
              >
                <span className="text-gray-700">{cate}</span>
                {isClick ? (
                  <FaCaretUp className="text-gray-500" />
                ) : (
                  <FaCaretDown className="text-gray-500" />
                )}
              </div>
              {isClick && (
                <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setCate("문의사항");
                      setIsClick(false);
                    }}
                  >
                    문의사항
                  </div>
                  <div
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setCate("불편사항");
                      setIsClick(false);
                    }}
                  >
                    불편사항
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                김
              </div>
              <div className="text-lg font-medium text-gray-700">김길동</div>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-1">
            <label htmlFor="title" className="text-gray-700 font-medium">
              제목
            </label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-1">
            <label className="text-gray-700 font-medium">내용</label>
            <div className="border border-gray-200 rounded-lg h-[430px]">
              <ReactQuill
                className="h-[390px] w-full"
                placeholder="문의 및 불편사항을 상세히 작성해주세요."
                readOnly={false}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                  "image",
                ]}
              />
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-6">
            <div className="text-gray-700 font-medium">첨부파일</div>
            <label
              htmlFor="fileinput"
              className="flex items-center gap-2 px-6 py-2 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors"
            >
              <MdFileDownload className="text-xl text-gray-500" />
              <span className="text-gray-600">
                파일을 드래그하거나 클릭하여 업로드
              </span>
            </label>
            <input type="file" id="fileinput" className="hidden" />
          </div>
        </div>

        {/* Button Section */}
        <div className="flex justify-end gap-3 mt-10">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button className="px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
            임시 저장
          </button>
          <button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPage2;
