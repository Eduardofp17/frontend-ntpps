import React from 'react';
import { RequestCard, Buttons } from './styled';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { AcceptRequestRequest } from '../../store/modules/AcceptRequest/index';
import { RejectRequestRequest } from '../../store/modules/RejectRequest/index';
import { Warning } from '@mui/icons-material';
import ModalInfo from '../Modals/ModalInfo';

interface Props {
  nome: string;
  sobrenome?: string;
  verified: boolean;
  email: string;
  token: string;
}

function Request(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const handleAccept = () => {
    dispatch(AcceptRequestRequest({ token: props.token, email: props.email }));
  };
  const handleReject = () => {
    dispatch(RejectRequestRequest({ token: props.token, email: props.email }));
  };
  return (
    <React.Fragment>
      <RequestCard
        style={{ backgroundColor: props.verified ? '#fff' : '#FFF6F6' }}
      >
        <div className="fullname">
          <p style={{ fontWeight: 'bold' }}>
            {' '}
            {props.nome} {props.sobrenome}{' '}
          </p>
        </div>
        {props.verified ? (
          <Buttons>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleAccept()}
            >
              <DoneIcon style={{ color: 'green' }} />
            </div>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleReject()}
            >
              <CloseIcon style={{ color: 'red' }} />
            </div>
          </Buttons>
        ) : (
          <Buttons>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ModalInfo
                icon={<Warning style={{ color: 'red' }} />}
                title={`${props.nome} ${props.sobrenome} não pode ser aceito`}
                description={`${props.nome} ${props.sobrenome} precisa validar o email. Essa verificação é necessária para evitar spam.`}
              />
            </div>
          </Buttons>
        )}
      </RequestCard>
    </React.Fragment>
  );
}

export default Request;
