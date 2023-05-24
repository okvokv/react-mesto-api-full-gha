// форма административной страницы ============================================
import { useEffect } from 'react';
import useFormValidation from '../hooks/FormValidator.js';

// гибридный элемент - поля административной страницы
function FieldSet(props) {

	// объявление данных в глобальной области
	const { valid, values, errorSpans, handleChangeValue } = useFormValidation({ email: props.email, pwd: props.pwd }, props.valid, props.errorSpans);

	const { email, pwd } = values;
	const {emailError, pwdError} = errorSpans;

	useEffect(() => {
		props.onEmailChange(email);
	}, [props, email])

	useEffect(() => {
		props.onPwdChange(pwd);
	}, [props, pwd])

	useEffect(() => {
		props.onValidChange(valid);
	}, [props, valid])

	useEffect(() => {
		props.onErrorSpansChange(errorSpans);
	}, [props, errorSpans])

	return (
		<>
			<input
				className={`form__field form__field_theme-dark ${emailError && 'form__field_type_error'}`}
				type="email"
				placeholder="Email"
				name="email"
				value={email}
				onChange={handleChangeValue}
				autoFocus
				required
			/>
			<span className="form__error-message" id="email-error">{emailError}</span>

			<input
				className={`form__field form__field_theme-dark ${pwdError && 'form__field_type_error'}`}
				type="password"
				placeholder="Пароль"
				name="pwd"
				minLength="8"
				maxLength="100"
				value={pwd}
				onChange={handleChangeValue}
				required
			/>
			<span className="form__error-message" id="pwd-error">{pwdError}</span>

			<button
				className={`form__submit-button form__submit-button_theme-dark ${!valid && 'form__submit-button_disabled'}`}
				type="submit"
				aria-label="кнопка отправки"
				disabled={!valid}
			>{props.btnText}
			</button>
		</>
	);

};

export default FieldSet;
