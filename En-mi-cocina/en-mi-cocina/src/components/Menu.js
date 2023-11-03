// Importamos los hooks y las dependencias necesarias
import React, { useState, useCallback } from 'react';
import '../styles/menu.css'

// Definimos el componente Menu
export const Menu = () => {
  // Array con los días de la semana
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Estado que guarda las comidas y cenas para cada día de la semana
  const [meals, setMeals] = useState({
    'Lunes': { lunch: null, dinner: null },
    'Martes': { lunch: null, dinner: null },
    'Miércoles': { lunch: null, dinner: null },
    'Jueves': { lunch: null, dinner: null },
    'Viernes': { lunch: null, dinner: null },
    'Sábado': { lunch: null, dinner: null },
    'Domingo': { lunch: null, dinner: null },
  });

  // Estado que controla si el input de texto debe mostrarse o no para cada comida y cena
  const [inputVisible, setInputVisible] = useState({
    'Lunes': { lunch: true, dinner: true },
    'Martes': { lunch: true, dinner: true },
    'Miércoles': { lunch: true, dinner: true },
    'Jueves': { lunch: true, dinner: true },
    'Viernes': { lunch: true, dinner: true },
    'Sábado': { lunch: true, dinner: true },
    'Domingo': { lunch: true, dinner: true },
  });

  // Función para agregar una comida o cena a un día, usando useCallback para evitar recreaciones innecesarias de la función
  const addMeal = useCallback((day, mealType, meal) => {
    // Verificamos que la comida no esté vacía antes de agregarla
    if (meal !== "") {
      // Actualizamos el estado de las comidas
      setMeals(prevMeals => ({
        ...prevMeals,
        [day]: { ...prevMeals[day], [mealType]: meal },
      }));
      // Ocultamos el input después de añadir la comida
      setInputVisible(prevState => ({
        ...prevState,
        [day]: { ...prevState[day], [mealType]: false },
      }));
    }
  }, []);

  // Función para eliminar una comida o cena de un día, usando useCallback para evitar recreaciones innecesarias de la función
  const removeMeal = useCallback((day, mealType) => {
    // Eliminamos la comida del estado de las comidas
    setMeals(prevMeals => ({
      ...prevMeals,
      [day]: { ...prevMeals[day], [mealType]: null },
    }));
    // Mostramos el input después de eliminar la comida
    setInputVisible(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], [mealType]: true },
    }));
  }, []);

  // Renderizamos el componente
  return (
    <div className="menu">
      {daysOfWeek.map((day) => {
        // Desestructuramos lunch y dinner de meals[day] y inputVisible[day] para mejorar la legibilidad
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
                  <input 
                    type="checkbox" 
                    checked={!lunchVisible}
                    onChange={() => removeMeal(day, 'lunch')}
                  />
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
                  <input 
                    type="checkbox" 
                    checked={!dinnerVisible}
                    onChange={() => removeMeal(day, 'dinner')}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
