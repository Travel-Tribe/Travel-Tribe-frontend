import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  buttonText?: string;
  buttonClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title = "알림",
  message,
  buttonText = "확인",
  buttonClassName = "btn btn-success btn-sm text-slate-50",
}: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal modal-open">
      <div className="modal-box relative">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className={buttonClassName} onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
