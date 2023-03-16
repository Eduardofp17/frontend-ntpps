import React from 'react';
import { RequestCard, Buttons } from './styled';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { AcceptRequestRequest } from '../../store/modules/AcceptRequest/index';
interface Props {
  nome: string;
  sobrenome?: string;
}

function Request(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const handleAccept = () => {
    dispatch(AcceptRequestRequest());
  };
  return (
    <React.Fragment>
      <RequestCard>
        <div className="fullname">
          <p style={{ fontWeight: 'bold' }}>
            {' '}
            {props.nome} {props.sobrenome}{' '}
          </p>
        </div>
        <Buttons>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={(e) => handleAccept()}
          >
            <DoneIcon style={{ color: 'green' }} />
          </div>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={(e) => console.log('Reject')}
          >
            <CloseIcon style={{ color: 'red' }} />
          </div>
        </Buttons>
      </RequestCard>
    </React.Fragment>
  );
}

export default Request;
