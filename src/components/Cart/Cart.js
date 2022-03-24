import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import './cart.scss';
import {deleteCart, addOrder, resetCart} from "../../redux/reducers/items";
import {useNavigate, Link} from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(s => s.items.cart);
    const dispatch = useDispatch();
    return (
        <section className={'cart'}>
            <div className="container">
                {
                    cart.length === 0 ? <h2>Корзина пуста (</h2>
                        : <>
                            {
                                cart.map((item) =>{
                                    return  <div key={item.offerId} className="cart__item">
                                        <h4>{item.displayName}</h4>
                                        <div className="cart__item-right">
                                            <button onClick={() =>{
                                                dispatch(deleteCart(item))
                                            }}>удалить</button>
                                            <p>
                                                <b>количество:</b>
                                                {item.count}
                                            </p>
                                            |
                                            <p>
                                                <b>сумма:</b>
                                                {item.price.finalPrice * item.count} руб.
                                            </p>
                                        </div>
                                    </div>
                                })
                            }
                            <p><b>Общая сумма: </b>{
                                cart.reduce((acc, rec) => {
                                    return acc + (rec.count * rec.price.finalPrice)
                                },0)
                            } руб.</p>
                            {
                                cart.length === 0 ? '' :<Link to={'/order'} onClick={()=>{
                                    dispatch(addOrder(cart));
                                    dispatch(resetCart());

                                } }>Заказать</Link>
                            }
                        </>
                }

            </div>
        </section>
    );
};

export default Cart;