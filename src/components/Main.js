import pen from '../images/pen.png';
import { api } from '../utils/Api';
import { useContext, } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DataCardsContext } from '../contexts/DataCardsContext';
import Card from './Card';

function Main(
  {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    isImagePopupOpened,
    setIsImagePopupOpened,
    setSelectedCard,
    handleCardLike,
    handleCardDelete
  }
) {
  const currentUser = useContext(CurrentUserContext);
  const cards = useContext(DataCardsContext);

  const generatedCards = cards.map((card) => (
    <li className="element" key={card._id}>
      <Card
        card={card}
        onCardClick={setSelectedCard}
        isImagePopupOpened={isImagePopupOpened}
        setIsImagePopupOpened={setIsImagePopupOpened}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    </li>
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar">
            <img className="profile__photo-cover" src={pen} alt="Редактировать" />
            <img
              onClick={onEditAvatar}
              className="profile__photo"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit link"
                type="button"
                aria-label="Редактировать профиль">
              </button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="link profile__add-button"
          type="button"
          aria-label="Добавить интересное место">
        </button>
      </section>
      <section className="elements" aria-label="Места">
        <ul className="elements__list">
          {generatedCards}
        </ul>
      </section>
    </main>
  )
}

export default Main;