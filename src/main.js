
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getGalleryElement,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector(".load-more");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

form.addEventListener("submit", onSearchSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);


async function onSearchSubmit(e) {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ title: "Warning", message: "Please enter a search query" });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.info({
        title: "No results",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    iziToast.success({
      title: "Success",
      message: `Found ${totalHits} images for "${currentQuery}"`,
    });


    const perPage = data.hits.length;
    const shownSoFar = currentPage * perPage;
    if (shownSoFar < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error("Fetch error:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong while fetching images. Please try again later.",
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreButton();
  showLoader();

  currentPage += 1;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    try {
      const galleryEl = getGalleryElement();
      const firstCard = galleryEl.querySelector(".gallery-item");
      if (firstCard) {
        const { height } = firstCard.getBoundingClientRect();
        window.scrollBy({
          top: height * 2,
          behavior: "smooth",
        });
      }
    } catch (scrollErr) {
      console.warn("Scroll error:", scrollErr);
    }

    const perPage = data.hits.length; // 15
    const shownSoFar = currentPage * perPage;
    if (shownSoFar >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "End",
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error("Fetch error:", error);
    iziToast.error({
      title: "Error",
      message: "Something went wrong while fetching more images. Please try again later.",
    });
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}
