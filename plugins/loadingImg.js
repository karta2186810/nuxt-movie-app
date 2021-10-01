import Vue from 'vue'
import loading from '@/assets/images/loading.svg'
export const loadingImg = {
  bind(el) {
    if (!el.firstChild.src) return

    const loadingImg = document.createElement('img')
    loadingImg.classList.add('loadingImg')
    loadingImg.src = loading

    if (!el.firstChild.complete) {
      el.classList.add('g-relative')
      el.appendChild(loadingImg)
    }

    el.firstChild.onload = function () {
      if (el.contains(loadingImg)) {
        el.classList.remove('g-relative')
        el.removeChild(loadingImg)
      }
    }
  },
}

Vue.directive('loading', loadingImg)
