import Modal from 'react-modal';

interface Props {
  ModalOpen: boolean;
  onClose: () => void;
  input: JSX.Element;
  button: JSX.Element;
}

Modal.setAppElement('#root');

function ModalToCreateStudent(props: Props): JSX.Element {
  return (
    <Modal
      isOpen={props.ModalOpen}
      onRequestClose={props.onClose}
      style={{
        content: {
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(11, 11, 11, 0.1)',
          width: '300px',
          height: '300px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          border: 'none',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
      }}
    >
      <div className="box ModalCreating" style={{ zIndex: 10 }}>
        <div
          className="content ModalCreating"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: 'auto',

            width: '250px',
            height: '250px',
          }}
        >
          <div className="text ModalCreating">
            <h2
              className="ModalCreating"
              style={{ fontSize: '16px', textAlign: 'center' }}
            >
              Insira o nome completo do(a) aluno(a) que você deseja adicionar:
            </h2>
            {props.input}
          </div>
          {props.button}
        </div>
      </div>
    </Modal>
  );
}

export default ModalToCreateStudent;
