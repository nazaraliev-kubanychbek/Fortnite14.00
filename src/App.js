import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Order from "./components/Order/Order";
import Cart from "./components/Cart/Cart";
import {Provider} from "react-redux";
import store from "./redux";
import './style.scss'
import Product from "./components/Product/Product";


function App() {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/cart'} element={<Cart/>}/>
                        <Route path={'/order'} element={<Order/>}/>
                        <Route path={'/product/:id'} element={<Product/>}/>

                    </Routes>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
