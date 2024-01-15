import React from 'react';
import '../styles/recipes.css';
import { IonIcon } from '@ionic/react';
import { bookOutline } from 'ionicons/icons';

export const Recipes = () => {
  return (
    <div className='recipes-container'>
      <div className='title-container'>
        <h2>Mis recetas</h2>
        <IonIcon className='icon' icon={bookOutline}></IonIcon>
      </div>
      <div className='buttons-container'>
        <button>Ver Recetas</button>
        <button>Añadir Receta</button>
      </div>
    </div>
  )
}
