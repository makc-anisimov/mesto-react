function ImagePopup({
  card,
  onClose
}) {
  return (
    <div className="popup popup_wiew-photo popup_opened">
      <div className="popup__container-photo">
        <button onClick={onClose} className="popup__close-button link" type="button" aria-label="закрыть форму"></button>
        <img className="popup__photo-opened" src={card.link} alt="" />
        <h2 className="popup__photo-title">{card.name}</h2>
      </div>
    </div >
  )
}

export default ImagePopup;
