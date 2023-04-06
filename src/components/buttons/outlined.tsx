import React from 'react';
import Button from '@mui/material/Button';
import { primaryGreen } from '../../config/collors/colors';
interface Props {
  textButton: string;
  to?: string;
}
function OutlinedButton(props: Props): JSX.Element {
  return (
    <Button
      variant="outlined"
      href={props.to}
      style={{
        borderRadius: 15,
        color: primaryGreen,
        fontStyle: 'normal',
        fontWeight: 700,
        borderColor: primaryGreen,
        width: '100%',
      }}
    >
      {props.textButton}
    </Button>
  );
}

export default OutlinedButton;
