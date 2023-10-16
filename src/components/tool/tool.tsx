import React from 'react';
import { Card, Icon } from './styled';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { darkGreen } from '../../config/collors/colors';
interface Props {
  icon?: JSX.Element;
  text: string;
  to: string;
  level: number;
  levelRequired: number;
  iconSVG?: string;
  equals?: boolean;
}
function Tool(props: Props): JSX.Element {
  return (
    <React.Fragment>
      <Card
        style={{
          display: props.equals
            ? props.level == props.levelRequired
              ? 'flex'
              : 'none'
            : props.level >= props.levelRequired
            ? 'flex'
            : 'none',
        }}
      >
        {props.icon ? (
          <Icon>{props.icon}</Icon>
        ) : (
          <img src={props.iconSVG} alt="" width={50} height={50} />
        )}

        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          href={props.to}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '15px',
            height: '20px',
            paddingLeft: '15px',
          }}
        >
          <p style={{ color: '#000', fontWeight: 'bold' }}>{props.text}</p>
          <ArrowForwardIosIcon
            style={{ color: darkGreen, fontWeight: 'bold' }}
          />
        </IconButton>
      </Card>
    </React.Fragment>
  );
}

export default Tool;
