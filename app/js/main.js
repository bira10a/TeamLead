function Sim(sldrId) {

  let id = document.getElementById(sldrId);
  if (id) {
    this.sldrRoot = id
  }
  else {
    this.sldrRoot = document.querySelector('.reviews__slider')
  };

  // Slider objects
  this.sldrList = this.sldrRoot.querySelector('.reviews__list');
  this.sldrElements = this.sldrList.querySelectorAll('.reviews__item');
  this.sldrElemFirst = this.sldrList.querySelector('.reviews__item');
  this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
  this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
  this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');

  // Initialization
  this.options = Sim.defaults;
  Sim.initialize(this)
};

Sim.defaults = {

  // Default options for the slider
  loop: true,     // Бесконечное зацикливание слайдера
  auto: true,     // Автоматическое пролистывание
  interval: 5000, // Интервал между пролистыванием элементов (мс)
  arrows: true,   // Пролистывание стрелками
  dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement -= num;
  if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

  if (!this.options.loop) {
    if (this.currentElement == 0) {
      this.leftArrow.style.display = 'none'
    };
    this.rightArrow.style.display = 'block'
  };

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if (this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};

Sim.prototype.elemNext = function (num) {
  num = num || 1;

  let prevElement = this.currentElement;
  this.currentElement += num;
  if (this.currentElement >= this.elemCount) this.currentElement = 0;

  if (!this.options.loop) {
    if (this.currentElement == this.elemCount - 1) {
      this.rightArrow.style.display = 'none'
    };
    this.leftArrow.style.display = 'block'
  };

  this.sldrElements[this.currentElement].style.opacity = '1';
  this.sldrElements[prevElement].style.opacity = '0';

  if (this.options.dots) {
    this.dotOn(prevElement); this.dotOff(this.currentElement)
  }
};

Sim.prototype.dotOn = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function (num) {
  this.indicatorDotsAll[num].style.cssText =
    'background-color:#556; cursor:default;'
};

Sim.initialize = function (that) {

  // Constants
  that.elemCount = that.sldrElements.length; // Количество элементов

  // Variables
  that.currentElement = 0;
  let bgTime = getTime();

  // Functions
  function getTime() {
    return new Date().getTime();
  };
  function setAutoScroll() {
    that.autoScroll = setInterval(function () {
      let fnTime = getTime();
      if (fnTime - bgTime + 10 > that.options.interval) {
        bgTime = fnTime; that.elemNext()
      }
    }, that.options.interval)
  };

  // Start initialization
  if (that.elemCount <= 1) {   // Отключить навигацию
    that.options.auto = false;
    that.options.arrows = false; that.options.dots = false;
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
  };
  if (that.elemCount >= 1) {   // показать первый элемент
    that.sldrElemFirst.style.opacity = '1';
  };

  if (!that.options.loop) {
    that.leftArrow.style.display = 'none';  // отключить левую стрелку
    that.options.auto = false; // отключить автопркрутку
  }
  else if (that.options.auto) {   // инициализация автопрокруки
    setAutoScroll();
    // Остановка прокрутки при наведении мыши на элемент
    that.sldrList.addEventListener('mouseenter', function () {
      clearInterval(that.autoScroll)
    }, false);
    that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
  };

  if (that.options.arrows) {  // инициализация стрелок
    that.leftArrow.addEventListener('click', function () {
      let fnTime = getTime();
      if (fnTime - bgTime > 1000) {
        bgTime = fnTime; that.elemPrev()
      }
    }, false);
    that.rightArrow.addEventListener('click', function () {
      let fnTime = getTime();
      if (fnTime - bgTime > 1000) {
        bgTime = fnTime; that.elemNext()
      }
    }, false)
  }
  else {
    that.leftArrow.style.display = 'none';
    that.rightArrow.style.display = 'none'
  };

  if (that.options.dots) {  // инициализация индикаторных точек
    let sum = '', diffNum;
    for (let i = 0; i < that.elemCount; i++) {
      sum += '<span class="sim-dot"></span>'
    };
    that.indicatorDots.innerHTML = sum;
    that.indicatorDotsAll =
      that.sldrRoot.querySelectorAll('span.sim-dot');
    // Назначаем точкам обработчик события 'click'
    for (let n = 0; n < that.elemCount; n++) {
      that.indicatorDotsAll[n].addEventListener('click', function () {
        diffNum = Math.abs(n - that.currentElement);
        if (n < that.currentElement) {
          bgTime = getTime(); that.elemPrev(diffNum)
        }
        else if (n > that.currentElement) {
          bgTime = getTime(); that.elemNext(diffNum)
        }
        // Если n == that.currentElement ничего не делаем
      }, false)
    };
    that.dotOff(0);  // точка[0] выключена, остальные включены
    for (let i = 1; i < that.elemCount; i++) {
      that.dotOn(i)
    }
  }
};

new Sim();

document.addEventListener('DOMContentLoaded', function () {
  // конечная дата
  const deadline = new Date(Date.now() + 1800999);
  // id таймера
  let timerId = null;
  // склонение числительных
  function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }
  // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
  function countdownTimer() {
    const diff = deadline - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
    $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
    $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
  }
  // получаем элементы, содержащие компоненты даты
  const $minutes = document.querySelector('.timer__minutes');
  const $seconds = document.querySelector('.timer__seconds');
  // вызываем функцию countdownTimer
  countdownTimer();
  // вызываем функцию countdownTimer каждую секунду
  timerId = setInterval(countdownTimer, 1000);
});

document.querySelector('.footer__form-input--tel').addEventListener('input',
  function (e) {
    this.value = this.value.replace(/[^\d.]/g, '');
  }
);

$(".btn").on("click", function (event) {

  event.preventDefault();

  var id = $(this).attr('href'),

    top = $(id).offset().top;

  $('body,html').animate({ scrollTop: top }, 1500);
});