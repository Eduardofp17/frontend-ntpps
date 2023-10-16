import { User, Paragraph } from './styled';
import ModalStudentFrequency from '../Modals/ModalStudentFrequency';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { frequency } from '../../store/globalTypes';

interface Props {
  fullName: string;
  id: number;
  room_id: number;
  frequency?: frequency;
}
function CardStudentFrequency(props: Props): JSX.Element {
  const date = new Date();

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
          <Paragraph>{props.fullName}</Paragraph>
        </User>
        {date.getHours() >= 7 && date.getHours() <= 17 ? (
          <ModalStudentFrequency
            icon={<SettingsIcon style={{ color: '#000' }} />}
            name={props.fullName}
            id={props.id}
            room_id={props.room_id}
            frequency={props.frequency}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default CardStudentFrequency;
