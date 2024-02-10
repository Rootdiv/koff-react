import style from './CartForm.module.scss';

export const CartForm = () => (
  <form method="POST" className={style.form}>
    <h3 className={style.subtitle}>Данные для доставки</h3>
    <fieldset className={style.fieldsetInput}>
      <input name="name" type="text" placeholder="Фамилия" className={style.input} required />
      <input name="phone" type="tel" placeholder="Телефон" className={style.input} required />
      <input name="email" type="email" placeholder="E-mail" className={style.input} required />
      <input name="address" type="text" placeholder="Адрес доставки" className={style.input} />
      <textarea name="comments" placeholder="Комментарий к заказу" className={style.textarea}></textarea>
    </fieldset>
    <fieldset className={style.fieldsetRadio}>
      <legend className={style.legend}>Доставка</legend>
      <label className={style.radio}>
        <input type="radio" name="deliveryType" value="delivery" className={style.radioInput} required />
        Доставка
      </label>
      <label className={style.radio}>
        <input type="radio" name="deliveryType" value="pickup" className={style.radioInput} required />
        Самовывоз
      </label>
    </fieldset>
    <fieldset className={style.fieldsetRadio}>
      <legend className={style.legend}>Оплата</legend>
      <label className={style.radio}>
        <input type="radio" name="paymentType" value="card" className={style.radioInput} required />
        Картой при получении
      </label>
      <label className={style.radio}>
        <input type="radio" name="paymentType" value="cash" className={style.radioInput} required />
        Наличными при получении
      </label>
    </fieldset>
  </form>
);
