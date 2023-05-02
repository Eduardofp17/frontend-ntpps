import React from 'react';

function Footer(): JSX.Element {
  const [year, setYear] = React.useState<number>();

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <React.Fragment>
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 10px',
          width: '100%',
          lineHeight: '0px',
          opacity: '0.9',
          maxWidth: '400px',
          margin: 'auto',
        }}
      >
        <p style={{ textAlign: 'center', fontSize: '13px' }}>
          {' '}
          Nourishnet &copy; 2023-{year}. All rights reserved.
        </p>
        <p style={{ textAlign: 'right', opacity: '0.7', fontSize: '12px' }}>
          v1.0.0-beta
        </p>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
