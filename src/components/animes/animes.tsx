import { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import { Link, useNavigate } from "react-router-dom";

export const TotalUserAnime = () => {
  const roundLogRef = useRef<HTMLSpanElement>(null);
  const totalUser = 194643;

  const totalUserAnime = () => {
    if (roundLogRef.current) {
      anime({
        targets: roundLogRef.current,
        innerHTML: [0, totalUser.toLocaleString()],
        easing: "linear",
        round: 1,
        duration: 1500,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 2900) {
        totalUserAnime();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center my-[100px]">
      <div className="flex flex-col justify-center items-center">
        <span className="text-[52px] font-bold text-[#1e1e1e] mt-20 pt-[100px]">
          지금까지 이용자 수
        </span>
        <div className="text-[48px] font-bold text-[#ffffff] my-20">
          <span ref={roundLogRef} className="round-log">
            0
          </span>
          명
        </div>
      </div>
    </div>
  );
};

export const Intermediary = () => {
  const stepRef = useRef<HTMLDivElement>(null);

  const stepAnime = () => {
    if (stepRef.current) {
      stepRef.current.style.opacity = "0";

      anime({
        targets: stepRef.current,
        translateX: [0, 50],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 2000,
        easing: "easeOutQuad",
      });
    } else {
      console.error("stepRef is not attached to a DOM element.");
    }
  };

  useEffect(() => {
    if (stepRef.current) {
      stepRef.current.style.opacity = "0";
    }

    const handleScroll = () => {
      if (window.scrollY >= 4700) {
        stepAnime();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#ffffff]">
      <div className="max-w-3xl mx-auto p-6 bg-white mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          중개 절차 안내
        </h1>
        <div className="space-y-6" ref={stepRef}>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              1. 상담 및 요구사항 파악
            </h2>
            <p className="text-gray-700">
              고객의 요구사항을 파악하고, 적합한 서비스를 추천합니다.
            </p>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              2. 서비스 제공자 매칭
            </h2>
            <p className="text-gray-700">
              고객의 요구에 맞는 서비스 제공자를 매칭합니다.
            </p>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              3. 계약 체결
            </h2>
            <p className="text-gray-700">
              서비스 제공자와 고객 간의 계약을 체결합니다. 계약서에는 서비스
              내용, 비용, 기간 등이 명시됩니다.
            </p>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              4. 서비스 제공
            </h2>
            <p className="text-gray-700">
              계약에 따라 서비스가 제공됩니다. 이 과정에서 고객은 진행 상황을
              확인할 수 있습니다.
            </p>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              5. 피드백 및 평가
            </h2>
            <p className="text-gray-700">
              서비스 완료 후 고객의 피드백을 받고, 서비스 제공자를 평가합니다.
            </p>
          </div>
          <div className="step">
            <h2 className="text-xl font-semibold text-blue-600">
              6. 사후 관리
            </h2>
            <p className="text-gray-700">
              필요 시 추가 지원이나 사후 관리를 제공합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LinkToSignUp = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const linkElement = linkRef.current;
    if (linkElement) {
      const handleMouseEnter = () => {
        anime({
          targets: linkElement.querySelector(".link-text"),
          translateX: 100,
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: linkElement.querySelector(".link-text"),
          translateX: 0,
        });
      };

      linkElement.addEventListener("mouseenter", handleMouseEnter);
      linkElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        linkElement.removeEventListener("mouseenter", handleMouseEnter);
        linkElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="max-w-[1100px] m-auto py-[80px]">
      <div className="flex justify-center items-center">
        <Link
          to="/login"
          ref={linkRef}
          target="_blank"
          className="flex items-center justify-center w-full h-[200px] bg-gradient-to-br from-blue-500 to-purple-500 text-white text-[38px] font-bold rounded-lg shadow-lg transition-transform duration-200"
        >
          <span className="link-text">
            JOBDONE 회원가입하고 더 많은 혜택을 누리세요!
          </span>
        </Link>
      </div>
    </div>
  );
};

export const ServiceCenter = () => {
  const navigate = useNavigate();
  const serviceRef = useRef<HTMLDivElement>(null);

  const serviceAnime = () => {
    if (serviceRef.current) {
      serviceRef.current.style.opacity = "0";

      anime({
        targets: "#inquiry-banner",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        easing: "easeOutElastic(1, .5)",
        delay: 500,
      });

      anime({
        targets: "#inquiry-banner .bg-gradient-to-r",
        translateY: [-10, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: "easeOutExpo",
      });
    } else {
      console.error("stepRef is not attached to a DOM element.");
    }
  };
  useEffect(() => {
    if (serviceRef.current) {
      serviceRef.current.style.opacity = "0";
    }

    const handleScroll = () => {
      if (window.scrollY >= 5300) {
        serviceAnime();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, []);
  return (
    <div className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div
        id="inquiry-banner"
        className="max-w-4xl mx-auto px-4 cursor-pointer transition-all duration-300 hover:scale-105"
        role="button"
        ref={serviceRef}
        onClick={() => navigate("/qna")}
      >
        <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-blue-200/50 hover:shadow-blue-300/50 transition-shadow">
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              도움이 필요하신가요?
            </span>
            <p className="text-lg text-gray-600 text-center">
              전문 상담사가 24시간 내로 답변드립니다
            </p>
            <div className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-lg font-semibold transition-transform duration-200 hover:scale-110">
              문의하기 →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
