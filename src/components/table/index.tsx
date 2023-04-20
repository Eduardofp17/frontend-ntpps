import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import { primaryOrange } from '../../config/collors/colors';
import { Class } from '../../store/globalTypes';
import ModeIcon from '@mui/icons-material/Mode';
import CloseIcon from '@mui/icons-material/Close';
import ContainedButton from '../buttons/contained';
import OutlinedButton from '../buttons/outlined';

interface Props {
  ClassPayload: Class[];
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
  const [total, setTotal] = React.useState<number>(0);
  const [isAChange, setIsAChange] = React.useState<boolean>(false);
  const [classPayload, setClassPayload] = React.useState<Class[]>(
    props.ClassPayload,
  );
  React.useEffect(() => {
    let total = 0;
    classPayload.map((room) => {
      total += room.amount;
    });
    if (
      classPayload.find((e) => e.amount !== props.ClassPayload[e.id].amount)
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
        return { ...sala, amount: Number(amount) };
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
  return (
    <>
      <TableContainer
        component={Paper}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Table sx={{ minWidth: 300 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Salas</StyledTableCell>
              <StyledTableCell align="right">
                Quantidade de alunos
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classPayload.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
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
                    }}
                  >
                    <input
                      type="number"
                      value={row.amount}
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
                    align="right"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '15px',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {row.amount}{' '}
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
                minWidth: '271%',
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
          <ContainedButton textButton="Confirmar Mudanças" />
          <OutlinedButton textButton="Descartar Mudanças" />
        </div>
      </TableContainer>
    </>
  );
}
