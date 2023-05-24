import FieldSet from './FieldSet.js';

//гибридный элемент - страница регистрации
function Register(props) {

  function handleEmailChange(email) {
    props.onEmailChange(email);
  }

  function handlePwdChange(pwd) {
    props.onPwdChange(pwd);
  }

  function handleValidChange(valid) {
    props.onValidChange(valid)
  }

  function handleErrorSpansChange(errorSpans) {
    props.onErrorSpansChange(errorSpans)
  }

  //промежуточная функция отправки данных
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(props.email, props.pwd);
  };

  //промежуточная функция переключения страницы
  function handleClick() {
    props.onTogglePage()
  };

  return (
    //секция с формой регистрации ======================================== 
    <section className="registration" >
      <form className="form form__theme-dark" name="regForm" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title form__title_theme-dark">Регистрация</h2>

        {/* сюда поступает форма */}
        <FieldSet
          btnText={props.btnText}
          email={props.email}
          pwd={props.pwd}
          valid={props.valid}
          errorSpans={props.errorSpans}
          onEmailChange={handleEmailChange}
          onPwdChange={handlePwdChange}
          onValidChange={handleValidChange}
          onErrorSpansChange={handleErrorSpansChange}
        />

        <div className="form__reg-caption">
          <p>Уже зарегистированы ?</p>
          <p className="form__reg-link" onClick={handleClick}>&nbsp; Войти</p>
        </div>
      </form>
    </section>
  );

};

export default Register;