import React from 'react';
import DenseHeader from '../../components/headers/dense';
import Cardapio from '../../components/Cardapio/Cardapio';

function Cardapios(): JSX.Element {
  const Cardapios = [
    {
      position: 0,
      dayname: 'Segunda-feira',
      breakfast: 'Pão com ovo',
      lunch: 'Macarronada',
      afternoonsnack: 'Bolo',
    },
    {
      position: 1,
      dayname: 'Terça-feira',
      breakfast: 'Bolo Cute',
      lunch: 'Frango',
      afternoonsnack: 'Café',
    },
  ];
  return (
    <React.Fragment>
      <DenseHeader to="/" text="Ver Cardápios" />
      <h3>Escolha o dia da semana: </h3>
      {Cardapios.map((cardapio) => (
        <Cardapio
          dayname={cardapio.dayname}
          breakfast={cardapio.breakfast}
          lunch={cardapio.lunch}
          afternoonsnack={cardapio.afternoonsnack}
          position={cardapio.position}
          key={cardapio.position}
        />
      ))}
    </React.Fragment>
  );
}

export default Cardapios;
