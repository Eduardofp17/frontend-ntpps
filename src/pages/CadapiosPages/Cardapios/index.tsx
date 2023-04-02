import React, { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import Cardapio from '../../../components/Cardapio/Cardapio';
import { CardapioModel } from '../../../store/globalTypes';
import { CardapiosContainer, Main } from './styled';
import axios from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';
function Cardapios(): JSX.Element {
  document.title = 'Ver cardápios';
  const [CardapiosAPI, setCardapiosAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCardapios = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/cardapio/');
        const { data } = response;
        data.map((val: CardapioModel) => {
          val.position = val.id;
        });
        setCardapiosAPI(data);
        setLoading(false);
        return;
      } catch (e) {
        return 'An error ocurred';
      }
    };
    getCardapios();
  }, []);
  const days = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];
  const position = (Day: string): number => {
    const position: number = days.indexOf(Day);
    return position;
  };
  CardapiosAPI.map((cardapio: CardapioModel) => {
    cardapio.position = position(cardapio.dayname);
  });
  CardapiosAPI.sort((a: CardapioModel, b: CardapioModel) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
  });

  return (
    <React.Fragment>
      <DenseHeader text="Ver Cardápios" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        <h3>Escolha o dia da semana: </h3>
        <CardapiosContainer>
          {CardapiosAPI.map((cardapio: CardapioModel) => (
            <Cardapio
              id={cardapio.id}
              dayname={cardapio.dayname}
              breakfast={cardapio.breakfast}
              lunch={cardapio.lunch}
              afternoonsnack={cardapio.afternoonsnack}
              position={position(cardapio.dayname)}
              key={cardapio.id}
            />
          ))}
        </CardapiosContainer>
      </Main>
    </React.Fragment>
  );
}

export default Cardapios;
