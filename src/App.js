import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { serviceFactory } from './services/serviceFactory';

import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';
import { Create } from './components/Themes/Create';
import { Edit } from './components/Themes/Edit';
import { Logout } from './components/User/Logout';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeDetails } from './components/Themes/ThemeDetails';
import { RouteGuard } from './components/Guards/RouteGuard';
import { Contacts } from './components/Contacts/Contacts';
import { Participations } from './components/User/Participations';
import { OwnerGuard } from './components/Guards/OwnerGuard';

function App() {
    const topicService = serviceFactory('topic');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAll()
            .then(res => {
                setTopics(res);
            });
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>

                <div className="App">

                    <Header />

                    <div className="main">
                        <Routes>
                            <Route path='*' element={<h1>404</h1>} />
                            <Route path='/' element={<Home topics={topics} />} />
                            <Route path='/register' element={<RegisterUser />} />
                            <Route path='/login' element={<LoginUser />} />
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:themeId' element={<ThemeDetails />} />
                            <Route element={<RouteGuard />}>
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/create' element={<Create />} />
                                <Route path='/edit/:themeId' element={
                                    <OwnerGuard>
                                        <Edit />
                                    </OwnerGuard>} />
                                <Route path='/participations' element={<Participations />} />
                            </Route>
                            <Route path="/contacts" element={<Contacts />} />
                        </Routes>
                    </div>

                    <Footer />

                </div>

            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
