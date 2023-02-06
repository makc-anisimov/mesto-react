import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
	isOpen,
	onClose,
	onAddPlace
}) {
	const newPlaceName = useRef();
	const newPlaceLink = useRef();

	function handleSubmit(evt) {
		evt.preventDefault();
		onAddPlace({
			name: newPlaceName.current.value,
			link: newPlaceLink.current.value
		});
		newPlaceName.current.value = "";
		newPlaceLink.current.value = "";
		onClose();
	}
	return (
		<PopupWithForm
			title="Новое место"
			buttonText="Создать"
			onClose={onClose}
			isOpen={isOpen}
			onSubmit={handleSubmit}
			name="add-photo"
			children={
				<>
					<input
						className="popup__input-form"
						id="inputMestoName"
						name="mestoName"
						minLength="2"
						maxLength="30"
						placeholder="Название"
						required
						ref={newPlaceName}
					/>
					<span
						id="inputMestoName-error"
						className="popup__error popup__error_visible"
					/>
					<input
						className="popup__input-form"
						type="url"
						id="inputMestoLink"
						name="mestoLink"
						placeholder="Ссылка на картинку"
						required
						ref={newPlaceLink}
					/>
					<span
						id="inputMestoLink-error"
						className="popup__error popup__error_visible"
					/>
				</>
			}
		/>
	)

}

export default AddPlacePopup;