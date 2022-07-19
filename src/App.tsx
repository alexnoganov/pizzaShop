import './scss/app.scss';
import Header from './components/Header/';
import Home from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import Cart from './pages/Cart';
import NotFound from './components/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

function App() {
    return (
        <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<NotFound title="Ничего не найдено"
                                                           text="Данной страницы не существует на этом сайте"/>}/>
                    </Routes>
                </div>
            <ToastContainer position="top-right"/>
        </div>
    );
}

export default App;
