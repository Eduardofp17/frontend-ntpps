import { useEffect, useState } from 'react';
import DenseHeader from '../../../components/headers/dense';
import Graph1 from '../../../components/graphics/graph1';
import { Class } from '../../../store/globalTypes';
import axios from '../../../services/axios';
import GraphLine from '../../../components/graphics/graph1-line';

function HistoricoFrequencia(): JSX.Element {
  const [classApi, setClassApi] = useState<Class[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [latestHour, setLatestHour] = useState<string>('');
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/frequencia');
        const tempCategories: string[] = [];
        const tempData: number[] = [];
        data.map((room: Class) => {
          room.selected = false;
          tempCategories.push(room.sala);
          tempData.push(room.qtd_presentes);
          const date = new Date(room.updated_at);
          room.updated_at = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Sao_Paulo',
          }).format(date);
        });
        const sortedData: Class[] = data.sort((a: Class, b: Class) => {
          const dateA = new Date(a.updated_at);
          const dateB = new Date(b.updated_at);

          if (dateA > dateB) {
            return -1;
          } else if (dateA < dateB) {
            return 1;
          } else {
            return 0;
          }
        });
        setLatestHour(sortedData[0].updated_at);
        setCategories(tempCategories);
        setData(tempData);
        setClassApi(data);
      } catch (e) {
        //
      }
    })();
  }, []);
  return (
    <>
      <DenseHeader text="Histórico de frequências" />
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <h3>Aqui você terá acesso ao histórico de frequências de suas salas</h3>
        <Graph1
          CLass={classApi}
          categories={categories}
          data={data}
          title={`Últimas frequências: (Atualizado em: ${latestHour})`}
          name="Ultima frequência"
        />
        <GraphLine
          CLass={classApi}
          categories={categories}
          data={data}
          title={`Últimas frequências: (Médias mensais)`}
          name="Ultima frequência"
        />
      </main>
    </>
  );
}

export default HistoricoFrequencia;
