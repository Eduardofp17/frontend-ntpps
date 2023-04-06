import React, { useEffect, useState } from 'react';
import { Details } from './styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { darkGreen } from '../../config/collors/colors';
import './Cardapio.css';
import { CardapioModel } from '../../store/globalTypes';

function Cardapio(props: CardapioModel): JSX.Element {
  const [snack, setSnack] = useState(false);
  const [lunch, setLunch] = useState(false);
  const [afternoonSnack, setAfternoonSnack] = useState(false);

  const getDay = new Date().getUTCDay();
  const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const fullHour = `${zeroLeft(new Date().getHours() % 60)}:${zeroLeft(
    new Date().getMinutes() % 60,
  )}`;
  useEffect(() => {
    if (fullHour >= '07:00' && fullHour <= '09:30') {
      setLunch(false);
      setAfternoonSnack(false);
      return setSnack(true);
    }
    if (fullHour >= '09:50' && fullHour <= '11:30') {
      setSnack(false);
      setAfternoonSnack(false);
      return setLunch(true);
    }
    if (fullHour >= '13:00' && fullHour <= '14:40') {
      setSnack(false);
      setLunch(false);
      return setAfternoonSnack(true);
    }
    setSnack(false);
    setLunch(false);
    setAfternoonSnack(false);
  }, []);

  return (
    <React.Fragment>
      <Details>
        <summary style={{ listStyle: 'none' }}>
          {props.dayname}
          {<ArrowForwardIosIcon sx={{ color: darkGreen }} className="row" />}
        </summary>
        <table>
          <tbody>
            <tr
              style={{
                backgroundColor:
                  props.position === getDay && snack ? '#b4f5c6' : '#fff',
              }}
            >
              <th>09:30</th>
              <td>{props.breakfast} </td>
            </tr>
            <tr
              style={{
                backgroundColor:
                  props.position === getDay && lunch ? '#b4f5c6' : '#fff',
              }}
            >
              <th>11:30</th>
              <td>{props.lunch} </td>
            </tr>
            <tr
              style={{
                backgroundColor:
                  props.position === getDay && afternoonSnack
                    ? '#b4f5c6'
                    : '#fff',
              }}
            >
              <th>14:40</th>
              <td>{props.afternoonsnack} </td>
            </tr>
          </tbody>
        </table>
      </Details>
    </React.Fragment>
  );
}

export default Cardapio;
