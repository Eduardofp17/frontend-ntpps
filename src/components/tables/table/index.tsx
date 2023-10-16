import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import { primaryOrange } from '../../../config/collors/colors';
import { Room as Class } from '../../../store/globalTypes';
import ModeIcon from '@mui/icons-material/Mode';
import CloseIcon from '@mui/icons-material/Close';
import ContainedButton from '../../buttons/contained';
import OutlinedButton from '../../buttons/outlined';
import axios from '../../../services/axios';
interface Props {
  ClassPayload: Class[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: primaryOrange,
    color: '#000',
    fontWeight: 'bold',
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

export default function TableComponent(props: Props): JSX.Element {
  const [total, setTotal] = useState<number>(0);
  const [isAChange, setIsAChange] = useState<boolean>(false);
  const [classPayload, setClassPayload] = useState<Class[]>([]);

  useEffect(() => {
    (async () => {
      try {
        props.setLoading(true);
        setClassPayload(props.ClassPayload);
        props.setLoading(false);
      } catch (e) {
        console.log('error: ');
      }
    })();
  }, [props.ClassPayload]);
  useEffect(() => {
    let total = 0;
    classPayload.map((room) => {
      total += room?.qtd_presentes;
    });
    if (
      classPayload.find(
        (element, index) =>
          Number(element.qtd_presentes) !==
          Number(props.ClassPayload[index].qtd_presentes),
      )
    ) {
      setIsAChange(true);
    } else {
      setIsAChange(false);
    }
    setTotal(total);
  }, [classPayload]);

  const alterClassAmount = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = e.target.value.toString().replace(/^0+/, '');
    const novaClassPayload = classPayload.map((sala) => {
      if (sala.id === id) {
        return {
          ...sala,
          qtd_presentes: Number(amount) > 50 ? 50 : Number(amount),
        };
      }
      return sala;
    });

    setClassPayload(novaClassPayload);
  };

  const alterSelectedInput = (id: number) => {
    const novaClassPayload = classPayload.map((sala) => {
      if (sala.id === id) {
        return { ...sala, selected: !sala.selected };
      }
      return sala;
    });

    setClassPayload(novaClassPayload);
  };
  const updateRoom = () => {
    const differentElements = classPayload.filter(
      (element, index) =>
        Number(element.qtd_presentes) !==
        Number(props.ClassPayload[index]?.qtd_presentes),
    );

    differentElements.map(async (element) => {
      try {
        props.setLoading(true);
        await axios.put(`/frequencia/${element.id}`, {
          qtd_presentes: element.qtd_presentes,
        });
        props.setLoading(false);
      } catch (e) {
        props.setLoading(false);
        //
      }
    });
  };
  return (
    <>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ width: 'auto', overflowX: 'hidden' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Salas</StyledTableCell>
              <StyledTableCell align="center">Atualizado em:</StyledTableCell>

              <StyledTableCell align="right">
                Quantidade de alunos
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classPayload.map((row) => (
              <StyledTableRow key={row.sala} style={{ border: 'none' }}>
                <StyledTableCell component="th" scope="row">
                  {row.sala}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {' '}
                  {row.updated_at}{' '}
                </StyledTableCell>
                {row.selected ? (
                  <StyledTableCell
                    align="right"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '15px',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      border: 'none',
                    }}
                  >
                    <input
                      type="number"
                      value={row.qtd_presentes}
                      style={{ textAlign: 'center', maxWidth: '50px' }}
                      onChange={(e) => alterClassAmount(row.id, e)}
                    />
                    <span
                      className="selectInput"
                      onClick={() => alterSelectedInput(row.id)}
                    >
                      {row.selected ? (
                        <CloseIcon style={{ fontSize: '25px', color: 'red' }} />
                      ) : (
                        <ModeIcon
                          style={{ fontSize: '19px', color: primaryOrange }}
                        />
                      )}
                    </span>
                  </StyledTableCell>
                ) : (
                  <StyledTableCell
                    align="center"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '15px',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      border: 'none',
                    }}
                  >
                    {row.qtd_presentes}{' '}
                    <span
                      className="selectInput"
                      onClick={() => alterSelectedInput(row.id)}
                    >
                      {' '}
                      {row.selected ? (
                        <CloseIcon style={{ fontSize: '25px', color: 'red' }} />
                      ) : (
                        <ModeIcon
                          style={{ fontSize: '19px', color: primaryOrange }}
                        />
                      )}
                    </span>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow
              style={{
                display: 'flex',
                fontSize: '16px',
                padding: '10px',
                justifyContent: 'space-between',
                minWidth: '320%',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              <td style={{ paddingLeft: '9px' }}>Total</td>

              <td style={{ paddingRight: '4px' }}>{total}</td>
            </TableRow>
          </TableFooter>
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
    </>
  );
}
