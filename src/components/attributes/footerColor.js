export const footerColor = (color) => {
  const footerElement = document.querySelector('my-footer');

  if (footerElement) {
    footerElement.setAttribute('footer-color', color);
  }
};
