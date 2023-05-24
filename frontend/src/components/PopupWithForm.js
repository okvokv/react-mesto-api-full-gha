import Popup from './Popup.js';
//гибридный элемент - всплывающее окно с общей частью форм ==================
function PopupWithForm(props) {
	return (
		<Popup
			opened={props.opened}
			type={props.type}
			onClose={props.onClose}
		>
			<form
				className={`form form_type_${props.type}`}
				name={`${props.type}Form`}
				onSubmit={props.onSubmit}
				noValidate
			>
				<h2 className="form__title">{props.formTitle}</h2>

				{/* сюда поступает ядро попапов с формой */}
				{props.children}

				<button
					className= {`form__submit-button ${props.btnDisabled && 'form__submit-button_disabled'}`}
					type="submit"
					aria-label="кнопка cохранения"
					disabled={props.btnDisabled}
				>{props.btnText}</button>

			</form>
		</Popup>
	);
};

export default PopupWithForm; 