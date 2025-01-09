import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./gallery-api";
import "modern-normalize";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    if (!query.trim()) return;
    const getGalleryData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results } = await fetchImages({ query, page });
        setGallery((prev) => [...prev, ...results]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getGalleryData();
  }, [query, page]);
  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) {
      toast.error("Please change query!");
      return;
    }
    if (!newQuery) {
      toast.error("Please enter query text!");
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
    document.body.classList.add("modalOpen");
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
    setSelectedImage(null);
    setIsOpen(false);
    document.body.classList.remove("modalOpen");
  };
  return (
    <>
      <SearchBar onSearchChange={handleChangeQuery} />
      <ImageGallery gallery={gallery} onClick={handleOpenModal} />
      {gallery.length > 0 && (
        <LoadMoreBtn onPageAdd={handleLoadMore} page={page} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isOpen && (
        <ImageModal image={selectedImage} closeModal={handleCloseModal} />
      )}
    </>
  );
};

export default App;
