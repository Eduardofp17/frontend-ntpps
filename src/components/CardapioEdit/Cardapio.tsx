import React from 'react';
import { Details } from './styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { darkGreen } from '../../config/collors/colors';
import './Cardapio.css';
import { CardapioModel } from '../../store/globalTypes';
import ModeIcon from '@mui/icons-material/Mode';
import { primaryOrange } from '../../config/collors/colors';
import ContainedButton from '../buttons/contained';
import { States } from '../../store/globalTypes';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Skeleton from '@mui/material/Skeleton';
import Modal from '../Modals/ModalButtons/index';
import { useDispatch } from 'react-redux';
import { DeleteCardapioRequest } from '../../store/modules/DeleteCardapio';
import { UpdateCardapioRequest } from '../../store/modules/UpdateCardapio/index';

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
  const [openingDetails, setOpeningDetails] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);

  const token = useSelector((state: States): string => state.authReducer.token);
  const loadingState = useSelector(
    (state: States): boolean => state.updateCardapioReducer.loading,
  );

  const dispatch = useDispatch();
  const handleAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(DeleteCardapioRequest({ id: props.id, token }));
    setDeleting(false);
  };

  const getDay = new Date().getUTCDay();
  const fullHour = `${new Date().getHours()}:${new Date().getMinutes()}`;
  React.useEffect(() => {
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
    setLoading(loadingState);
  }, [loading, loadingState]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    dispatch(
      UpdateCardapioRequest({
        dayname: props.dayname,
        token,
        id: props.id,
        breakfast,
        lunch: lunchfoods,
        afternoonsnack: afterSnack,
      }),
    );
  };

  const handleDelete = async () => {
    setDeleting(true);
  };
  return (
    <React.Fragment>
      <Modal
        ModalOpen={deleting}
        title={`Você realmente deseja deletar o cardápio refente ao dia de ${props.dayname}?`}
        info={`Ao clicar em "Confirmar" você deletará o cardápio para sempre`}
        id={props.id}
        button1={
          <button
            style={{
              backgroundColor: darkGreen,
              color: '#fff',
              borderRadius: '5px ',
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={(e) => handleAction(e)}
          >
            Confirmar
          </button>
        }
        button2={
          <button
            style={{
              background: 'none',
              color: darkGreen,
              borderRadius: '5px ',
              border: `1px solid ${darkGreen}`,
              fontSize: '15px',
              fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
            onClick={() => setDeleting(false)}
          >
            Cancelar
          </button>
        }
      />
      <Details style={{ display: loading ? 'flex' : 'none' }}>
        <summary>
          <Skeleton sx={{ width: '100%' }} />
        </summary>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Details>
      <Details
        style={{
          display: loading ? 'none' : 'flex',
          backgroundColor: deleting ? '#FFF6F6' : '#FFFFFF',
        }}
        onToggle={() => setOpeningDetails(!openingDetails)}
      >
        <summary>
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {props.dayname}
              <ArrowForwardIosIcon
                sx={{
                  color: darkGreen,
                  marginRight: openingDetails ? '20px' : '',
                }}
                className="row"
              />
            </div>
            {openingDetails ? (
              <div onClick={() => handleDelete()} style={{ color: '#9D0000' }}>
                <DeleteIcon />
              </div>
            ) : (
              ''
            )}
          </div>
        </summary>
        <table>
          <tbody style={{ backgroundColor: deleting ? '#FFF6F6' : '#FFFFFF' }}>
            <tr
              style={{
                backgroundColor:
                  props.position === getDay && snack ? '#b4f5c6' : '',
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
                  props.position === getDay && lunch ? '#b4f5c6' : '',
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
                  props.position === getDay && afternoonSnack ? '#b4f5c6' : '',
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
