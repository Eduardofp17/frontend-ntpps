import React, { useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main, RequestsContainer } from './styled';
import RequestComponent from '../../../components/Request';
import axios from '../../../services/axios';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { Request } from '../../../store/globalTypes';
function PedidosDeAdesao(): JSX.Element {
  const [requests, setRequests] = useState([]);

  const token = useSelector((state: States): string => state.authReducer.token);

  React.useEffect(() => {
    const getRequests = async () => {
      try {
        axios.defaults.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get('/requests/');
        const { data } = response;
        setRequests(data);
      } catch (e) {
        console.log(e);
      }
    };
    getRequests();
  }, []);
  return (
    <React.Fragment>
      <DenseHeader text="Pedidos de adesão" to="/tools/gestores" />
      <Main>
        <h2>{requests.length} solicitações: </h2>
        <RequestsContainer>
          {requests.map((request: Request) => (
            <RequestComponent
              nome={request.nome}
              sobrenome={request.sobrenome}
              key={request.id}
            />
          ))}
        </RequestsContainer>
      </Main>
    </React.Fragment>
  );
}

export default PedidosDeAdesao;
