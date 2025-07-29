export function showPopup(message, type) {
  const popupComponent = document.querySelector('pop-up');
  const popup = popupComponent.shadowRoot.querySelector('#popup');

  popup.textContent = message;

  popup.classList.remove("error", "success");
  popup.classList.add(type);
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000);
}
