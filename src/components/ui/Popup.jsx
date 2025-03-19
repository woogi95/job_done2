import { useNavigate } from "react-router-dom";
import { PopupContDiv, PopupDiv } from "./ui";

export const Popup = ({
  isOpen,
  onClose,
  title,
  message,
  onCancel,
  showCancelButton,
  showConfirmButton,
  cancelLink,
  confirmLink,
  onConfirm,
}) => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    if (onConfirm) {
      onConfirm();
    } else if (confirmLink) {
      navigate(confirmLink);
    } else if (onClose) {
      onClose();
    }
  };

  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    } else if (cancelLink) {
      navigate(cancelLink);
    } else if (onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <PopupDiv>
      <PopupContDiv>
        {title && <h4>{title}</h4>}
        {message && <span>{message}</span>}
        <div className="btn-area" style={{ border: "1px solid transparent" }}>
          {showCancelButton && (
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          )}

          {showConfirmButton && (
            <button
              style={{ backgroundColor: "#11b1e1", minHeight: "35px" }}
              type="button"
              onClick={handleConfirmClick}
            >
              확인
            </button>
          )}
        </div>
      </PopupContDiv>
    </PopupDiv>
  );
};
