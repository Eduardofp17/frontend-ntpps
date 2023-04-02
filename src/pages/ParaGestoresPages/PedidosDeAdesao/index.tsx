import React, { useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, RequestsContainer } from './styled';
import RequestComponent from '../../../components/Request';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { Request } from '../../../store/globalTypes';
import { CircularProgress } from '@mui/material';
import { darkGreen } from '../../../config/collors/colors';

function PedidosDeAdesao(): JSX.Element {
  document.title = 'Pedidos de adesão';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const token = useSelector((state: States): string => state.authReducer.token);
  const LoadingAcceptState = useSelector(
    (state: States): boolean => state.acceptRequestReducer.loading,
  );
  const LoadingRejectState = useSelector(
    (state: States): boolean => state.rejectRequestReducer.loading,
  );

  React.useEffect(() => {
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
        console.log(e);
      }
    };
    getRequests();
  }, [loading, LoadingAcceptState, LoadingRejectState]);
  return (
    <React.Fragment>
      <DenseHeader text="Pedidos de adesão" />
      <Main style={{ display: loading ? 'flex' : 'none' }}>
        <CircularProgress
          style={{ color: darkGreen, margin: 'auto', marginTop: '200px' }}
        />
      </Main>
      <Main style={{ display: loading ? 'none' : 'flex' }}>
        <h2>{requests.length} solicitações: </h2>
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
    </React.Fragment>
  );
}

export default PedidosDeAdesao;
