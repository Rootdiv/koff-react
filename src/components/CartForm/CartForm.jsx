import { useDispatch, useSelector } from 'react-redux';
import style from './CartForm.module.scss';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitCartForm } from '@/store/formCart/formCartSlice';
import { changeDeliveryPrice } from '@/store/cart/cartSlice';

export const CartForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const orderStatus = useSelector(state => state.formCart);

  const deliveryType = watch('deliveryType');

  useEffect(() => {
    if (deliveryType === 'pickup') {
      setValue('address', '');
      dispatch(changeDeliveryPrice(0));
    } else if (deliveryType === 'delivery') {
      dispatch(changeDeliveryPrice(500));
    }
  }, [deliveryType, dispatch, setValue]);

  useEffect(() => {
    if (orderStatus.success) {
      navigate(`/order/${orderStatus.orderId}`);
    }
  }, [navigate, orderStatus]);

  const onSubmit = data => {
    dispatch(submitCartForm(data));
  };

  return (
    <form method="POST" className={style.form} id="orderForm" onSubmit={handleSubmit(onSubmit)}>
      <h3 className={style.subtitle}>Данные для доставки</h3>
      <fieldset className={style.fieldsetInput}>
        <label>
          <input type="text" placeholder="Фамилия" className={style.input} {...register('name', { required: true })} />
          {errors.name && <p className={style.error}>Это поле обязательное</p>}
        </label>
        <label>
          <input type="tel" placeholder="Телефон" className={style.input} {...register('phone', { required: true })} />
          {errors.phone && <p className={style.error}>Это поле обязательное</p>}
        </label>
        <label>
          <input type="email" placeholder="E-mail" className={style.input} {...register('email', { required: true })} />
          {errors.email && <p className={style.error}>Это поле обязательное</p>}
        </label>
        <label>
          <input
            type="text"
            placeholder="Адрес доставки"
            className={style.input}
            {...register('address', { required: deliveryType === 'delivery' })}
            disabled={deliveryType === 'pickup'}
          />
          {errors.address && <p className={style.error}>Это поле обязательное</p>}
        </label>
        <textarea placeholder="Комментарий к заказу" className={style.textarea} {...register('comments')}></textarea>
      </fieldset>
      <fieldset className={style.fieldsetRadio}>
        <legend className={style.legend}>Доставка</legend>
        <label className={style.radio}>
          <input
            type="radio"
            value="delivery"
            className={style.radioInput}
            {...register('deliveryType', { required: true })}
          />
          Доставка
        </label>
        <label className={style.radio}>
          <input
            type="radio"
            value="pickup"
            className={style.radioInput}
            {...register('deliveryType', { required: true })}
          />
          Самовывоз
        </label>
        {errors.deliveryType && <p className={style.error}>Выберите тип доставки</p>}
      </fieldset>
      <fieldset className={style.fieldsetRadio}>
        <legend className={style.legend}>Оплата</legend>
        <label className={style.radio}>
          <input
            type="radio"
            value="card"
            className={style.radioInput}
            {...register('paymentType', { required: true })}
          />
          Картой при получении
        </label>
        <label className={style.radio}>
          <input
            type="radio"
            value="cash"
            className={style.radioInput}
            {...register('paymentType', { required: true })}
          />
          Наличными при получении
        </label>
        {errors.paymentType && <p className={style.error}>Выберите тип оплаты</p>}
      </fieldset>
    </form>
  );
};
