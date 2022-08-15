/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const currentUser = User.current();
    
    if (currentUser) {
      Account.list(JSON.parse(currentUser), (err, response) => {
        if (err) {
          console.log(err);
        }
        if (response.success) {
          const currentList = this.form.querySelector(`.accounts-select`);
          currentList.innerHTML = '';

          const accountList = response.data;
          accountList.forEach((item) => {
            currentList.innerHTML += `<option value="${item.id}">${item.name}</option>`
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.form.reset();

        if (this.form.id === 'new-expense-form') {
          App.getModal('newExpense').close();
        } else if (this.form.id === 'new-income-form') {
          App.getModal('newIncome').close();
        }
        
        App.update();
      }
    })
  }
}