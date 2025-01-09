import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onPageAdd, page }) {
  return (
    <div className={s.btnContainer}>
      {page > 0 && (
        <button className={s.loadMoreBtn} onClick={onPageAdd}>
          Load more
        </button>
      )}
    </div>
  );
}
