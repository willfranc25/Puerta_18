import React from 'react';

const Boton = ({ texto, onClick, className = '' }) => {
  return (
    <button
      className={`boton ${className}`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Boton;
