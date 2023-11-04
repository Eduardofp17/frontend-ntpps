import DenseHeader from '../../../components/headers/dense';
import {
  Main,
  MainText,
  Topic,
  SubTopic,
  TopicTitle,
  Text,
  SubTopicTitle,
} from './styled';
import { Divider } from '@mui/material';
import Footer from '../../../components/footer';

export function TermsOfService(): JSX.Element {
  return (
    <>
      <DenseHeader text="Termos de Serviço" />
      <Main>
        <MainText>TERMOS DE SERVIÇO DA PLATAFORMA NOURISHNET</MainText>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <Topic>
            <TopicTitle>
              {' '}
              1. Introdução <Divider />
            </TopicTitle>

            <Text>
              Bem-vindo aos Termos de Serviço da Plataforma Nourishnet
              (doravante referida como &quot;Plataforma&quot;, &quot;nós&quot;,
              &quot;nosso&quot; ou &quot;nos&quot;). Estes termos regem o uso
              dos serviços oferecidos por meio da plataforma, incluindo o site e
              todas as ferramentas disponibilizadas. Ao acessar ou utilizar a
              Plataforma, você (doravante referido como &quot;usuário&quot;,
              &quot;você&quot; ou &quot;seu&quot;) concorda em cumprir e ficar
              vinculado a estes Termos de Serviço. Se você não concordar com
              estes termos, por favor, não utilize a Plataforma.
            </Text>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              2. Uso da Plataforma <Divider />
            </TopicTitle>
            <SubTopic>
              <SubTopicTitle>2.1. Acesso e Conta de Usuário</SubTopicTitle>
              <Text>
                Você pode acessar a Plataforma após a criação de uma conta de
                usuário. Você é responsável por manter a confidencialidade de
                suas informações de conta, bem como por todas as atividades que
                ocorrerem em sua conta.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>2.2. Uso Adequado</SubTopicTitle>
              <Text>
                Você concorda em utilizar a Plataforma apenas para fins legais e
                de acordo com estes Termos de Serviço. Você não deve realizar
                qualquer ação que possa comprometer a segurança da Plataforma,
                interferir no seu funcionamento ou causar danos a outros
                usuários.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              3. Propriedade Intelectual <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>3.1. Direitos de Propriedade</SubTopicTitle>
              <Text>
                Todos os direitos de propriedade intelectual relacionados à
                Plataforma e ao seu conteúdo, incluindo mas não se limitando a
                textos, gráficos, imagens, logotipos, ícones e software, são de
                nossa propriedade ou licenciados para nós
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>3.2. Uso Restrito</SubTopicTitle>
              <Text>
                Você está autorizado a usar a Plataforma e seu conteúdo apenas
                conforme expressamente permitido por estes Termos. Qualquer uso
                não autorizado é estritamente proibido.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              4. Privacidade <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>4.1. Coleta de Dados</SubTopicTitle>
              <Text>
                Ao utilizar a Plataforma, você concorda com a coleta e
                processamento de dados conforme descrito em nossa Política de
                Privacidade.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>4.2. Dados do Usuário</SubTopicTitle>
              <Text>
                Você é responsável por fornecer informações precisas e
                atualizadas, incluindo sua Data de Nascimento e Sexo. Não nos
                responsabilizamos por quaisquer consequências decorrentes de
                informações de usuário incorretas ou desatualizadas.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              5. Responsabilidades e Limitações <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>5.1. Isenção de Garantias</SubTopicTitle>
              <Text>
                A Plataforma é fornecida &quot;no estado em que se
                encontra&quot;, sem garantias de qualquer tipo, expressas ou
                implícitas. Não garantimos a precisão, confiabilidade ou
                disponibilidade contínua da Plataforma
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>5.2. Limitações de Responsabilidade</SubTopicTitle>
              <Text>
                Em nenhuma circunstância seremos responsáveis por quaisquer
                danos diretos, indiretos, incidentais, especiais, consequenciais
                ou punitivos decorrentes do uso ou incapacidade de uso da
                Plataforma.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              6. Rescisão <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>6.1. Encerramento</SubTopicTitle>
              <Text>
                Reservamo-nos o direito de encerrar sua conta e acesso à
                Plataforma a qualquer momento, por qualquer motivo, com ou sem
                aviso prévio.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              7. Disposições Gerais
              <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>7.1. Alterações nos Termos</SubTopicTitle>
              <Text>
                Reservamo-nos o direito de modificar estes Termos de Serviço a
                qualquer momento. Quaisquer alterações entrarão em vigor após a
                publicação das versões atualizadas na Plataforma.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>7.2. Lei Aplicável</SubTopicTitle>
              <Text>
                Estes Termos de Serviço serão regidos pelas leis do país em que
                operamos, sem considerar conflitos de disposições legais. <br />{' '}
                <br /> Ao utilizar a Plataforma, você concorda com estes Termos
                de Serviço. Se tiver alguma dúvida ou preocupação, entre em
                contato conosco em{' '}
                <strong>naescolaalimentacao@gmail.com</strong>. Estes Termos
                foram atualizados pela última vez em 29 de outubro de 2023.
              </Text>
            </SubTopic>
          </Topic>
        </section>
      </Main>
      <Footer />
    </>
  );
}
