"use strict";

function throttle(func, delay) {
  var wait = false;
  return function () {
    if (wait) {
      return;
    }
    func.apply(void 0, arguments);
    wait = true;
    setTimeout(function () {
      wait = false;
    }, delay);
  };
}
function debounce(func, delay) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(context, args);
    }, delay);
  };
}

// =========================== Фикс скачка браузерного скролла и плавной прокрутки ==========================================

var scrollController = {
  scrollPosition: 0,
  disabledScroll: function disabledScroll(fixedElement) {
    if (fixedElement) {
      var fixedElements = document.querySelectorAll(fixedElement);
      fixedElements.forEach(function (element) {
        element.style.paddingRight = "".concat(parseInt(window.innerWidth - document.body.offsetWidth), "px");
      });
    }
    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = "\n      overflow: hidden;\n      position: fixed;\n      top: -".concat(scrollController.scrollPosition, "px;\n      left: 0;\n      height: 100vh;\n      width: 100vw;\n      padding-right: ").concat(parseInt(window.innerWidth - document.body.offsetWidth), "px;\n    ");
    document.documentElement.style.scrollBehavior = "unset";
  },
  enabledScroll: function enabledScroll(fixedElement) {
    document.body.style.cssText = "";
    window.scroll({
      top: scrollController.scrollPosition
    });
    document.documentElement.style.scrollBehavior = "";
    if (fixedElement) {
      var fixedElements = document.querySelectorAll(fixedElement);
      fixedElements.forEach(function (element) {
        element.style.paddingRight = "0";
      });
    }
  }
};

//=========================== Функции fadeIn fadeOut ======================

function fadeIn(element, display) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var el = element;
  var elStyles = window.getComputedStyle(el);
  if (elStyles.display === "none") {
    var _animate = function animate(currentTime) {
      var elapsedTime = currentTime - startTime;
      var progress = elapsedTime / duration;
      element.style.opacity = progress;
      if (progress < 1) {
        requestAnimationFrame(_animate);
      } else {
        element.style.cssText = "display: ".concat(display, ";");
      }
    };
    element.style.display = display;
    element.style.opacity = 0;
    var startTime = performance.now();
    requestAnimationFrame(_animate);
  } else {
    return;
  }
}
function fadeOut(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var el = element;
  var elStyles = window.getComputedStyle(el);
  if (elStyles.display !== "none") {
    var _animate2 = function animate(currentTime) {
      var elapsedTime = currentTime - startTime;
      var progress = 1 - elapsedTime / duration;
      element.style.opacity = progress;
      if (progress > 0) {
        requestAnimationFrame(_animate2);
      } else {
        element.style.cssText = "display: none;";
      }
    };
    element.style.opacity = 1;
    var startTime = performance.now();
    requestAnimationFrame(_animate2);
  } else {
    return;
  }
}
;
var burgerButton = document.querySelector(".burger-button");
if (burgerButton) {
  var openSiteMenu = function openSiteMenu() {
    headerContainer.classList.add("site-header__container--overlayed");
    siteMenu.classList.add("site-navigation--active");
  };
  var closeSiteMenu = function closeSiteMenu() {
    headerContainer.classList.remove("site-header__container--overlayed");
    burgerButton.classList.remove("burger-button--active");
    siteMenu.classList.remove("site-navigation--active");
  };
  var changeMenuView = function changeMenuView(width) {
    if (!width) {
      closeSiteMenu();
    }
  };
  var burgerMenuWidth = window.matchMedia("(max-width: 768px)");
  var headerContainer = document.querySelector(".site-header__container");
  var siteMenu = document.querySelector(".site-navigation");
  burgerButton.addEventListener("click", function () {
    burgerButton.classList.toggle("burger-button--active");
    if (burgerButton.classList.contains("burger-button--active")) {
      openSiteMenu();
    } else {
      closeSiteMenu();
    }
  });
  burgerMenuWidth.onchange = function (e) {
    changeMenuView(e.matches);
  };
}
;
function modalInit(_ref) {
  var modalWindow = _ref.modalWindow,
    buttonOpen = _ref.buttonOpen,
    buttonClose = _ref.buttonClose;
  var searchModal = document.querySelector(modalWindow);
  if (searchModal) {
    var _closeModal = function closeModal(event) {
      searchInput.value = "";
      searchInput.blur();
      searchModal.classList.remove("search--active");
      modalBody.classList.remove("search__container--active");
      setTimeout(function () {
        searchModal.removeAttribute("style");
        scrollController.enabledScroll(".fixed-block");
      }, 300);
      window.removeEventListener("keydown", _closeModal);
      searchModal.removeEventListener("click", _closeModal);
    };
    var openModal = function openModal() {
      searchModal.style.display = "flex";
      searchInput.focus();
      setTimeout(function () {
        searchModal.classList.add("search--active");
        modalBody.classList.add("search__container--active");
      }, 10);
      window.addEventListener("keydown", function (e) {
        if (e.keyCode === 27 && searchModal.classList.contains("search--active")) {
          _closeModal();
        }
        if (e.keyCode === 9 && searchModal.classList.contains("search--active")) {
          return;
        }
      });
      searchModal.addEventListener("click", function (e) {
        if (!e.target === modalBody && searchModal.classList.contains("search--active") || e.target === searchModal || e.target === closeModalButton) {
          _closeModal();
        }
      });
      scrollController.disabledScroll(".fixed-block");
    };
    var openModalButtons = document.querySelectorAll(buttonOpen);
    var closeModalButton = searchModal.querySelector(buttonClose);
    var searchInput = searchModal.querySelector(".search__input");
    var modalBody = searchModal.querySelector(".search__container");
    openModalButtons.forEach(function (item) {
      item.addEventListener("click", openModal);
    });
  }
  ;
}
;
modalInit({
  modalWindow: ".search",
  buttonOpen: ".site-header__button",
  buttonClose: ".search__close-button"
});
var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.querySelector('.search__results'),
  json: '/search.json',
  searchResultTemplate: '<li><a href="{url}"><img src="{image}"><span>{title}</span></a></li>',
  noResultsText: '<li class="search__not-found">Ничего не найдено 🙁</li>'
});
var downloadButton = document.querySelector(".button--download");
if (downloadButton) {
  var userLanguages = navigator.languages;
  if (!userLanguages.includes("ru-RU") || !userLanguages.includes("ru")) {
    downloadButton.lastChild.textContent = "download";
  }
}
;
var shareOpenButton = document.querySelector(".share__button");
if (shareOpenButton) {
  var otherShareList = document.querySelector(".share__other");
  var countersLinks = document.querySelectorAll(".share__link span");
  setTimeout(function () {
    countersLinks.forEach(function (el) {
      var elCount = el.textContent;
      if (Number(elCount) > 0) {
        el.parentElement.classList.add("share__link--hoverable");
      }
    });
  }, 1000);
  shareOpenButton.addEventListener("click", function (e) {
    e.stopPropagation(); // предотвращаем всплытие события
    shareOpenButton.classList.toggle("share__button--active");
    if (shareOpenButton.classList.contains("share__button--active")) {
      otherShareList.classList.add("share__other--active");
    } else {
      otherShareList.classList.remove("share__other--active");
    }
  });

  // Обработчик клика по документу
  document.addEventListener("click", function (e) {
    // Проверяем, не был ли клик внутри otherShareList или на самой кнопке
    if (!otherShareList.contains(e.target) && e.target !== shareOpenButton) {
      shareOpenButton.classList.remove("share__button--active");
      otherShareList.classList.remove("share__other--active");
    }
  });
}
;
var pinButtons = document.querySelectorAll(".pin-button");
if (pinButtons.length > 0) {
  pinButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var pinImage = button.previousElementSibling;
      var imageURL = pinImage.src;
      var description = pinImage.alt;
      var fullPinURL = "https://pinterest.com/pin/create/button/?url=".concat(encodeURIComponent(window.location.href), "&media=").concat(encodeURIComponent(imageURL), "&description=").concat(encodeURIComponent(description));
      window.open(fullPinURL, "_blank");
    });
  });
}
;