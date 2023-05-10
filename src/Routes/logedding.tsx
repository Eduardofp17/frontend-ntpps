import Erro404 from '../pages/Erro 404/404';
import Erro401 from '../pages/Erro 401/401';
import { useSelector } from 'react-redux';
import { States } from '../store/globalTypes';

interface Props {
  children: JSX.Element;
  footer: JSX.Element;
  loggedin: boolean;
  levelRequired: number;
}

function Loggeding(props: Props) {
  const userLevel = useSelector(
    (state: States): number => state.authReducer.level,
  );

  if (!props.loggedin) {
    return <Erro404 />;
  }

  if (Number(userLevel) < Number(props.levelRequired)) {
    return <Erro401 />;
  }

  return (
    <>
      {props.children}
      {props.footer}
    </>
  );
}

export default Loggeding;
