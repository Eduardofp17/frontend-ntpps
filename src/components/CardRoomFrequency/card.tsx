import { User, Paragraph } from './styled';
import { IconButton } from '@mui/material';
import { Eye } from '@phosphor-icons/react';
import { AiFillEye } from 'react-icons/ai';

interface Props {
  room_name: string;
  room_id: number;
}
function CardRoomFrequency(props: Props): JSX.Element {
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
          <Paragraph>{props.room_name}</Paragraph>
        </User>
        <IconButton>
          <AiFillEye />
        </IconButton>
      </div>
    </>
  );
}

export default CardRoomFrequency;
