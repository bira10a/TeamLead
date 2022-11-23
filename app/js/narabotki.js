$(function(){

  // ЗВЁЗДНЫЙ РЕЙТИНГ
  //========================================================================================================================================================
    $(".comments__star, .product__star").rateYo({
    starWidth: "16px",
    starHeight: "15px",
    normalFill: "rgba(193, 193, 193, 0.3)",
    ratedFill: "#FFB800",
    spacing: "6px",
    readOnly: true,
  }); 
  
  $(".comments__rating-star").rateYo({
    starWidth: "16px",
    starHeight: "15px",
    normalFill: "#C1C1C1",
    ratedFill: "#FFB800",
    spacing: "6px",
  });


  // Табсы
  //========================================================================================================================================================
  $('.products-tabs__top-link').on('click', function(e){
    e.preventDefault();
    $('.products-tabs__top-link').removeClass('products-tabs__top-link--active');
    $(this).addClass('products-tabs__top-link--active');

    $('.products-tabs__content-item').removeClass('products-tabs__content-item--active');
    $($(this).attr('href')).addClass('products-tabs__content-item--active');
  })

  // изменение цены в инпуте и с помощью ползунка
//========================================================================================================================================================

  var $range = $(".shop-filters__input-price");
  var $inputFrom = $(".shop-filters__input-from");
  var $inputTo = $(".shop-filters__input-to");
  var instance;
  var min = 0;
  var max = 1200;
  var from = 0;
  var to = 0;

  $('.shop-filters__input-price').ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: 100,
    to: 1000,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs

  });

  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val
    });

    $(this).prop("value", val);

  });

  $inputTo.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val
    });

    $(this).prop("value", val);
  });


  // кастом инпут, добавляем + - как нам надо...
  //========================================================================================================================================================
  $('.products-card__input').styler();
  $('.basket-card__input').styler();
  $('.product__input').styler();
  

  // изменение и добавление новых классов при действиях (клик например)
  $('.header-bottom__btn, .header-bottom__item').on('click', function () {
    $('.header-bottom__list').toggleClass('header-bottom__list--active');
    $('.header-bottom__btn').toggleClass('header-bottom__btn--active'); 
  })

  $('.user-nav__link-basket, .basket__exit').on('click', function () {
    $('.basket').toggleClass('basket--active');
    // $('body').toggleClass('body--hidden');
  })

  $('.form-search__btn-mobile').on('click', function () {
    $('.form-search__input-mobile').toggleClass('form-search__input-mobile--active');
    $('.form-search__btn').toggleClass('form-search__btn--active');
    $('.form-search__btn-mobile').toggleClass('form-search__btn-mobile--active');
    $('.form-search').toggleClass('form-search--mobile');
  })

  $('.header-top__btn-mobile, .menu-mobile__exit').on('click', function () {
    $('.menu-mobile').toggleClass('menu-mobile--active');
  })

  $('.shop-content__top-btn').on('click', function () {
    $('.shop-content__top-btn').removeClass('shop-content__top-btn--active');
    $(this).addClass('shop-content__top-btn--active');
  })

  $('.shop-content__top-btn-list').on('click', function(){
    $('.shop-content__products').addClass('shop-content__products--list');
  });

  $('.shop-content__top-btn-grid').on('click', function () {
    $('.shop-content__products').removeClass('shop-content__products--list');
  });

  $('.shop-content__top-btnFilter, .shop-filters__button').on('click', function () {
    $('.shop-filters').toggleClass('shop-filters--active');
  });


  // СЛАЙДЕР - SLICK
  //========================================================================================================================================================
  
  $('.top-slider__items').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    fade: true,
    autoplay: true,
    autoplaySpead: 2000,
    dots: true,
  });

  $('.product-slaider').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
  });

  $('.product__popup-list').slick({
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    dots: true,
  });


  // СЛАЙДЕР - swiper
  //========================================================================================================================================================

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 4,
    spaceBetween: 30,
    autoHeight: true,
    allowTouchMove: true,
    freeMode: true,
    simulateTouch: false,
    loop: false,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper__button-next',
      prevEl: '.swiper__button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 5,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1330: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });


  // ПОЛЬЗОВАТЕЛЬСКИЙ СЛАЙДЕР
  //========================================================================================================================================================

  let sliders = document.querySelectorAll('.sliderrrr');
  // sliders - список всех элементов с классом class="slider"
  // sliders[0] — первый элемент, sliders[1] — второй, sliders[i] — i-тый.

  for (let i = 0; i < sliders.length; i++) {
    // Перебирает все, вызывает функцию для каждого.
    init_slider(sliders[i]);
  }

  function init_slider(slider) {
    // Значение slider: Очередной sliders[i], переданный при вызове функции.

    let slide = slider.querySelectorAll('.slide');
    // Вместо document.query... Получается список всех class="slide"
    // которые находятся где-то внутри текущего элемента slider.

    let next = slider.querySelector('.next');
    // Кнопка next внутри этого slider.

    let i = 0;
    // Номер текущего "открытого" слайда.

    next.addEventListener('click', function () {
      slide[i].classList.remove('block');
      // slide[i] - открытый слайд. Скрываем.

      i = (i + 1) % slide.length; // (*1)

      slide[i].classList.add('block');
      // slide[i] - следующий слайд. Показываем.
    });
  }


  // var mixer = mixitup('.top-products__content'); для одного михера на странице, тогда div container не нужен
//========================================================================================================================================================

  var containerEl1 = document.querySelector('[data-ref="container-1"]');
  var containerEl2 = document.querySelector('[data-ref="container-2"]');

  var config = {
    controls: {
      scope: 'local'
    }
  };

  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);

    
})



// работа с селект в catalog-page.html, можно также через плагин, который styler, чуть ввыше по коду, он менял инпут
//========================================================================================================================================================

$('.select').each(function () {
  const _this = $(this),
    selectOption = _this.find('option'),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(':selected'),
    duration = 350; // длительность анимации

  _this.hide();
  _this.wrap('<div class="select"></div>');
  $('<div>', {
    class: 'new-select',
    text: _this.children('option:disabled').text()
  }).insertAfter(_this);

  const selectHead = _this.next('.new-select');
  $('<div>', {
    class: 'new-select__list'
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.new-select__list');
  for (let i = 1; i < selectOptionLength; i++) {
    $('<div>', {
      class: 'new-select__item',
      html: $('<span>', {
        text: selectOption.eq(i).text()
      })
    })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.new-select__item');
  selectList.slideUp(0);
  selectHead.on('click', function () {
    if (!$(this).hasClass('on')) {
      $(this).addClass('on');
      selectList.slideDown(duration);

      selectItem.on('click', function () {
        let chooseItem = $(this).data('value');

        $('select').val(chooseItem).attr('selected', 'selected');
        selectHead.text($(this).find('span').text());

        selectList.slideUp(duration);
        selectHead.removeClass('on');
      });

    } else {
      $(this).removeClass('on');
      selectList.slideUp(duration);
    }
  });
}); 


// активация overlay...клик установлен в html
//========================================================================================================================================================

function onOverlay() {
  document.getElementById("overlay").style.display = "block";
  document.querySelector(".menu-mobile").style.zIndex = "201";
  document.querySelector(".basket").style.zIndex = "201";
};

function offOverlay() {
  document.getElementById("overlay").style.display = "none";
};

let headerMobileBtn = document.querySelector('.header-top__btn-mobile');
headerMobileBtn.addEventListener('click', onOverlay);

let menuMobile = document.querySelector('.menu-mobile');
menuMobile.addEventListener('click', offOverlay);

let userNavLinkBasket = document.querySelector('.user-nav__link-basket');
userNavLinkBasket.addEventListener('click', onOverlay);

let basketExit = document.querySelector('.basket__exit');
basketExit.addEventListener('click', offOverlay);

let basketBtn = document.querySelector('.basket__bottom-btn');
basketBtn.addEventListener('click', offOverlay);


//========================================================================================================================================================


// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body
Для родителя блоков табов можно указать data-tabs-hash, это втключит добавление хеша

Если нужно чтобы табы открывались с анимацией 
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms, 
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры", на неком размере экранов, пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/

function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(tabsMediaItem => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
        let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
};

//========================================================================================================================================================
function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

// Обработа медиа запросов из атрибутов 
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(",")[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach(item => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia
        })
      });
      return mdQueriesArray;
    }
  }
}

tabs();
//========================================================================================================================================================


//======================================================================================================================================================== БУРГЕР
// BURGER

document.addEventListener('DOMContentLoaded', () => {

  //Mobile Menu
  const burger = document.querySelector('.burger'); //наша кнопка
  const mobileMenu = document.querySelector('.menu'); //мобильное меню
  const bodyLock = document.querySelector('body'); //ищем как селектор ТЕГА

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu--active'); //когда меню открыто
    if (mobileMenu.classList.contains('menu--active')) { //Проверяем, есть ли у меню активный класс
      burger.classList.add('burger--active'); //Когда открыто, иконка становится крестиком
      bodyLock.classList.add('lock'); //Блокируем скролл при открытом меню
    }
    else { //Когда нету активного класса у меню
      burger.classList.remove('burger--active'); //Возвращает в исходное состояние
      bodyLock.classList.remove('lock'); //Разрешаем скроллить
    }
  });
  //Клик вне таргета
  document.addEventListener('click', function (e) {
    if (e.target !== burger && e.target !== mobileMenu) {
      burger.classList.remove('burger--active');
      mobileMenu.classList.remove('menu--active');
      bodyLock.classList.remove('lock');
    }
  });
});

//========================================================================================================================================================
// HEADER - BTN SEARCH
document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector('.menu__icons-btn--search');
  const menuForm = document.querySelector('.menu__form');
  const menuFormBtn = document.querySelector('.menu__form-btn');
  $(window).scroll(function () {
    if ($(document).scrollTop() > 100) {
      $(".header__menu").addClass("header__menu--sticky ");
    } else {
      $(".header__menu").removeClass("header__menu--sticky ");
    }
  });
  search.addEventListener('click', () => {
    menuForm.classList.toggle('menu__form--active');
  });

  menuFormBtn.addEventListener('click', () => {
    menuForm.classList.toggle('menu__form--active');
  });
});


// HEADER - BTN BASkET
document.addEventListener('DOMContentLoaded', () => {
  const basket = document.querySelector('.menu__icons-btn--cart');
  const menuBasket = document.querySelector('.menu__basket');
  const basketExit = document.querySelector('.basket__exit');

  basket.addEventListener('click', () => {
    menuBasket.classList.toggle('menu__basket--active');
  });

  basketExit.addEventListener('click', () => {
    menuBasket.classList.toggle('menu__basket--active');
  });
});

//======================================================================================================================================================== БУРГЕР
// BURGER

document.addEventListener('DOMContentLoaded', () => {

  //Mobile Menu
  const burger = document.querySelector('.burger'); //наша кнопка
  const mobileMenu = document.querySelector('.menu__body'); //мобильное меню
  const bodyLock = document.querySelector('body'); //ищем как селектор ТЕГА

  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('menu__body--active'); //когда меню открыто
    if (mobileMenu.classList.contains('menu__body--active')) { //Проверяем, есть ли у меню активный класс
      burger.classList.add('burger--active'); //Когда открыто, иконка становится крестиком
      bodyLock.classList.add('lock'); //Блокируем скролл при открытом меню
    }
    else { //Когда нету активного класса у меню
      burger.classList.remove('burger--active'); //Возвращает в исходное состояние
      bodyLock.classList.remove('lock'); //Разрешаем скроллить
    }
  });
  //Клик вне таргета
  document.addEventListener('click', function (e) {
    if (e.target !== burger && e.target !== mobileMenu) {
      burger.classList.remove('burger--active');
      mobileMenu.classList.remove('menu__body--active');
      bodyLock.classList.remove('lock');
    }
  });
});

//======================================================================================================================================================== 
$(window).scroll(function () {
  if ($(document).scrollTop() > 100) {
    $(".header__menu").addClass("header__menu--sticky ");
  } else {
    $(".header__menu").removeClass("header__menu--sticky ");
  }
});