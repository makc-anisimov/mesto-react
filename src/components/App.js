
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { DataCardsContext } from '../contexts/DataCardsContext';
import EditProfilePopup from './EditProfilePopup';



function App() {
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getInitialCards()
    ])
      .then(([profile, initialCards]) => {
        setCurrentUser(profile);
        setCards(initialCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);


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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleCardDelete(card) {
    const updatedCards = cards.filter(cardItem => cardItem.id != card._id);
    api.deleteCard(card._id)
      .then(() => {
        console.log('updatedCards', updatedCards);// ТЕСТ!!! проверка нового массива
        setCards(updatedCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(userInfo) {
    api.edtiProfile(userInfo.name, userInfo.about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }


  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      <DataCardsContext.Provider value={[cards, setCards]}>
        <div className="App">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            isImagePopupOpened={isImagePopupOpened}
            setIsImagePopupOpened={setIsImagePopupOpened}
            setSelectedCard={setSelectedCard}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
          />
          <Footer />
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

          <EditProfilePopup
            isOpen={isEditProfilePopupOpened}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

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
          <ImagePopup
            isOpen={isImagePopupOpened}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </DataCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
