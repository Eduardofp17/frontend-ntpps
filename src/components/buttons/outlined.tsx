import React from 'react';
import Button from '@mui/material/Button';
import { primaryGreen } from '../../config/collors/colors';
interface Props {
  textButton: string;
  to?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function OutlinedButton(props: Props): JSX.Element {
  return (
    <Button
      variant="outlined"
      href={props.to}
      onClick={props.onClick}
      style={{
        borderRadius: 15,
        color: primaryGreen,
        fontStyle: 'normal',
        fontWeight: 700,
        borderColor: primaryGreen,
        width: props.width ? props.width : '100%',
      }}
    >
      {props.textButton}
    </Button>
  );
}

export default OutlinedButton;
