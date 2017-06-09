import './sass/main.sass';
import './assets/icons/delete.svg';
import './assets/icons/edit.svg';
import './assets/icons/logout.svg';
import './assets/icons/new.svg';

const toggleHidden = (domElement, className) => {
  let lastScrollTop = 0;
  return () => {
    const delta = 5;
    const btnHeight = domElement.offsetHeight;
    const st = global.document.body.scrollTop;
    const viewportHeight = global.window.innerHeight;
    const documentHeight = global.document.body.offsetHeight;

    if (Math.abs(lastScrollTop - st) <= delta) { return; }

    if (st > lastScrollTop && st > btnHeight) {
      domElement.classList.add(className);
    } else if (st + viewportHeight < documentHeight) {
      domElement.classList.remove(className);
    }

    lastScrollTop = st;
  };
};

const scrollListener = (callback) => {
  let didScroll = false;
  return (ms) => {
    global.window.addEventListener('scroll', () => {
      didScroll = true;
    });

    setInterval(() => {
      if (didScroll) {
        callback();
        didScroll = false;
      }
    }, ms);
  };
};

const btn = global.document.querySelector('.go-back');
const header = global.document.querySelector('header');
const btnClass = btn && header ? 'nav__up' : 'nav__down';

if (header) {
  scrollListener(toggleHidden(header, 'nav__down'))(250);
}

if (btn) {
  scrollListener(toggleHidden(btn, btnClass))(250);
}

// if (btn && header) {
//   scrollListener(toggleHidden(btn, 'nav__up'))(250);
// } else if (btn && !header) {
//   scrollListener(toggleHidden(btn, 'nav__down'))(250);
// }

if (module.hot) {
  module.hot.accept();
}
