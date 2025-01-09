import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ gallery, onClick }) {
  return (
    <ul className={s.gallery}>
      {gallery.map((image) => (
        <ImageCard
          onClick={() => onClick(image)}
          key={image.id}
          src={image.urls.small}
          alt={image.alt_description}
        />
      ))}
    </ul>
  );
}
