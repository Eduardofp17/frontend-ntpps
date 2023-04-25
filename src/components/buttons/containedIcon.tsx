import React from 'react';
import Button from '@mui/material/Button';
import { primaryGreen } from '../../config/collors/colors';

interface Props {
  icon: JSX.Element;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  width?: string;
}
function ContainedIconButton(props: Props): JSX.Element {
  return (
    <Button
      type="submit"
      variant="contained"
      href={props.to}
      onClick={props.onClick}
      style={{
        borderRadius: 15,
        fontStyle: 'normal',
        fontWeight: 700,
        backgroundColor: primaryGreen,
        width: props.width ? props.width : '100%',
      }}
    >
      {props.icon}
    </Button>
  );
}

export default ContainedIconButton;
