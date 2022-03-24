import React, {useEffect} from 'react';
import {getItems, addCart, getProduct} from "../../redux/reducers/items";
import {useDispatch, useSelector} from "react-redux";
import './home.scss';
import {Link} from "react-router-dom";
import spiner from '../../img/spiner.svg';
const Home = () => {
const dispatch = useDispatch();
const items = useSelector((s)=> s.items.items);


    useEffect(()=>{
       dispatch(getItems())
    }, []);
    return (
        <section className='home'>
            {
                items.length === 0 ? <img className={'spiner'} src={spiner} alt=""/>
                : <div className={'container'}>
                        <div className='row'>
                            {
                                items.map((item, idx)=>{
                                    return <div key={item.offerId} className='col-4'>
                                        <div className='home__card'>
                                            <img className='home__card-img' src={item.displayAssets[0].url} />
                                            <h2 className='home__card-title'><Link to={`product/${idx}`}>{item.displayName.length > 19 ?  item.displayName.substr(0, 17) +'...':item.displayName}</Link> </h2>
                                            <p className='home__card-description'>{item.displayDescription.length === 0 ? 'no description': item.displayDescription.length > 40 ?  item.displayDescription.substr(0, 37) +'...':item.displayDescription}</p>
                                            <p>Дата выхода: {item.firstReleaseDate}</p>
                                            <p>Последнее обновление: {item.previousReleaseDate}</p>
                                            <p>Цена: {item.price.finalPrice} руб.</p>
                                            <button onClick={()=>{
                                                dispatch(addCart(item))
                                            } } className='home__card-button'>Добавить в корзину</button>                            </div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
            }



        </section>
    );
};

export default Home;