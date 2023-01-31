
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpened(true);
  };


  function closeAllPopups() {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddPlacePopupOpened(false);
    setIsImagePopupOpened(false);
  }

  return (
    <div className="App">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        isImagePopupOpened={isImagePopupOpened}
        setIsImagePopupOpened={setIsImagePopupOpened}
        setSelectedCard={setSelectedCard}
      />
      <Footer />
      {
        <PopupWithForm
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpened}
          name="update-avatar"
          children={
            <>
              <input className="popup__input-form" type="url" id="inputAvatarLink" name="AvatarLink" placeholder="Ссылка на картинку" required />
              <span id="inputAvatarLink-error" className="popup__error popup__error_visible"></span>
            </>
          }
          onClose={closeAllPopups}
        />
      }

      {
        <PopupWithForm
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpened}
          onClose={closeAllPopups}
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
      }

      {
        <PopupWithForm
          title="Новое место"
          buttonText="Создать"
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpened}
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

      }
      {
        <ImagePopup
          isOpen={isImagePopupOpened}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      }
    </div>
  );
}

export default App;
