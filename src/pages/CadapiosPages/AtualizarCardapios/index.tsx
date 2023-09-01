import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardapioEdit from '../../../components/CardapioEdit/Cardapio';
import {
  CardapiosContainer,
  Main,
  CardapiosEvenComponent,
  CardapiosOddComponent,
  CardapiosSection,
} from './styled';
import axios from '../../../services/axios';
import { AxiosError } from 'axios';
import { CardapioModel } from '../../../store/globalTypes';
import CircularProgress from '@mui/material/CircularProgress';
import { darkGreen } from '../../../config/collors/colors';
import { States } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Semanas from '../../../utils/weekNumber';
import Footer from '../../../components/footer';

function AtualizarCardapios(): JSX.Element {
  document.title = 'Editar cardápio';
  const [CardapiosEven, setCardapiosEven] = useState<CardapioModel[]>([]);
  const [CardapiosOdd, setCardapiosOdd] = useState<CardapioModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [actualWeek, setActualWeek] = useState<number>(-1);
  const loadingState = useSelector(
    (state: States): boolean => state.deleteCardapioReducer.loading,
  );
  const loadingUpdateState = useSelector(
    (state: States): boolean => state.updateCardapioReducer.loading,
  );
  const semana = Semanas.pegarDataAtual();
  const getCardapios = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/cardapio/all');
      setLoading(false);
      const { data } = response;
      const even: CardapioModel[] = [];
      const odd: CardapioModel[] = [];
      data.map((val: CardapioModel) => {
        if (val.weeknumber === 0) even.push(val);
        if (val.weeknumber === 1) odd.push(val);
      });
      setCardapiosEven(even);
      setCardapiosOdd(odd);
    } catch (e) {
      const err = e as AxiosError;
      return err.response?.data;
    }
  };

  useEffect(() => {
    getCardapios();

    setLoading(loadingState);

    setActualWeek(semana);
  }, [loading, loadingState, loadingUpdateState]);
  return (
    <>
      <DenseHeader text="Editar cardápio" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        {CardapiosOdd.length === 0 && CardapiosEven.length === 0 ? (
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <h2>
              Não foi encontrado nenhum cardápio na sua instituição ainda.
            </h2>
            <a href="/tools/adm-cardapios/criar-cardapios">
              Clique aqui para criar um novo cardápio e começar a adicionar
              pratos deliciosos!
            </a>
          </div>
        ) : (
          <CardapiosSection>
            <h2 style={{ padding: '5px' }}>
              Esses são os cardápios criados por sua instituição:{' '}
            </h2>
            <CardapiosOddComponent>
              <h3
                style={{
                  width: '90%',
                  margin: 'auto',
                  padding: '5px 10px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: actualWeek === 1 ? '#b4f5c6' : '',
                  borderRadius: '5px',
                }}
              >
                Semanas 1 e 3:{' '}
                <span
                  style={{
                    display: actualWeek === 1 ? 'flex' : 'none',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50px',
                    backgroundColor: 'green',
                  }}
                ></span>
              </h3>
              <CardapiosContainer>
                {CardapiosOdd.map((cardapio: CardapioModel) => (
                  <CardapioEdit
                    id={cardapio.id}
                    dayname={cardapio.dayname}
                    breakfast={cardapio.breakfast}
                    lunch={cardapio.lunch}
                    afternoonsnack={cardapio.afternoonsnack}
                    position={cardapio.id}
                    key={cardapio.id}
                  />
                ))}
              </CardapiosContainer>
            </CardapiosOddComponent>
            <CardapiosEvenComponent>
              <h3
                style={{
                  width: '90%',
                  margin: 'auto',
                  padding: '5px 10px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: actualWeek === 0 ? '#b4f5c6' : '',
                  borderRadius: '5px',
                }}
              >
                Semanas 2 e 4:{' '}
                <span
                  style={{
                    display: actualWeek === 0 ? 'flex' : 'none',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50px',
                    backgroundColor: 'green',
                  }}
                ></span>
              </h3>
              <CardapiosContainer>
                {CardapiosEven.map((cardapio: CardapioModel) => (
                  <CardapioEdit
                    id={cardapio.id}
                    dayname={cardapio.dayname}
                    breakfast={cardapio.breakfast}
                    lunch={cardapio.lunch}
                    afternoonsnack={cardapio.afternoonsnack}
                    position={cardapio.id}
                    key={cardapio.id}
                  />
                ))}
              </CardapiosContainer>
            </CardapiosEvenComponent>
          </CardapiosSection>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default AtualizarCardapios;
