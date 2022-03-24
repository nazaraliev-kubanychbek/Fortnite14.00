import React from 'react';
import {useSelector} from "react-redux";
import './order.scss';


const Order = () => {
    const order = useSelector(s => s.items.order);
    return (
        <section className={'order'}>
            {
                order.length === 0 ? <h2 className={'order__empty'}>Здесь будут ваши заказы</h2>:
                order.map((item)=>{
                    return(
                        <div className={'order__item'} key={item.orderNumber}>
                            <h2>{item.orderNumber}</h2>
                          <div className="order__item-list">
                              {
                                  item.order.map((item)=>{
                                      return (
                                          <p key={item.offerId}><b>{item.displayName}</b> | <b>количество:</b> {item.count} | <b>сумма:</b> {item.price.finalPrice * item.count} руб.</p>
                                      )
                                  })
                              }
                          </div>
                            <p><b>Сумма заказа:</b> {item.order.reduce((acc, rec)=>{
                               return acc + (rec.price.finalPrice * rec.count)
                            },0)} руб.</p>

                        </div>
                    )
                })
            }
        </section>
    );
};

export default Order;