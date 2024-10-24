import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Single from './pages/Single';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
function App() {
  return (
    < >
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/:id'  element={<Single/>}/>
        <Route path='/gio-hang'  element={<Cart/>}/>
        <Route path='/not-found'  element={<NotFound/>}/>
        <Route path='*'  element={<NotFound/>}/>
    
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
