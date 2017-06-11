import './sass/main.sass';
import './assets/icons/delete.svg';
import './assets/icons/edit.svg';
import './assets/icons/logout.svg';
import './assets/icons/new.svg';

const dispatchCustomEvent = (type, name, obj = global.window) => {
  let running = false;
  const func = () => {
    if (running) { return; }
    running = true;
    global.requestAnimationFrame(() => {
      obj.dispatchEvent(new global.CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};

const toggleHidden = (domElement, className) => {
  let lastScrollTop = 0;
  return () => {
    const delta = 5;
    const st = global.document.body.scrollTop;
    const viewportHeight = global.window.innerHeight;
    const documentHeight = global.document.body.offsetHeight;

    if (Math.abs(lastScrollTop - st) <= delta) { return; }

    if (st > lastScrollTop) {
      domElement.classList.add(className);
    } else if (st + viewportHeight < documentHeight) {
      domElement.classList.remove(className);
    }

    lastScrollTop = st;
  };
};

const btn = global.document.querySelector('.go-back');
const header = global.document.querySelector('header');
const btnClass = btn && header ? 'nav__up' : 'nav__down';
const toggleHeader = toggleHidden(header, 'nav__down');
const toggleButton = toggleHidden(btn, btnClass);

const onWindowScroll = () => {
  const condition = global.window.innerWidth < 985;
  if (condition && header) { toggleHeader(); }
  if (condition && btn) { toggleButton(); }
};

const onWindowResize = () => {
  const condition = global.window.innerWidth > 985;
  if (condition && header) {
    header.classList.remove('nav__down');
  }
  if (condition && btn) {
    btn.classList.remove(btnClass);
  }
};

dispatchCustomEvent('scroll', 'optimizedScroll');
dispatchCustomEvent('resize', 'optimizedResize');

global.window.addEventListener('optimizedScroll', () => onWindowScroll());
global.window.addEventListener('optimizedResize', () => onWindowResize());

if (module.hot) {
  module.hot.accept();
}
