import SettingsIcon from '@mui/icons-material/Settings';
import { User, Paragraph, ParagraphRole } from './styled';
import { IconButton } from '@mui/material';
import ModalUser from '../Modals/ModalUser';
import { useState } from 'react';
interface Props {
  name: string;
  role: number;
  hash_id: string;
  email: string;
  created_at: string;
}
function CardUser(props: Props): JSX.Element {
  const roles = ['Aluno(a)', 'Líder de sala', 'Funcionário(a)', 'Gestor(a)'];
  const [ModalOn, setModalOn] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 'auto',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 10px rgba(11, 11, 11, 0.1)',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
        }}
      >
        <User>
          <Paragraph>{props.name}</Paragraph>
          <ParagraphRole>{roles[props.role]}</ParagraphRole>
        </User>

        <ModalUser
          name={props.name}
          description="test"
          icon={<SettingsIcon style={{ color: '#000' }} />}
          hash_id={String(props.hash_id)}
          role={String(roles[props.role])}
          created_at={String(props.created_at)}
          email={String(props.email)}
        />
      </div>
    </>
  );
}

export default CardUser;
