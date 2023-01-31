
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState } from 'react';


function App() {
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = useState(false);
  const [isAddPlacePopupOpened, setIsAddPlacePopupOpened] = useState(false);
  const [isImagePopupOpened, setIsImagePopupOpened] = useState(false);

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
        isEditAvatarPopupOpened={isEditAvatarPopupOpened}
        isEditProfilePopupOpened={isEditProfilePopupOpened}
        isAddPlacePopupOpened={isAddPlacePopupOpened}
        isImagePopupOpened={isImagePopupOpened}
        setIsImagePopupOpened={setIsImagePopupOpened}
        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
