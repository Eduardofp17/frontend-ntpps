import React from 'react';
import Button from '@mui/material/Button';
import { primaryGreen } from '../../config/collors/colors';

interface Props {
  textButton?: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
}
function ContainedFixedButton(props: Props): JSX.Element {
  return (
    <Button
      variant="contained"
      href={props.to}
      onClick={props.onClick}
      style={{
        borderRadius: 50,
        fontStyle: 'normal',
        fontWeight: 700,
        padding: '0px 5px',
        backgroundColor: primaryGreen,
        width: '60px',
        height: '60px',
        position: 'fixed',
        right: 5,
        bottom: 15,
        zIndex: 3,
      }}
    >
      {props.icon}
      {props.textButton}
    </Button>
  );
}

export default ContainedFixedButton;
