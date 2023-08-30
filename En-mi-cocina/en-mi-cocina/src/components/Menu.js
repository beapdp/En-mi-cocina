import React, { useState } from 'react';
import '../styles/menu.css'

// Este componente será el Menú de la semana.
export const Menu = () => {
  // Este array representa los días de la semana.
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Este estado guarda las comidas y cenas para cada día de la semana. Comenzamos con todas las comidas y cenas como nulas.
  const [meals, setMeals] = useState({
    'Lunes': { lunch: null, dinner: null },
    'Martes': { lunch: null, dinner: null },
    'Miércoles': { lunch: null, dinner: null },
    'Jueves': { lunch: null, dinner: null },
    'Viernes': { lunch: null, dinner: null },
    'Sábado': { lunch: null, dinner: null },
    'Domingo': { lunch: null, dinner: null },
  });

  // Este estado controla si el input de texto debe mostrarse o no para cada comida y cena. Comienza como verdadero para todos.
  const [inputVisible, setInputVisible] = useState({
    'Lunes': { lunch: true, dinner: true },
    'Martes': { lunch: true, dinner: true },
    'Miércoles': { lunch: true, dinner: true },
    'Jueves': { lunch: true, dinner: true },
    'Viernes': { lunch: true, dinner: true },
    'Sábado': { lunch: true, dinner: true },
    'Domingo': { lunch: true, dinner: true },
  });

  // Esta función se llama cuando se quiere agregar una comida o cena a un día.
  const addMeal = (day, mealType, meal) => {
    // Si la comida no está vacía, la añadimos al estado de las comidas.
    if (meal !== "") {
      setMeals((prevMeals) => {
        return { ...prevMeals, [day]: { ...prevMeals[day], [mealType]: meal }};
      });
      // Ocultamos el input después de añadir la comida.
      setInputVisible(prevState => {
        return { ...prevState, [day]: { ...prevState[day], [mealType]: false }};
      });
    }
  };

  // Esta función se llama cuando se quiere eliminar una comida o cena de un día.
  const removeMeal = (day, mealType) => {
    // Eliminamos la comida del estado de las comidas.
    setMeals(prevMeals => {
      return { ...prevMeals, [day]: { ...prevMeals[day], [mealType]: null }};
    });
    // Mostramos el input después de eliminar la comida.
    setInputVisible(prevState => {
      return { ...prevState, [day]: { ...prevState[day], [mealType]: true }};
    });
  }

  // Esta es la función de renderizado del componente.
  return (
    <div className="menu">
      {/* Iteramos sobre los días de la semana. */}
      {daysOfWeek.map((day) => (
        <div key={day} className="day">
          <h3 className="day-name">{day}</h3>
          <div className="meal">
            <h4>Comida</h4>
            {/* Si el input para la comida de este día debe ser visible, lo mostramos. */}
            {inputVisible[day].lunch ? (
              <input
                type="text"
                placeholder="Añadir comida"
                onBlur={(e) => addMeal(day, 'lunch', e.target.value)}
              />
            ) : (
              /* Si no, mostramos la comida y un checkbox para eliminarla. */
              <div>
                <p>{meals[day].lunch}</p>
                <input 
                  type="checkbox" 
                  checked={!inputVisible[day].lunch}
                  onChange={() => removeMeal(day, 'lunch')}
                />
              </div>
            )}
          </div>
          <div className="meal">
            <h4>Cena</h4>
            {/* Lo mismo para la cena. */}
            {inputVisible[day].dinner ? (
              <input
                type="text"
                placeholder="Añadir cena"
                onBlur={(e) => {
                  addMeal(day, 'dinner', e.target.value);
                }}
              />
            ) : (
              <div>
                <p>{meals[day].dinner}</p>
                <input 
                  type="checkbox" 
                  checked={!inputVisible[day].dinner}
                  onChange={() => removeMeal(day, 'dinner')}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
