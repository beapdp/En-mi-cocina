import React, { useState, useEffect } from 'react';
import '../styles/shoppingList.css';

export const ShoppingList = () => {
    const initialShoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    const [shoppingList, setShoppingList] = useState(initialShoppingList);
    const [item, setItem] = useState("");

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }, [shoppingList]);

    const addToList = () => {
        if (item !== "") {
            setShoppingList([...shoppingList, { id: new Date().getTime(), name: item }]);
            setItem("");
        }
    };

    const removeFromList = id => {
        const newShoppingList = shoppingList.filter(item => item.id !== id);
        setShoppingList(newShoppingList);
    }

    return (
        <div className="shopping-list-container">
            <h2>Necesito comprar...</h2>
            <input 
                type='text'
                value={item}
                onChange={e => setItem(e.target.value)}
            />
            <button onClick={addToList}>Agregar</button>
            <ul>
                {shoppingList.map(item => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <input 
                            type="checkbox" 
                            onChange={() => removeFromList(item.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
