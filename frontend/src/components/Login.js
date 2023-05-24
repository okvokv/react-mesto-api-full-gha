import FieldSet from './FieldSet.js';

//гибридный элемент - страница входа
function Login(props) {

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

  //------------------------------------------------------------------------

  //промежуточная функция отправки данных
  function handleSubmit(event) {
    event.preventDefault();
    props.onChangeBtnText('Вход...');
    props.onSubmit(props.email, props.pwd);
  };

  return (
    //секция с формой входа ===============================================
    <section className="login">
      <form className="form form__theme-dark" name="loginForm" onSubmit={handleSubmit} noValidate>
        <h2 className="form__title form__title_theme-dark">Вход</h2>

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

      </form>
    </section>
  );

};

export default Login;