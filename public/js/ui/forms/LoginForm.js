/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response && !response.success) {
        console.log(response.error);
      }
      if (response.success) {
        const modal = App.getModal('login');
        modal.element.querySelector('.form').reset();
        App.setState('user-logged');
        modal.close();
      };
    })
  }
}