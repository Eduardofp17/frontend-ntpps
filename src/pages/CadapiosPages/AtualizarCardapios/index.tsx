import React from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardapioEdit from '../../../components/CardapioEdit/Cardapio';
import { CardapiosContainer, Main } from './styled';
import axios from '../../../services/axios';
import { AxiosError } from 'axios';
import { CardapioModel } from '../../../store/globalTypes';
import CircularProgress from '@mui/material/CircularProgress';
import { darkGreen } from '../../../config/collors/colors';
import { States } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
function AtualizarCardapios(): JSX.Element {
  const [CardapiosAPI, setCardapiosAPI] = React.useState<CardapioModel[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadingState = useSelector(
    (state: States): boolean => state.deleteCardapioReducer.loading,
  );
  const loadingUpdateState = useSelector(
    (state: States): boolean => state.updateCardapioReducer.loading,
  );

  const getCardapios = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/cardapio');
      setLoading(false);
      const { data } = response;
      data.map((val: CardapioModel) => {
        val.position = val.id;
      });
      setCardapiosAPI(data);
    } catch (e) {
      const err = e as AxiosError;
      return err.response?.data;
    }
  };

  React.useEffect(() => {
    getCardapios();
    setLoading(loadingState);
  }, [loading, loadingState, loadingUpdateState]);

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
  return (
    <React.Fragment>
      <DenseHeader to="/tools/adm-cardapios/" text="Atualizar cardápios" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        <h1>Atualize aqui</h1>
        <CardapiosContainer>
          {CardapiosAPI.map((cardapio: CardapioModel) => (
            <CardapioEdit
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

export default AtualizarCardapios;
