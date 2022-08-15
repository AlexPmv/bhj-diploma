/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Ошибка конструктора класса AsyncForm, пустое значение "element"');
    };
    this.form = element;
    this.data = {};
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    
    this.form.closest('.modal').querySelector('.btn-primary').onclick = (e) => {
      e.preventDefault();
      this.submit();
    };
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    if (this.form.id === 'new-income-form' || this.form.id === 'new-expense-form') {
      let currentId = this.form.id;
      this.data.type = currentId.slice(4, currentId.indexOf('-', 5));
    }
    Array.from(this.form.querySelectorAll('.form-control')).forEach((item) => {
      this.data[item.name] = item.value;
    });
  }

  onSubmit(options){
    
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    this.getData()
    this.onSubmit(this.data);
  }
}