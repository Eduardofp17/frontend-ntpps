import { useState, useEffect } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, RequestsContainer } from './styled';
import RequestComponent from '../../../components/Request';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { Request } from '../../../store/globalTypes';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';
import Footer from '../../../components/footer';

function PedidosDeAdesao(): JSX.Element {
  document.title = 'Pedidos de adesão';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useSelector((state: States): string => state.authReducer.token);
  const LoadingAcceptState = useSelector(
    (state: States): boolean => state.acceptRequestReducer.loading,
  );
  const LoadingRejectState = useSelector(
    (state: States): boolean => state.rejectRequestReducer.loading,
  );

  useEffect(() => {
    setLoading(LoadingAcceptState || LoadingAcceptState);
    const getRequests = async () => {
      try {
        axios.defaults.headers.Authorization = `Bearer ${token}`;

        const response = await axios.get('/requests/');

        let { data } = response;
        data = data.sort((a: Request) => {
          if (a.verified) {
            return -1;
          }
          return 1;
        });
        setRequests(data);
      } catch (e) {
        //
      }
    };
    getRequests();
  }, [loading, LoadingAcceptState, LoadingRejectState]);
  return (
    <>
      <DenseHeader text="Pedidos de adesão" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      {requests.length == 0 ? (
        <Main style={{ display: loading ? 'none' : 'flex' }}>
          <h2>Não há solicitações no momento</h2>
          <p>
            Se você fez uma solicitação de adesão, por favor, verifique o status
            da sua instituição para confirmar se estão sendo aceitas novas
            solicitações no momento. Caso ainda tenha dúvidas ou suspeite de
            algum erro, entre em contato conosco através do seguinte e-mail:{' '}
            <b>naescolaalimentacao@gmail.com</b>.
          </p>
        </Main>
      ) : (
        <Main style={{ display: loading ? 'none' : 'flex' }}>
          <h2>Solicitações: {requests.length} </h2>
          <RequestsContainer>
            {requests.map((request: Request) => (
              <RequestComponent
                nome={request.nome}
                sobrenome={request.sobrenome}
                verified={request.verified}
                email={request.email}
                token={token}
                key={request.id}
              />
            ))}
          </RequestsContainer>
        </Main>
      )}
      <Footer />
    </>
  );
}

export default PedidosDeAdesao;
