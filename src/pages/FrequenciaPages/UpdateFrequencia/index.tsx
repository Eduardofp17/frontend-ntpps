import React from 'react';
import DenseHeader from '../../../components/headers/dense';
import { Main } from './styled';
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

function createData(room: string, amount: number) {
  return { room, amount };
}

const rows = [
  createData('Sala 01', 15),
  createData('Sala 02', 37),
  createData('Sala 03', 26),
  createData('Sala 04', 30),
  createData('Sala 05', 35),
];

function AtualizarFrequencia(): JSX.Element {
  return (
    <React.Fragment>
      <DenseHeader text="Atualizar frequência" />

      <Main>
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
              {rows.map((row) => (
                <StyledTableRow key={row.room}>
                  <StyledTableCell component="th" scope="row">
                    {row.room}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
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
                <td style={{ paddingRight: '4px' }}>177</td>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Main>
    </React.Fragment>
  );
}

export default AtualizarFrequencia;
