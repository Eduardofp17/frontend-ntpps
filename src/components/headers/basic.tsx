import React from 'react';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { primaryGreen } from '../../config/collors/colors';
import { AuthLoggoutRequest } from '../../store/modules/auth/index';
import { useDispatch } from 'react-redux';

import Modal from '../Modals/ModalButtons/index';
interface Props {
  to: string;
}

function BasicHeader(props: Props): JSX.Element {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const handleLogout = () => {
    dispatch(AuthLoggoutRequest());
  };
  return (
    <React.Fragment>
      <header>
        <Modal
          ModalOpen={modalOpen}
          title={`Você realmente deseja sair da sua conta?`}
          info={`Ao clicar em "Confirmar" você sairá da sua conta e será redirecionado para uma página de erro 404.`}
          button1={
            <button
              style={{
                background: 'none',
                color: '#9D0000',
                borderRadius: '5px ',
                border: `1px solid  #9D0000`,
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </button>
          }
          button2={
            <button
              style={{
                backgroundColor: '#9D0000',
                color: '#fff',
                borderRadius: '5px ',
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() => handleLogout()}
            >
              Confirmar
            </button>
          }
        />
        <Box>
          <AppBar
            position="static"
            style={{ backgroundColor: primaryGreen, padding: '5px' }}
          >
            <Toolbar
              variant="dense"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                href={props.to}
              >
                <img
                  src="/images/logoFigueiredo.png"
                  alt="Logo da instituição"
                />
              </IconButton>

              <div onClick={() => setModalOpen(true)}>
                <LogoutIcon />
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </React.Fragment>
  );
}

export default BasicHeader;
