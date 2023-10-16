import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Class } from '../../../store/globalTypes';
import { primaryOrange, primaryGreen } from '../../../config/collors/colors';
import { Mode, Close } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';
import ContainedButton from '../../buttons/contained';
import OutlinedButton from '../../buttons/outlined';
import Modal from '../../Modals/ModalButtons/index';
import ContainedFixedButton from '../../buttons/containedFixed';
import { Add } from '@mui/icons-material';
import ModalWithTwoInputs from '../../Modals/ModalWithInputs';
import { FormControl, TextField } from '@mui/material';
import axios from '../../../services/axios';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: primaryOrange,
    color: '#000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
type Props = {
  ClassPayload: Class[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TableSalas(props: Props) {
  const [classPayload, setClassPayload] = useState<Class[]>([]);
  const [isAChange, setIsAChange] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number>();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setClassPayload(props.ClassPayload);
      } catch (e) {
        //
      }
    })();
  }, [props.ClassPayload]);
  useEffect(() => {
    if (
      classPayload.find(
        (element, index) =>
          JSON.stringify(element.name) !==
          JSON.stringify(props.ClassPayload[index].name),
      )
    ) {
      setIsAChange(true);
    } else {
      setIsAChange(false);
    }
  }, [classPayload]);
  const alterSelectedInput = (id: number) => {
    const novaClassPayload = classPayload.map((sala) => {
      if (sala.id === id) {
        return { ...sala, selected: !sala.selected };
      }
      return sala;
    });

    setClassPayload(novaClassPayload);
  };

  const handleInput = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const room = e.target.value.toString();
    const novaClassPayload = classPayload.map((sala) => {
      if (sala.id === id) {
        return { ...sala, name: room };
      }
      return sala;
    });
    setClassPayload(novaClassPayload);
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleting(true);
  };

  const createRoom = async () => {
    try {
      props.setLoading(true);
      await axios.post('/room', { name: newRoom });
      setCreating(false);
      props.setLoading(false);
    } catch (e) {
      //
    }
  };

  const updateRoom = async () => {
    try {
      const differentElements = classPayload.filter(
        (element, index) =>
          JSON.stringify(element.name) !==
          JSON.stringify(props.ClassPayload[index]?.name),
      );
      differentElements.map(async (newRoom) => {
        props.setLoading(true);
        await axios.put(`/room/${newRoom.id}`, { name: newRoom.name }),
          props.setLoading(false);
      });
    } catch (e) {
      //
    }
  };

  const handleDeleteAction = async (id: number) => {
    try {
      props.setLoading(true);
      await axios.delete(`/room/${id}`);
      setDeleting(false);
      props.setLoading(false);
    } catch (e) {
      //
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const target = e.target as HTMLElement;
          if (!target.classList.contains('ModalCreating') && creating) {
            return setCreating(false);
          } else if (
            !target.classList.contains('ModalWithTwoButtons') &&
            deleting
          ) {
            return setDeleting(false);
          }
        }}
      >
        <ModalWithTwoInputs
          ModalOpen={creating}
          title="Insira as informações abaixo para criar uma nova sala: "
          input={
            <FormControl
              sx={{ m: 1, width: '95%' }}
              variant="standard"
              className="ModalCreating"
            >
              <TextField
                type="text"
                id="text-basic"
                label="Nome da sala"
                variant="outlined"
                onClick={(e) => e.stopPropagation()}
                value={newRoom}
                onChange={(e) => setNewRoom(String(e.target.value))}
              />
            </FormControl>
          }
          button1={
            <button
              className="ModalCreating"
              style={{
                background: 'none',
                color: primaryGreen,
                borderRadius: '5px ',
                border: `1px solid  ${primaryGreen}`,
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() => {
                setCreating(false);
                setNewRoom('');
              }}
            >
              Cancelar
            </button>
          }
          button2={
            <button
              className="ModalCreating"
              style={{
                backgroundColor: primaryGreen,
                color: '#fff',
                borderRadius: '5px ',
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() => createRoom()}
            >
              Criar Sala
            </button>
          }
        />
        <Modal
          ModalOpen={deleting}
          title={`Você realmente deseja deletar a sala "${
            deletingId !== undefined
              ? classPayload[Number(deletingId)].name
              : ''
          }" ?`}
          info={`Ao clicar em "Confirmar", todos os registros da sala, incluindo frequências e alunos, serão permanentemente excluídos.`}
          button1={
            <button
              className="ModalWithTwoButtons"
              style={{
                background: 'none',
                color: '#9D0000',
                borderRadius: '5px ',
                border: `1px solid  #9D0000`,
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() => {
                setDeleting(false);
              }}
            >
              Cancelar
            </button>
          }
          button2={
            <button
              className="ModalWithTwoButtons"
              style={{
                backgroundColor: '#9D0000',
                color: '#fff',
                borderRadius: '5px ',
                fontSize: '15px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
              onClick={() =>
                handleDeleteAction(Number(classPayload[Number(deletingId)].id))
              }
            >
              Confirmar
            </button>
          }
        />
        <Table sx={{ minWidth: 200 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                Salas(ordenadas por ordem cronológica)
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classPayload.map((room, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="left"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  {room.selected ? (
                    <div>
                      <span
                        className="selectInput"
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Close
                          style={{ fontSize: '25px', color: 'red' }}
                          onClick={() => alterSelectedInput(room.id)}
                        />
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => handleInput(room.id, e)}
                        />
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span
                        className="selectInput"
                        onClick={() => alterSelectedInput(room.id)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <Mode
                          style={{ fontSize: '19px', color: primaryOrange }}
                        />
                        {room.name}
                      </span>
                    </div>
                  )}
                  <Delete
                    style={{ color: '#9D0000' }}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <div
          className="buttons"
          style={{
            display: isAChange ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
          }}
        >
          <ContainedButton
            textButton="Confirmar Mudanças"
            onClick={updateRoom}
          />
          <OutlinedButton
            textButton="Descartar Mudanças"
            onClick={() => setClassPayload(props.ClassPayload)}
          />
        </div>
      </TableContainer>
      <ContainedFixedButton
        icon={<Add style={{ fontSize: '45px' }} />}
        onClick={() => {
          setCreating(true);
        }}
      />
    </>
  );
}
