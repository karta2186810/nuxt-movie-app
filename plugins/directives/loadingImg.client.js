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
    } else if (el.contains(loadingImg)) {
      el.removeChild(loadingImg)
      el.innerHTML = '<i class="ri-error-warning-line errorImg"></i>'
    }

    el.firstChild.onload = function () {
      if (el.contains(loadingImg)) {
        el.classList.remove('g-relative')
        el.removeChild(loadingImg)
      }
    }
    el.firstChild.onerror = function () {
      if (el.contains(loadingImg)) {
        el.removeChild(loadingImg)
      }
      el.innerHTML = '<i class="ri-error-warning-line errorImg"></i>'
    }
  },
}

Vue.directive('loading', loadingImg)
