// обработка ввода и валидация любой формы 
import { useState } from "react";

export default function useFormValidation(initialData, initialValid, initialErrorSpans) {

  // объявление данных в глобальной области
  const [valid, setValid] = useState(initialValid);
  const [values, setValues] = useState(initialData);
  const [errorSpans, setErrorSpans] = useState(initialErrorSpans);

  // функция изменения значения в поле ввода
  function handleChangeValue(event) {
    const { name, value, validationMessage } = event.target;
    setValues({ ...values, [name]: value });
    setErrorSpans({ ...errorSpans, [`${name}Error`]: validationMessage });
    setValid(event.target.closest('.form').checkValidity());
  }

  // функция очистки формы
  function resetForm () {
    for (const key in values) {
      values[key]='';
    }
    setValid(false);
  };

  return { valid, values, errorSpans, handleChangeValue, resetForm };
}
