import React, {useEffect} from 'react';
import './product.scss';
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {addCart, getProduct} from "../../redux/reducers/items";
import spiner from "../../img/spiner.svg";

const Product = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const product = useSelector(s => s.items.product);
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1)
    };



    useEffect(()=>{
        dispatch(getProduct(params.id));
        console.log('Hello')
    }, []);
    return (
        <section className={'product'}>
            {
                JSON.stringify(product) === '{}' ? <img className={'spiner'} src={spiner} alt=""/>
                    :<div className="container">
                        <div className="product-content">
                            <img className='product__img' src={product.displayAssets[0].url} />
                            <div className={'product__right'}>
                                <h2 className='product__right-title'>{product.displayName} </h2>
                                <p className='product__right-description'>{product.displayDescription.length === 0 ? 'no description': product.displayDescription}</p>
                                <p>Дата выхода: {product.firstReleaseDate}</p>
                                <p>Последнее обновление: {product.previousReleaseDate}</p>
                                <p>Цена: {product.price.finalPrice} руб.</p>
                                <button onClick={()=>{
                                    dispatch(addCart(product))
                                } } className='product__right-button'>Добавить в корзину</button>
                                <button onClick={() => goBack()} className={'product__right-button'}>Назад</button>
                            </div>
                        </div>
                    </div>
            }

        </section>


    );
};

export default Product;