
import './App.css';
import { BrowserRouter, Route, } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Login } from './Login';
import { AddProduct } from './AddProduct';
import { Register } from './Register';
import { UpdateProduct } from './UpdateProduct';
import { Protected } from './Protected';
import { ProdductsList } from './ProdductsList';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected Cmp={ProdductsList} />} />
          <Route path="/add" element={<Protected Cmp={AddProduct} />} />
          <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
