import * as React from 'react';
import { Button, Modal, ButtonGroup, IconButton } from '@mui/material';
import { GrClose } from 'react-icons/gr';
interface Props {
  icon: JSX.Element;
  name: string;
  description: string;
  hash_id: string;
  role: string;
  email: string;
  created_at: string;
}
export default function ModalUser(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>{props.icon}</IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '330px',
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: '5px',
          }}
        >
          <div
            className="header"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div className="user">
              <h2
                id="modal-user-name"
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  fontStyle: 'normal',
                  display: 'flex',
                  flexDirection: 'column',
                  lineHeight: '15px',
                  textAlign: 'left',
                }}
              >
                {props.name}
                <span
                  style={{
                    padding: '0px',
                    margin: '0px',
                    color: 'rgba(0, 0, 0, 0.30)',
                    fontSize: '10px',
                  }}
                >
                  #{props.hash_id}
                </span>
              </h2>
            </div>
            <IconButton onClick={handleClose}>
              <GrClose />
            </IconButton>
          </div>
          <div
            id="modal-user-description"
            style={{
              fontSize: '16px',
              fontStyle: 'normal',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0px' }}>
              Cargo: <span style={{ fontWeight: 'normal' }}>{props.role}</span>
            </p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0px' }}>
              Email: <span style={{ fontWeight: 'normal' }}>{props.email}</span>
            </p>
            <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0px' }}>
              Conta criada em:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                  timeZone: 'America/Sao_Paulo',
                }).format(new Date(props.created_at))}
              </span>
            </p>
          </div>

          <div
            className="buttons"
            style={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              paddingTop: '60px',
              paddingLeft: '5px',
            }}
          >
            <ButtonGroup
              disableElevation
              variant="text"
              aria-label="Disabled elevation buttons"
            >
              <Button
                style={{ fontSize: '12px', color: 'red', borderColor: '#000' }}
              >
                Expulsar Usuário
              </Button>
              <Button style={{ fontSize: '12px', color: 'green' }}>
                Salvar Alterações
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </div>
  );
}
