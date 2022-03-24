import React from 'react';
import {Link} from "react-router-dom";
import './header.scss'

const Header = () => {
    return (
        <header className={'header'}>
           <Link to={'/'}>
             Home
           </Link>
            <div className={'header__right'}>
                <Link to={'/order'}>
                    Order
                </Link>
                <Link to={'/cart'}>
                    Cart
                </Link>
            </div>

        </header>
    );
};

export default Header;