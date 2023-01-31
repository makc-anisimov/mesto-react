
function PopupWithForm(
    { title,
        children,
        buttonText,
        isOpen,
        name,
        onClose
    }
) {
    return ({ isOpen } && (
        <div className={`popup popup_opened popup_type_${name}`} >
            <div className="popup__container">
                <button onClick={onClose} className="popup__close-button link" type="button" aria-label="закрыть форму" />
                <form className="popup__form" id="" name="" method="post">
                    <h2 className="popup__form-title">{title}</h2>
                    {children}
                    <button className="popup__save-button" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
    );

}

export default PopupWithForm;
