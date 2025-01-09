import s from "./ImageCard.module.css";

export default function ImageCard({ src, alt, onClick }) {
  return (
    <li>
      <div onClick={onClick}>
        <img className={s.image} src={src} alt={alt} width="300" height="200" />
      </div>
    </li>
  );
}
