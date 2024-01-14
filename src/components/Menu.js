import React, { useState, useEffect, useCallback } from 'react';
import '../styles/menu.css';
import { IonIcon } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

export const Menu = () => {
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const defaultMeals = {
    'Lunes': { lunch: null, dinner: null },
    'Martes': { lunch: null, dinner: null },
    'Miércoles': { lunch: null, dinner: null },
    'Jueves': { lunch: null, dinner: null },
    'Viernes': { lunch: null, dinner: null },
    'Sábado': { lunch: null, dinner: null },
    'Domingo': { lunch: null, dinner: null },
  };

  // Corregimos la inicialización del estado `meals` para que coincida con la estructura esperada
  const initialMenu = JSON.parse(localStorage.getItem('meals')) || defaultMeals;
  const [meals, setMeals] = useState(initialMenu);

  // El estado para controlar la visibilidad de los inputs
  const [inputVisible, setInputVisible] = useState(() => {
    // Creamos un estado inicial basado en `initialMenu`
    const visibleState = {};
    for (const day of daysOfWeek) {
      visibleState[day] = {
        lunch: !initialMenu[day].lunch,
        dinner: !initialMenu[day].dinner,
      };
    }
    return visibleState;
  });

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = useCallback((day, mealType, meal) => {
    if (meal !== "") {
      setMeals(prevMeals => {
        const updatedMeals = {
          ...prevMeals,
          [day]: { ...prevMeals[day], [mealType]: meal },
        };
        localStorage.setItem('meals', JSON.stringify(updatedMeals));
        return updatedMeals;
      });
      setInputVisible(prevState => ({
        ...prevState,
        [day]: { ...prevState[day], [mealType]: false },
      }));
    }
  }, []);

  const removeMeal = useCallback((day, mealType) => {
    setMeals(prevMeals => {
      const updatedMeals = {
        ...prevMeals,
        [day]: { ...prevMeals[day], [mealType]: null },
      };
      localStorage.setItem('meals', JSON.stringify(updatedMeals));
      return updatedMeals;
    });
    setInputVisible(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], [mealType]: true },
    }));
  }, []);

  return (
    <div className='menuSemanal-container'>
      <div className='title-container'>
        <h2>Planificación semanal</h2>
        <div className='icon'><IonIcon icon={calendarOutline} /></div>
      </div>
      <div className="menu">
        {daysOfWeek.map((day) => {
          const { lunch, dinner } = meals[day];
          const { lunch: lunchVisible, dinner: dinnerVisible } = inputVisible[day];

          return (
            <div key={day} className="day">
              <h3 className="day-name">{day}</h3>
              <div className="meal">
                <h4>Comida</h4>
                {lunchVisible ? (
                  <input
                    type="text"
                    placeholder="Añadir comida"
                    onBlur={(e) => addMeal(day, 'lunch', e.target.value)}
                  />
                ) : (
                  <div>
                    <p>{lunch}</p>
                    <button onClick={() => removeMeal(day, 'lunch')}>Eliminar</button>
                  </div>
                )}
              </div>
              <div className="meal">
                <h4>Cena</h4>
                {dinnerVisible ? (
                  <input
                    type="text"
                    placeholder="Añadir cena"
                    onBlur={(e) => addMeal(day, 'dinner', e.target.value)}
                  />
                ) : (
                  <div>
                    <p>{dinner}</p>
                    <button onClick={() => removeMeal(day, 'dinner')}>Eliminar</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
