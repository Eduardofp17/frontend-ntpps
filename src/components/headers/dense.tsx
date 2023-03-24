import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { primaryGreen } from '../../config/collors/colors';
import ConfigComponent from '../Configuracao/config';
import { useNavigate } from 'react-router-dom';
interface Props {
  text: string;
  icon?: JSX.Element;
  to?: string;
}
function DenseHeader(props: Props): JSX.Element {
  const [openConfig, setOpenConfig] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpenConfig(!openConfig);
  };
  return (
    <React.Fragment>
      <header>
        <Box>
          <AppBar position="static" style={{ backgroundColor: primaryGreen }}>
            <Toolbar
              variant="dense"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => (props.to ? navigate(props.to) : navigate(-1))}
                style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
              >
                <ArrowBackOutlinedIcon />
                <Typography variant="h6" color="inherit" component="div">
                  {props.text}
                </Typography>
              </IconButton>
              <div style={{ marginTop: '5px' }} onClick={() => handleOpen()}>
                {' '}
                {props.icon}
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
      {openConfig ? <ConfigComponent /> : ''}
    </React.Fragment>
  );
}

export default DenseHeader;
