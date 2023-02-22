import React from 'react';
interface Props {
  children: JSX.Element;
  loggedin: boolean;
}
function Loggeding(props: Props) {
  if (props.loggedin) {
    return <h1>Logado</h1>;
  }
  return props.children;
}
export default Loggeding;
