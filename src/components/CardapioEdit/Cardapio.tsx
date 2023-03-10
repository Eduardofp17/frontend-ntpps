import React, { useEffect } from 'react';
import { Details } from './styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { darkGreen } from '../../config/collors/colors';
import './Cardapio.css';
import { CardapioModel } from '../../store/globalTypes';
import ModeIcon from '@mui/icons-material/Mode';
import { primaryOrange } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import axios from '../../services/axios';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';

function CardapioEdit(props: CardapioModel): JSX.Element {
  const [snack, setSnack] = React.useState<boolean>(false);
  const [lunch, setLunch] = React.useState<boolean>(false);
  const [afternoonSnack, setAfternoonSnack] = React.useState<boolean>(false);
  const [editingBreakfast, setEditingBreakFast] =
    React.useState<boolean>(false);
  const [editingLunch, setEditingLunch] = React.useState<boolean>(false);
  const [editingAfternoonSnack, setEditingAfternoonSnack] =
    React.useState<boolean>(false);
  const [breakfast, setBreakfast] = React.useState<string | undefined>(
    props.breakfast,
  );
  const [lunchfoods, setLunchFoods] = React.useState<string | undefined>(
    props.lunch,
  );
  const [afterSnack, setAfterSnack] = React.useState<string | undefined>(
    props.afternoonsnack,
  );

  const [loading, setLoading] = React.useState<boolean>(false);
  const getDay = new Date().getUTCDay();
  const token = useSelector((state: States): string => state.authReducer.token);
  const fullHour = `${new Date().getHours()}:${new Date().getMinutes()}`;
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

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (editingBreakfast) {
      setEditingBreakFast(false);
    }
    if (editingLunch) {
      setEditingLunch(false);
    }
    if (editingAfternoonSnack) {
      setEditingAfternoonSnack(false);
    }
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    setLoading(true);
    try {
      await axios.put(`/cardapio/${props.id}`, {
        breakfast,
        lunch: lunchfoods,
        afternoonnsnack: afterSnack,
      });
      location.reload();
      setLoading(false);
    } catch (e) {
      const err = e as AxiosError;
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Details style={{ display: loading ? 'flex' : 'none' }}>
        <summary>
          <Skeleton sx={{ width: '100%' }} />
        </summary>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Details>
      <Details style={{ display: loading ? 'none' : 'flex' }}>
        <summary>
          <DeleteIcon />
          <div>
            {props.dayname}
            {<ArrowForwardIosIcon sx={{ color: darkGreen }} className="row" />}
          </div>
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
              <td>
                {editingBreakfast ? (
                  <input
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.value)}
                  />
                ) : (
                  props.breakfast
                )}
              </td>
              <td onClick={() => setEditingBreakFast(!editingBreakfast)}>
                <ModeIcon style={{ fontSize: '19px', color: primaryOrange }} />{' '}
              </td>
            </tr>
            <tr
              style={{
                backgroundColor:
                  props.position === getDay && lunch ? '#b4f5c6' : '#fff',
              }}
            >
              <th>11:30</th>
              <td>
                {editingLunch ? (
                  <input
                    value={lunchfoods}
                    onChange={(e) => setLunchFoods(e.target.value)}
                  />
                ) : (
                  props.lunch
                )}
              </td>
              <td onClick={() => setEditingLunch(!editingLunch)}>
                <ModeIcon style={{ fontSize: '19px', color: primaryOrange }} />{' '}
              </td>
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
              <td>
                {editingAfternoonSnack ? (
                  <input
                    value={afterSnack}
                    onChange={(e) => setAfterSnack(e.target.value)}
                  />
                ) : (
                  props.afternoonsnack
                )}
              </td>
              <td
                onClick={() => setEditingAfternoonSnack(!editingAfternoonSnack)}
              >
                <ModeIcon style={{ fontSize: '19px', color: primaryOrange }} />{' '}
              </td>
            </tr>
          </tbody>
        </table>
        {editingBreakfast || editingLunch || editingAfternoonSnack ? (
          <ContainedButton
            textButton="Salvar mudanças"
            onClick={(e) => handleClick(e)}
          />
        ) : (
          ''
        )}
      </Details>
    </React.Fragment>
  );
}

export default CardapioEdit;
