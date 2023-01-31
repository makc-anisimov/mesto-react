import pen from '../images/pen.png';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card';
import ImagePopup from './ImagePopup';

function Main(
  {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onClose,
    isEditAvatarPopupOpened,
    isEditProfilePopupOpened,
    isAddPlacePopupOpened,
    isImagePopupOpened,
    setIsImagePopupOpened,
  }
) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});


  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getInitialCards()
    ])
      .then(([profile, initialCards]) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
        setCards(initialCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__person">
          <div className="profile__avatar">
            <img className="profile__photo-cover" src={pen} alt="Редактировать" />
            <img onClick={onEditAvatar} className="profile__photo" src={userAvatar} alt="Фото профиля" />
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button onClick={onEditProfile} className="profile__edit link" type="button" aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} className="link profile__add-button" type="button" aria-label="Добавить интересное место"></button>
      </section>
      <section className="elements" aria-label="Места">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={setSelectedCard}
              isImagePopupOpened={isImagePopupOpened}
              setIsImagePopupOpened={setIsImagePopupOpened}
            />
          ))}
        </ul>
      </section>

      {
        isEditAvatarPopupOpened && (
          <PopupWithForm
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={true}
            name="update-avatar"
            children={
              <>
                <input className="popup__input-form" type="url" id="inputAvatarLink" name="AvatarLink" placeholder="Ссылка на картинку" required />
                <span id="inputAvatarLink-error" className="popup__error popup__error_visible"></span>
              </>
            }
            onClose={onClose}
          />
        )
      }

      {
        isEditProfilePopupOpened && (
          <PopupWithForm
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={true}
            onClose={onClose}
            name="profile-edit"
            children={
              <>
                <input className="popup__input-form" id="inputName" name="profileName" minLength="2" maxLength="40" placeholder="Имя" required />
                <span id="inputName-error" className="popup__error popup__error_visible" />
                <input className="popup__input-form" id="inputJob" name="profileJob" minLength="2" maxLength="200" placeholder="О себе" required />
                <span id="inputJob-error" className="popup__error popup__error_visible" />
              </>
            }
          />
        )
      }

      {
        isAddPlacePopupOpened && (
          <PopupWithForm
            title="Новое место"
            buttonText="Создать"
            onClose={onClose}
            isOpen={true}
            name="add-photo"
            children={
              <>
                <input className="popup__input-form" id="inputMestoName" name="mestoName" minLength="2" maxLength="30" placeholder="Название" required />
                <span id="inputMestoName-error" className="popup__error popup__error_visible" />
                <input className="popup__input-form" type="url" id="inputMestoLink" name="mestoLink" placeholder="Ссылка на картинку" required />
                <span id="inputMestoLink-error" className="popup__error popup__error_visible" />
              </>
            }
          />
        )
      }
      {
        isImagePopupOpened && (
          <ImagePopup
            card={selectedCard}
            onClose={onClose}
          />
        )
      }
    </main>
  )
}

export default Main;