import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useFormValidation from '../hooks/FormValidator.js';
import PopupWithForm from './PopupWithForm.js';

//гибридный элемент - всплывающее окно редактирования профиля
function ProfileEditPopup(props) {

	//подписка на контекст
	const currentUserData = React.useContext(CurrentUserContext);

	// объявление данных в глобальной области
	const { valid, values, errorSpans, handleChangeValue } = useFormValidation({name: currentUserData.name, description: currentUserData.about}, false, {});

	const {name, description} = values;
	const {nameError, descriptionError} = errorSpans;

	//------------------------------------------------------------------------
	//промежуточная функция отправки содержания
	function handleSubmit(event) {
		event.preventDefault();
		props.onChangeBtnText('Сохранение...');
		props.onSubmit(name, description);
	};

	//----------------------------------------------------------------------
	return (
		<PopupWithForm
			type='profile'
			formTitle='Редактировать профиль'
			btnText={props.btnText}
			btnDisabled={!valid}
			opened={props.opened}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			{/* == ядро с формой редактирования профиля ====================*/}
			<input
				className={`form__field form__field_type_name ${nameError &&'form__field_type_error'}`}
				type="text"
				placeholder="Имя"
				name="name"
				minLength="2"
				maxLength="50"
				value={name}
				onChange={handleChangeValue}
				autoFocus
				required
			/>

			<span className="form__error-message" id="name-error">{nameError}</span>

			<input
				className={`{form__field form__field_type_description ${descriptionError &&'form__field_type_error'}`}
				type="text"
				placeholder="О себе"
				name="description"
				minLength="2"
				maxLength="200"
				value={description}
				onChange={handleChangeValue}
				required
			/>

			<span className="form__error-message" id="description-error">{descriptionError}</span>
		</PopupWithForm>
	);
};

export default ProfileEditPopup;