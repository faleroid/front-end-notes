export const footerColor = (color) => { 
    const myFooter = document.querySelector('my-footer');
    if (myFooter) {
      myFooter.setAttribute('footer-color', `${color}`);
    }
}