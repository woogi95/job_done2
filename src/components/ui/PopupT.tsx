import { PopupDiv, PopupTContDiv } from "./ui";

interface PopupTProps {
  isOpen: boolean;
  message: string;
  showConfirmButton: boolean;
  handleConfirmClick: () => void;
}

const PopupT = ({
  isOpen,
  message,
  showConfirmButton,
  handleConfirmClick,
}: PopupTProps) => {
  if (!isOpen) return null;
  return (
    <PopupDiv>
      <PopupTContDiv>
        {message && <span className="t-message">{message}</span>}
        {showConfirmButton && (
          <button
            className="t-confirm-btn"
            type="button"
            onClick={handleConfirmClick}
          >
            확인
          </button>
        )}
      </PopupTContDiv>
    </PopupDiv>
  );
};

export default PopupT;
