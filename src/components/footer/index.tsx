import React from 'react';

function Footer(): JSX.Element {
  return (
    <React.Fragment>
      <footer
        style={{ position: 'absolute', right: 0, bottom: 0, padding: '10px' }}
      >
        <p style={{ textAlign: 'right', opacity: '0.7' }}>1.0.0-beta</p>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
