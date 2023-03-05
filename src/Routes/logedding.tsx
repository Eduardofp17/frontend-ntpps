import React from 'react';
import Erro404 from '../pages/Erro 404/404';
interface Props {
  children: JSX.Element;
  loggedin: boolean;
}
function Loggeding(props: Props) {
  if (props.loggedin) {
    return props.children;
  }
  return <Erro404 />;
}
export default Loggeding;
