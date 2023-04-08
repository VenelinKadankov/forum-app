import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';

import { serviceFactory } from './services/serviceFactory';
import { Create } from './components/Themes/Create';
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/User/Logout';

function App() {
    const themeService = serviceFactory('theme');
    const [themes, setThemes] = useState([]);

    const topicService = serviceFactory('topic');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAll()
            .then(res => {
                setTopics(res);
            });
    }, []);

    useEffect(() => {
        themeService.getAll()
            .then(res => {
                setThemes(res)
            });
    }, []);

    // const onLoginSubmit = (e) => {
    //     console.log("SUBMITTED LOGIN");
    // }

    return (
        <AuthProvider>

            <div className="App">
                
                <Header />

                <div className="main">
                    <Routes>
                        <Route path='*' element={<h1>404</h1>} />
                        <Route path='/' element={<Home topics={topics} />}></Route>
                        <Route path='/register' element={<RegisterUser />}></Route>
                        <Route path='/login' element={<LoginUser />}></Route>
                        <Route path='/logout' element={<Logout />}></Route>
                        <Route path='/catalog' element={<Catalog themes={themes} />}></Route>
                        <Route path='/create' element={<Create />}></Route>
                    </Routes>
                </div>

                <Footer />

            </div>

        </AuthProvider>
    );
}

export default App;
