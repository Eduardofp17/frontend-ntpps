import React from 'react';
import Button from '@mui/material/Button';
import { primaryGreen } from '../../config/collors/colors';

interface Props {
  textButton: string;
  to?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
function ContainedButton(props: Props): JSX.Element {
  return (
    <Button
      variant="contained"
      href={props.to}
      onClick={props.onClick}
      style={{
        borderRadius: 15,
        fontStyle: 'normal',
        fontWeight: 700,
        backgroundColor: primaryGreen,
        width: '100%',
      }}
    >
      {props.textButton}
    </Button>
  );
}

export default ContainedButton;
