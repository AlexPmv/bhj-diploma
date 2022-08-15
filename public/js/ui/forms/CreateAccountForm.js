/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response && !response.success) {
        console.log(response.error);
      }
      const modal = App.getModal('createAccount');
      modal.element.querySelector('.form').reset();
      App.update();
      modal.close();
    })
  }
}