import Chart from 'react-apexcharts';
import { Class } from '../../../store/globalTypes';

interface Props {
  title: string;
  categories: string[];
  data: number[];
  name: string;
  CLass: Class[];
}

function GraphLine(props: Props): JSX.Element {
  const { title, categories, data, name, CLass } = props;
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const series = [
    {
      name: 'Sala 01',
      data: [37, 23, 29, 45],
    },
    {
      name: 'Sala 02',
      data: [27, 33, 9, 15],
    },
    {
      name: 'Sala 03',
      data: [7, 3, 29, 14],
    },
    {
      name: 'Sala 04',
      data: [17, 33, 29, 43],
    },
  ];

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: months,
      title: {
        text: 'Mês',
      },
    },
    yaxis: {
      title: {
        text: 'Médias mensais',
      },
    },
  };

  return (
    <>
      <div className="graph-line" style={{ maxWidth: '900px' }}>
        <p
          style={{
            textAlign: 'left',
            width: '90%',
            padding: '0px 20px',
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '0px',
          }}
        >
          {title}
        </p>
        <Chart options={options} series={series} type="line" width="100%" />
      </div>
    </>
  );
}

export default GraphLine;
