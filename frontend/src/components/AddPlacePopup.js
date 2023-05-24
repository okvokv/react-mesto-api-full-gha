import { useEffect } from 'react';
import useFormValidation from '../hooks/FormValidator.js';
import PopupWithForm from './PopupWithForm.js';

//гибридный элемент - всплывающее окно добавления контента
function CardAddPopup(props) {

	// объявление данных в глобальной области
	const { valid, values, errorSpans, handleChangeValue, resetForm } = useFormValidation({ cardName: '', cardLink: '' }, false, {});

	const { cardName, cardLink } = values;
	const {cardNameError, cardLinkError} = errorSpans;


	//промежуточная функция отправки данных карточки
	function handleSubmit(event) {
		event.preventDefault();
		props.onChangeBtnText('Сохранение...');
		props.onSubmit(cardName, cardLink);
	};

	// функция очистки формы после успешной отправки данных
	useEffect(() => {
		resetForm();
	}, [props.reset])
	
	return (
		<PopupWithForm
			type={'card'}
			formTitle='Новое место'
			btnText={props.btnText}
			btnDisabled={!valid}
			opened={props.opened}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			{/* == ядро с формой добавления контента ===============================*/}
			<input
				className={`form__field form__field_type_cardname ${cardNameError && 'form__field_type_error'}`}
				type="text"
				placeholder="Название"
				name="cardName"
				minLength="2"
				maxLength="30"
				value={cardName}
				onChange={handleChangeValue}
				autoFocus
				required
			/>
			<span className="form__error-message" id="cardName-error">{cardNameError}</span>
			<input
				className={`form__field form__field_type_cardlink ${cardLinkError && 'form__field_type_error'}`}
				type="url"
				placeholder="Ссылка на картинку"
				name="cardLink"
				value={cardLink}
				onChange={handleChangeValue}
				required
			/>
			<span className="form__error-message" id="cardLink-error">{cardLinkError}</span>
		</PopupWithForm>
	);
};

export default CardAddPopup;