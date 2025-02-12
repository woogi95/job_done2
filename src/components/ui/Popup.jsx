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
}) => {
  const navigate = useNavigate();
  const handleConfirmClick = () => {
    // console.log("Confirm clicked");
    // console.log(confirmLink);
    if (confirmLink) {
      // console.log("Navigating to: ", confirmLink);
      navigate(confirmLink);
    } else if (onClose) {
      onClose();
    }
  };

  //
  const handleCancelClick = () => {
    // console.log("Cancel clicked");
    if (cancelLink) {
      // console.log("Navigating to: ", cancelLink);
      navigate(cancelLink);
    } else if (onCancel) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <PopupDiv>
      <PopupContDiv>
        {title && <h4>{title}</h4>}
        {message && <span>{message}</span>}
        <div className="btn-area">
          {showCancelButton && (
            <button type="button" onClick={handleCancelClick}>
              취소
            </button>
          )}

          {showConfirmButton && (
            <button type="button" onClick={handleConfirmClick}>
              확인
            </button>
          )}
        </div>
      </PopupContDiv>
    </PopupDiv>
  );
};
