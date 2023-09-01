import React from 'react';

function Footer(): JSX.Element {
  const [year, setYear] = React.useState<number>();

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 10px',
        width: '100%',
        lineHeight: '0px',
        opacity: '0.9',
      }}
    >
      <div style={{ flex: 1 }}></div> {/* Pushes the footer to the bottom */}
      <p style={{ textAlign: 'center', fontSize: '13px' }}>
        Nourishnet &copy; 2023-{year}. All rights reserved.
      </p>
      <p style={{ textAlign: 'center', opacity: '0.7', fontSize: '12px' }}>
        v1.0.0-beta
      </p>
    </footer>
  );
}

export default Footer;
