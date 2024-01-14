import './App.css';
import { Menu } from './components/Menu';
import { Recipes } from './components/Recipes';
import { ShoppingList } from './components/ShoppingList';

function App() {
  return (
    <>
      <h1>En mi cocina</h1>
      <div className="main-container">  
        <div className='listAndRecipes-container'>
          <Recipes/>
          <ShoppingList/>
        </div>
        <aside className='aside-container'>
          <Menu/>
        </aside>
      </div>
    </>
  );
}

export default App;
