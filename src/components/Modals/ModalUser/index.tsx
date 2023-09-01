import { useState, useEffect } from 'react';
import { Button, Modal, ButtonGroup, IconButton } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import { TbEdit } from 'react-icons/tb';
import { primaryOrange } from '../../../config/collors/colors';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { useDispatch } from 'react-redux';
import { UpdateUserRoleRequest } from '../../../store/modules/Update-user-role';
import ModalWithTwoButtons from '../ModalButtons';
import { DeleteUserRequest } from '../../../store/modules/ban-user/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  icon: JSX.Element;
  name: string;
  description: string;
  role: string;
  email: string;
  created_at: string;
  id: number;
}
export default function ModalUser(props: Props) {
  const roles = ['Aluno(a)', 'Líder de sala', 'Funcionário(a)', 'Gestor(a)'];
  const [open, setOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [updateRoleModalOpen, setUpdateRoleModalOpen] =
    useState<boolean>(false);
  const loadingState = useSelector(
    (state: States): boolean => state.updateUserRoleReducer.loading,
  );
  const deleted = useSelector(
    (state: States): boolean => state.deleteUserReducer.loading,
  );

  const [loading, setLoading] = useState<boolean>(loadingState);

  const [role, setRole] = useState<number>(Number(roles.indexOf(props.role)));
  const token = useSelector((state: States): string => state.authReducer.token);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    setRole(Number(roles.indexOf(props.role)));
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleteModalOpen(false);
      await dispatch(DeleteUserRequest({ id, token }));
      handleClose();
    } catch (e) {
      //
    }
  };
  const handleModalRole = () => {
    setOpen(false);
    setDeleteModalOpen(false);
    setUpdateRoleModalOpen(true);
  };
  const handleUpdateRole = async () => {
    try {
      setDeleteModalOpen(false);
      setUpdateRoleModalOpen(false);
      await dispatch(UpdateUserRoleRequest({ id: props.id, role, token }));
      setRole(Number(roles.indexOf(props.role)));
      handleClose();
    } catch (e) {
      //
    }
  };

  useEffect(() => {
    setLoading(loadingState);

    if (loadingState) {
      handleClose();
    }
  }, [loading, loadingState]);

  useEffect(() => {
    if (deleted) {
      toast.success(`${props.name} foi expulso com sucesso!`, {
        toastId: 'unique-toast-id',
      });
    }
  }, [deleted]);
  return (
    <div>
      <IconButton onClick={handleOpen}>{props.icon}</IconButton>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '90%', maxWidth: '320px', margin: 'auto' }}
      />
      <ModalWithTwoButtons
        title="Deseja realmente expulsar o usuário?"
        ModalOpen={deleteModalOpen}
        info='Ao clicar em "Confirmar", você estará excluindo-o permanentemente.'
        button1={
          <Button
            className="ModalWithTwoButtons"
            style={{
              background: 'none',
              border: `1px solid  #9D0000`,
              color: '#9D0000',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => {
              setDeleteModalOpen(false);
              setOpen(true);
            }}
          >
            Cancelar
          </Button>
        }
        button2={
          <Button
            className="ModalWithTwoButtons"
            style={{
              backgroundColor: 'green',
              color: '#fff',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => handleDelete(Number(props.id))}
          >
            Confirmar
          </Button>
        }
      />
      <ModalWithTwoButtons
        title="Você realmente deseja alterar o cargo do usuário?"
        ModalOpen={updateRoleModalOpen}
        info='Ao clicar em "Confirmar", você fará a alteração.'
        button1={
          <Button
            className="ModalWithTwoButtons"
            style={{
              background: 'none',
              border: `1px solid  #9D0000`,
              color: '#9D0000',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => {
              setUpdateRoleModalOpen(false);
              setOpen(true);
            }}
          >
            Cancelar
          </Button>
        }
        button2={
          <Button
            className="ModalWithTwoButtons"
            style={{
              backgroundColor: 'green',
              color: '#fff',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => handleUpdateRole()}
          >
            Confirmar
          </Button>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 1 }}
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
                  #{String(props.id).padStart(6, '0')}
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
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                margin: '0px',
                alignItems: 'center',
              }}
            >
              Cargo:{' '}
              {editing ? (
                <select
                  value={role}
                  onChange={(e) => setRole(Number(e.target.value))}
                >
                  <option value="0">Aluno(a)</option>
                  <option value="1">Líder de sala</option>
                  <option value="2">Funcionário(a)</option>
                  <option value="3">Gestor(a)</option>
                </select>
              ) : (
                <span style={{ fontWeight: 'normal' }}>{roles[role]}</span>
              )}
              <IconButton
                style={{
                  fontSize: '16px',
                  color: !editing ? primaryOrange : 'red',
                }}
                onClick={() => setEditing(!editing)}
              >
                {!editing ? <TbEdit /> : <GrClose />}
              </IconButton>
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
              alignItems: 'center',
            }}
          >
            <ButtonGroup
              disableElevation
              variant="text"
              aria-label="Disabled elevation buttons"
            >
              <Button
                style={{
                  fontSize: '12px',
                  color: 'red',
                  borderColor: '#000',
                  textAlign: 'center',
                  minWidth: '145px',
                }}
                onClick={() => {
                  setDeleteModalOpen(true);
                  setOpen(false);
                }}
              >
                Expulsar Usuário
              </Button>
              <Button
                style={{
                  fontSize: '12px',
                  color: 'green',
                  textAlign: 'center',
                  minWidth: '145px',
                }}
                disabled={roles[role] == props.role}
                onClick={() => handleModalRole()}
              >
                Alterar cargo
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </div>
  );
}
