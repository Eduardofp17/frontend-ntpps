import { useState, useEffect } from 'react';
import { Button, Modal, ButtonGroup, IconButton } from '@mui/material';
import { GrClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { States, frequency } from '../../../store/globalTypes';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Classes } from '../../../store/globalTypes';
import { UpdateFrequencyRequest } from '../../../store/modules/UpdateFrequency/index';

interface Props {
  icon: JSX.Element;
  name: string;
  room_id: number;
  id: number;
  frequency?: frequency;
}
const SwitchFrequency = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
type SwitchKeys =
  | 'class_01'
  | 'class_02'
  | 'class_03'
  | 'class_04'
  | 'class_05'
  | 'class_06'
  | 'class_07'
  | 'class_08'
  | 'class_09';

export default function ModalStudentFrequency(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [switchStates, setSwitchStates] = useState<Classes>(
    props.frequency ?? {
      class_01: true,
      class_02: true,
      class_03: true,
      class_04: true,
      class_05: true,
      class_06: true,
      class_07: true,
      class_08: true,
      class_09: true,
    },
  );
  const loadingState = useSelector(
    (state: States): boolean => state.updateFrequencyReducer.loading,
  );
  const [loading, setLoading] = useState<boolean>(loadingState);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSwitchChange = (className: keyof Classes) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [className]: !prevState[className],
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(
        UpdateFrequencyRequest({
          student_id: props.id,
          body: switchStates,
        }),
      );
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

  return (
    <div>
      <IconButton onClick={handleOpen}>{props.icon}</IconButton>
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
                  lineHeight: '20px',
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

          <div className="body-classes" style={{ padding: '10px' }}>
            <div
              className="col1"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {['class_01', 'class_02', 'class_03'].map((className) => (
                <div
                  key={className}
                  className={className}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <p>Aula {className.split('class_')[1]}</p>
                  <SwitchFrequency
                    checked={switchStates[className as SwitchKeys]}
                    inputProps={{ 'aria-label': 'switch design' }}
                    onChange={() => handleSwitchChange(className as SwitchKeys)}
                  />
                </div>
              ))}
            </div>
            <div
              className="col2"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {['class_04', 'class_05', 'class_06'].map((className) => (
                <div
                  key={className}
                  className={className}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <p>Aula {className.split('class_')[1]}</p>
                  <SwitchFrequency
                    checked={switchStates[className as SwitchKeys]}
                    inputProps={{ 'aria-label': 'switch design' }}
                    onChange={() => handleSwitchChange(className as SwitchKeys)}
                  />
                </div>
              ))}
            </div>
            <div
              className="col3"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              {['class_07', 'class_08', 'class_09'].map((className) => (
                <div
                  key={className}
                  className={className}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <p>Aula {className.split('class_')[1]}</p>
                  <SwitchFrequency
                    checked={switchStates[className as SwitchKeys]}
                    inputProps={{ 'aria-label': 'switch design' }}
                    onChange={() => handleSwitchChange(className as SwitchKeys)}
                  />
                </div>
              ))}
            </div>
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
                  color: 'green',
                  textAlign: 'center',
                  minWidth: '145px',
                }}
                onClick={() => handleSubmit()}
              >
                Atualizar frequência
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    </div>
  );
}
