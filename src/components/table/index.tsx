import React from 'react';
import { useSelector } from 'react-redux';
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
import { States } from '../../store/globalTypes';
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
  const levelState = useSelector(
    (state: States): number => state.authReducer.level,
  );
  React.useEffect(() => {
    let total = 0;
    props.ClassPayload.map((room) => {
      total += room.amount;
    });
    setTotal(total);
  }, []);

  const alterClassAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <>
      <TableContainer component={Paper}>
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
            {props.ClassPayload.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                {levelState > 1 ? (
                  <StyledTableCell align="right">
                    <input
                      type="number"
                      value={row.amount}
                      style={{ textAlign: 'center' }}
                      onChange={(e) => alterClassAmount(e)}
                    />
                  </StyledTableCell>
                ) : (
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
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
      </TableContainer>
    </>
  );
}
