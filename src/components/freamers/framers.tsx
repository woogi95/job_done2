import { BusinessItem, StealReview } from "../../types/TypeBox";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useEffect, useState } from "react";

export const FramerMotionSlider = ({
  items,
  LOGO_URL,
}: {
  items: BusinessItem[];
  LOGO_URL: string;
}) => {
  const totalItems = [...items, ...items];
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(prev => -prev);
    }, 50000);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `${direction * -items.length * 100}%` }}
        transition={{
          duration: 1500,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {totalItems.map((item, index) => (
          <motion.div
            key={`${item.businessId}-${index}`}
            className="md:min-w-[150px] md:h-[150px] min-w-[120px] h-[120px] rounded-lg shadow-md md:my-5 my-2 overflow-hidden"
            style={{
              userSelect: "none",
              pointerEvents: "none",
              marginRight: "20px",
            }}
          >
            <img
              src={`${LOGO_URL}${item.logo}`}
              alt="로고"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const FramerMotionSlider2 = ({
  items,
  LOGO_URL,
}: {
  items: BusinessItem[];
  LOGO_URL: string;
}) => {
  const totalItems = [...items, ...items];
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(prev => -prev);
    }, 50000);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `${direction * -items.length * 100}%` }}
        transition={{
          duration: 1000,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {totalItems.map((item, index) => (
          <motion.div
            key={`${item.businessId}-${index}`}
            className="md:min-w-[150px] md:h-[150px] min-w-[120px] h-[120px] rounded-lg shadow-md my-5 overflow-hidden"
            style={{
              userSelect: "none",
              pointerEvents: "none",
              marginRight: "20px",
            }}
          >
            <img
              src={`${LOGO_URL}${item.logo}`}
              alt="로고"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const FramerMotionSlider3 = ({
  items,
  LOGO_URL,
}: {
  items: StealReview[];
  LOGO_URL: string;
}) => {
  const stealReview = [...items, ...items];
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(prev => -prev);
    }, 60000);

    return () => clearTimeout(timer);
  }, [direction]);

  return (
    <div className="overflow-hidden" style={{ overflowX: "hidden" }}>
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `${direction * -stealReview.length * 100}%` }}
        transition={{
          duration: 7000,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          display: "flex",
          width: `${stealReview.length * 100}px`,
          overflowX: "hidden",
        }}
      >
        {stealReview.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            className="min-w-[300px] h-[230px] rounded-lg shadow-md my-5 overflow-hidden"
            style={{
              userSelect: "none",
              pointerEvents: "none",
              marginRight: "20px",
            }}
          >
            <div className="min-w-[300px] min-h-[230px] bg-[#f0f0f0] rounded-lg p-5">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={`${LOGO_URL}${item.pic}`}
                />
                <div className="flex justify-between w-full">
                  <div>{item.name.slice(0, 1)}**</div>
                  <div className="flex items-center gap-[2px]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < item.score ? (
                          <FaStar className="text-[#FF9D00]" />
                        ) : (
                          <FaRegStar className="text-[#FF9D00]" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-3 leading-snug">
                {item.contents.length > 150
                  ? `${item.contents.slice(0, 150)}...`
                  : item.contents}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
