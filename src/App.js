// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';

function App() {
  return (
    <>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}


        <Header />
        <Routes>
          <Route path='*' element={<h1>404</h1>} />
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<RegisterUser />}></Route>
          <Route path='/login' element={<LoginUser />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
