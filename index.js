import{a as P,S as A,i}from"./assets/vendor-BNibzuFn.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const q="https://pixabay.com/api/",$="52565301-d9213fb435e2a20dcf29b0aa1",B=15;async function m(t,s=1){const r={key:$,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:B,page:s};try{return(await P.get(q,{params:r})).data}catch(n){throw n}}const g=document.querySelector(".gallery"),a=document.querySelector(".loader"),l=document.querySelector(".load-more"),F=new A(".gallery a",{captionsData:"alt",captionDelay:250});function p(t){if(!Array.isArray(t)||t.length===0)return;const s=t.map(r=>{const{webformatURL:n,largeImageURL:e,tags:o,likes:u,views:L,comments:S,downloads:E}=r;return`
        <li class="gallery-item">
          <a class="gallery-link" href="${e}">
            <div class="thumb">
              <img loading="lazy" src="${n}" alt="${o}" />
            </div>
            <div class="info">
              <div class="info-cell">
                <b>Likes</b>
                <span>${u}</span>
              </div>
              <div class="info-cell">
                <b>Views</b>
                <span>${L}</span>
              </div>
              <div class="info-cell">
                <b>Comments</b>
                <span>${S}</span>
              </div>
              <div class="info-cell">
                <b>Downloads</b>
                <span>${E}</span>
              </div>
            </div>
          </a>
        </li>
      `}).join("");g.insertAdjacentHTML("beforeend",s),F.refresh()}function M(){g.innerHTML=""}function b(){a&&(a.classList.add("is-active"),a.style.display="block",a.setAttribute("aria-hidden","false"))}function v(){a&&(a.classList.remove("is-active"),a.style.display="none",a.setAttribute("aria-hidden","true"))}function h(){l&&(l.classList.add("is-visible"),l.style.display="block")}function f(){l&&(l.classList.remove("is-visible"),l.style.display="none")}function O(){return g}const w=document.querySelector(".form"),x=w.querySelector('input[name="search-text"]'),R=document.querySelector(".load-more");let y="",c=1,d=0;w.addEventListener("submit",_);R.addEventListener("click",C);async function _(t){t.preventDefault();const s=x.value.trim();if(!s){i.warning({title:"Warning",message:"Please enter a search query"});return}y=s,c=1,d=0,M(),f(),b();try{const r=await m(y,c);if(!r||!Array.isArray(r.hits)||r.hits.length===0){i.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}d=r.totalHits,p(r.hits),i.success({title:"Success",message:`Found ${d} images for "${y}"`});const n=r.hits.length;c*n<d?h():f()}catch(r){console.error("Fetch error:",r),i.error({title:"Error",message:"Something went wrong while fetching images. Please try again later."})}finally{v()}}async function C(){f(),b(),c+=1;try{const t=await m(y,c);if(!t||!Array.isArray(t.hits)||t.hits.length===0){i.info({title:"End",message:"We're sorry, but you've reached the end of search results."}),f();return}p(t.hits);try{const e=O().querySelector(".gallery-item");if(e){const{height:o}=e.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}catch(n){console.warn("Scroll error:",n)}const s=t.hits.length;c*s>=d?(f(),i.info({title:"End",message:"We're sorry, but you've reached the end of search results."})):h()}catch(t){console.error("Fetch error:",t),i.error({title:"Error",message:"Something went wrong while fetching more images. Please try again later."}),h()}finally{v()}}
//# sourceMappingURL=index.js.map
