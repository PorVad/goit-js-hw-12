import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});
export function createGallery(images) {
  if (!Array.isArray(images) || images.length === 0) return;

  const markup = images
    .map((img) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <div class="thumb">
              <img loading="lazy" src="${webformatURL}" alt="${tags}" />
            </div>
            <div class="info">
              <div class="info-cell">
                <b>Likes</b>
                <span>${likes}</span>
              </div>
              <div class="info-cell">
                <b>Views</b>
                <span>${views}</span>
              </div>
              <div class="info-cell">
                <b>Comments</b>
                <span>${comments}</span>
              </div>
              <div class="info-cell">
                <b>Downloads</b>
                <span>${downloads}</span>
              </div>
            </div>
          </a>
        </li>
      `;
    })
    .join("");

  galleryContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
}

export function showLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add("is-active");
  loaderEl.style.display = "block";
  loaderEl.setAttribute("aria-hidden", "false");
}

export function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.remove("is-active");
  loaderEl.style.display = "none";
  loaderEl.setAttribute("aria-hidden", "true");
}

export function showLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.add("is-visible");
  loadMoreBtn.style.display = "block";
}

export function hideLoadMoreButton() {
  if (!loadMoreBtn) return;
  loadMoreBtn.classList.remove("is-visible");
  loadMoreBtn.style.display = "none";
}

export function getGalleryElement() {
  return galleryContainer;
}
