import React from 'react';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { primaryGreen } from '../../config/collors/colors';
interface Props {
  to: string;
}
function BasicHeader(props: Props): JSX.Element {
  return (
    <React.Fragment>
      <header>
        <Box>
          <AppBar
            position="static"
            style={{ backgroundColor: primaryGreen, padding: '5px' }}
          >
            <Toolbar
              variant="dense"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <img src="/images/logoFigueiredo.png" alt="Logo da instituição" />
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                href={props.to}
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
      </header>
    </React.Fragment>
  );
}

export default BasicHeader;
