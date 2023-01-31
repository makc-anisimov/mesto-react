function Card(
    { card,
        onCardClick,
        setIsImagePopupOpened,
    }) {

    function handleCardClick() {
        onCardClick(card);
        setIsImagePopupOpened(true);
    };

    return (
        <li className="element">
            <button className="element__delete-button link" type="button" aria-label="Удалить место"></button>
            <img className="element__photo"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick}
            />
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div>
                    <button className="element__like" type="button" aria-label="Нравится"></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )

}

export default Card;