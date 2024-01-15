import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Recipes } from './components/Recipes';
import { ShoppingList } from './components/ShoppingList';

function App() {
  return (
    <>
      <div className='link-container'>
        <div>
        <Link to="/mis-recetas">Mis recetas</Link>
        <Link to="/lista-de-la-compra">Lista de la compra</Link>
        <Link to="menu-semanal">Menú semanal</Link></div>
      </div>
      <Routes>
        <Route path='/mis-recetas' element={<Recipes/>}/>
        <Route path='/lista-de-la-compra' element={<ShoppingList/>}/>
        <Route path='/menu-semanal' element={<Menu/>}/>
      </Routes>
    </>
 
  );
}

export default App;


<>
{/*<h1>En mi cocina</h1>
<div className="main-container">  
  <div className='listAndRecipes-container'>
    <Recipes/>
    <ShoppingList/>
  </div>
  <aside className='aside-container'>
    <Menu/>
  </aside>
</div>*/}
</>