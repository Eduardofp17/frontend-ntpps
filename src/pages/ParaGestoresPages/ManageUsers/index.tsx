import { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import CardUser from '../../../components/CardUser/card';
import axios from '../../../services/axios';
import { Main } from './styled';

type User = {
  id: number;
  name: string;
  level: number;
  hash_id: string;
  email: string;
  created_at: string;
};
type User_API = {
  id: number;
  name: string;
  nome: string;
  sobrenome: string;
  email: string;
  level: string;
};
function ManageUsers(): JSX.Element {
  const [Users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    try {
      const { data } = await axios.get('/users/');
      data.map((user: User_API) => {
        user.name = user.nome + ' ' + user.sobrenome;
      });
      setUsers(data);
    } catch (e) {
      //
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  Users.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
  return (
    <>
      <DenseHeader text="Administrar usuários" />
      <Main style={{ paddingBottom: '20px' }}>
        {Users.length == 0 ? (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <h2 style={{}}>
              Ainda não existem usuários vinculados à sua instituição.
            </h2>
            <p>
              Se a sua instituição está aceitando inscrições, verifique as
              solicitações pendentes para adicionar novos usuários.
            </p>
          </div>
        ) : (
          <section>
            <h3>Pessoas vinculadas com sua instituição: {Users.length} </h3>
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
                  hash_id={'teste123'}
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
    </>
  );
}

export default ManageUsers;
