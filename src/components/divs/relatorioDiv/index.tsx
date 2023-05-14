interface Props {
  data1: number;
  data2: number;
  data3: number;
}

function RelatorioDiv(props: Props): JSX.Element {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <h4 style={{ padding: '0px', margin: '0px', paddingTop: '10px' }}>
          Estatísticas de suas frequências:{' '}
        </h4>
        <div
          className="data"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0px',
            width: '100%',
            textAlign: 'left',
            justifyContent: 'flex-start',
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              textAlign: 'left',
              justifyContent: 'left',
              padding: '0px',
              gap: '5px',
            }}
          >
            <li
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: '90vw',
                borderBottom: '1px solid rgb(237 237 237)',
              }}
            >
              <p style={{ margin: '0px', fontWeight: 'normal' }}>
                Últimos 7 dias:{' '}
              </p>{' '}
              <p
                style={{
                  color: props.data1 < 0 ? 'rgb(243 2 2)' : 'rgb(35 171 74)',
                  fontWeight: 'bold',
                  margin: '0px',
                }}
              >
                {props.data1}%
              </p>{' '}
            </li>
            <li
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: '90vw',
                borderBottom: '1px solid rgb(237 237 237)',
              }}
            >
              <p style={{ margin: '0px', fontWeight: 'normal' }}>
                Últimos 30 dias:{' '}
              </p>{' '}
              <p
                style={{
                  color: props.data2 < 0 ? 'rgb(243 2 2)' : 'rgb(35 171 74)',
                  fontWeight: 'bold',
                  margin: '0px',
                }}
              >
                {props.data2}%
              </p>{' '}
            </li>
            <li
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                minWidth: '90vw',
                borderBottom: '1px solid rgb(237 237 237)',
              }}
            >
              <p style={{ margin: '0px', fontWeight: 'normal' }}>Neste ano: </p>{' '}
              <p
                style={{
                  color: props.data3 < 0 ? 'rgb(243 2 2)' : 'rgb(35 171 74)',
                  fontWeight: 'bold',
                  margin: '0px',
                }}
              >
                {props.data3}%
              </p>{' '}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default RelatorioDiv;
