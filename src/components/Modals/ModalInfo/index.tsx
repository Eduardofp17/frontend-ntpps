import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface Props {
  icon: JSX.Element;
  title: string;
  description: string;
}
export default function ModalInfo(props: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{props.icon}</Button>
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
          }}
        >
          <h2
            id="modal-modal-title"
            style={{ fontSize: '18px', fontWeight: 700, fontStyle: 'normal' }}
          >
            {props.title}
          </h2>
          <p
            id="modal-modal-description"
            style={{ fontSize: '16px', fontStyle: 'normal' }}
          >
            {props.description}
          </p>
        </div>
      </Modal>
    </div>
  );
}
