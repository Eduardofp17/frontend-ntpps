import { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardUser from '../../../components/CardUser/card';
import axios from '../../../services/axios';
import { Main } from './styled';
import { States } from '../../../store/globalTypes';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './managa-users.css';
type User = {
  id: number;
  name: string;
  level: number;
  email: string;
  created_at: string;
};
type User_API = {
  id: number;
  name: string;
  nome: string;
  sobrenome: string;
  email: string;
  level: number;
};
function ManageUsers(): JSX.Element {
  document.title = 'Administrar usuários';
  const [Users, setUsers] = useState<User[]>([]);
  const loadingState = useSelector(
    (state: States): boolean => state.updateUserRoleReducer.loading,
  );
  const updatedState = useSelector(
    (state: States): boolean => state.updateUserRoleReducer.updated,
  );
  const [loading, setLoading] = useState<boolean>(loadingState);
  const [updated, setUpdated] = useState<boolean>(updatedState);
  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users`);
      data.map((user: User_API) => {
        user.name = user.nome + ' ' + user.sobrenome;
      });
      setUsers(data);
      setLoading(false);
    } catch (e) {
      //
    }
  };
  useEffect(() => {
    setLoading(loadingState);
    getUsers();
  }, [loadingState]);

  useEffect(() => {
    setUpdated(updatedState);
    if (updatedState) {
      toast.success('Cargo atualizado com sucesso', {
        toastId: 'unique-toast-id',
      });
    }
  }, [updatedState, updated]);
  Users.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return (
    <>
      <DenseHeader text="Administrar usuários" />
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Main style={{ paddingBottom: '20px' }}>
        {Users.length == 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h2>Ainda não existem usuários vinculados à sua instituição.</h2>
            <p>
              Se a sua instituição está aceitando inscrições, verifique as
              solicitações pendentes para adicionar novos usuários.
            </p>
          </div>
        ) : (
          <section>
            <h3 style={{ padding: '0px 25px' }}>
              Pessoas vinculadas com sua instituição: {Users.length}{' '}
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                margin: 'auto',
                width: '100%',
              }}
            >
              {Users.map((user) => (
                <CardUser
                  id={Number(user.id)}
                  name={String(user.name)}
                  email={String(user.email)}
                  role={Number(user.level)}
                  created_at={String(user.created_at)}
                  key={Number(user.id)}
                />
              ))}
            </div>
          </section>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default ManageUsers;
