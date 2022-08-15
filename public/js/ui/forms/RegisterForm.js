/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response && !response.success) {
        console.log(response.error);
      }
      if (response.success) {
        const modal = App.getModal('register');
        modal.element.querySelector('.form').reset();
        App.setState('user-logged');
        modal.close();
        alert(`Пользователь ${data.name} успешно зарегистрирован`)
      };
    })
  }
}