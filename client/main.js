import './sass/main.sass';

const toggleNav = (domElement, className) => {
  let lastScrollTop = 0;
  return () => {
    const delta = 5;
    const btnHeight = domElement.offsetHeight;
    const st = global.document.body.scrollTop;

    if (Math.abs(lastScrollTop - st) <= delta) { return; }

    if (st > lastScrollTop && st > btnHeight) {
      domElement.classList.add(className);
    } else if (st + global.window.innerHeight < global.document.body.offsetHeight) {
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
scrollListener(toggleNav(btn, 'nav__down'))(250);

if (module.hot) {
  module.hot.accept();
}
