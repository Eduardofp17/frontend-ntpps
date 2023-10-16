import Chart from 'react-apexcharts';
import { Room } from '../../../store/globalTypes';

interface Props {
  title: string;
  categories: string[];
  data: number[];
  name: string;
  CLass: Room[];
}

function Graph1(props: Props): JSX.Element {
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: props.categories,
    },
  };
  const series = [
    {
      name: props.name,
      data: props.data,
    },
  ];
  return (
    <>
      <div className="graph1" style={{ maxWidth: '600px' }}>
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
          {props.title}
        </p>
        <Chart options={options} series={series} type="bar" width="95%" />
      </div>
    </>
  );
}

export default Graph1;
