import './sass/main.sass';

// const getElement = domElement => document.querySelector(domElement);
//
// const toggleClass = (domElement, className) => () => {
//   getElement(domElement).classList.toggle(className);
// };
//
// const attachListener = (eventType, elementToListen, callback) => {
//   getElement(elementToListen).addEventListener(eventType, () => callback());
// };
//
// attachListener('click', 'button', toggleClass('body', 'bg'));

if (module.hot) {
  module.hot.accept();
}
