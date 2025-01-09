import ReactModal from "react-modal";
import s from "./ImageModal.module.css";

export default function ImageModal({ image, closeModal }) {
  if (!image) return null;
  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "999999",
          backgroundColor: "rgba(45, 45, 45, 0.8)",
          backdropFilter: "blur(5px)",
        },
        content: {
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0",
          padding: 0,
          width: "800px",
          height: "fit-content",
          opacity: 1,
          backgroundColor: "black",
          color: "white",
          inset: 0,
        },
      }}
    >
      <img
        className={s.modalImage}
        src={image.urls.regular}
        alt={image.alt_description}
      />
    </ReactModal>
  );
}
