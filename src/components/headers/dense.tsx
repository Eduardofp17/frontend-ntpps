import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { primaryGreen } from '../../config/collors/colors';
interface Props {
  to: string;
  text: string;
}
function DenseHeader(props: Props): JSX.Element {
  return (
    <React.Fragment>
      <header>
        <Box>
          <AppBar position="static" style={{ backgroundColor: primaryGreen }}>
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                href={props.to}
                style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}
              >
                <ArrowBackOutlinedIcon />
                <Typography variant="h6" color="inherit" component="div">
                  {props.text}
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </React.Fragment>
  );
}

export default DenseHeader;
