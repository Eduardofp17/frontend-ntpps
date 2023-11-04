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

export function PrivacyPolicy(): JSX.Element {
  return (
    <>
      <DenseHeader text="Política de Privacidade" />
      <Main>
        <MainText>POLÍTICA DE PRIVACIDADE DA PLATAFORMA NOURISHNET</MainText>
        <section
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <Topic>
            <TopicTitle>
              {' '}
              1. Introdução <Divider />
            </TopicTitle>

            <Text>
              Bem-vindo à Política de Privacidade da Plataforma Nourishnet
              (doravante referida como &quot;Plataforma&quot;, &quot;nós&quot;,
              &quot;nosso&quot; ou &quot;nos&quot;). Esta política descreve como
              coletamos, usamos, compartilhamos e protegemos suas informações
              quando você utiliza a Plataforma. Ao acessar ou utilizar a
              Plataforma, você concorda com as práticas descritas nesta
              política. Se você não concordar com estas práticas, por favor, não
              utilize a Plataforma.
            </Text>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              2. Informaçãoes Coletadas <Divider />
            </TopicTitle>
            <SubTopic>
              <SubTopicTitle>2.1. Informações de Registro</SubTopicTitle>
              <Text>
                Para utilizar a Plataforma, você precisará criar uma conta de
                usuário. Coletamos informações de registro, como nome, endereço
                de e-mail e informações de contato, para criar e gerenciar sua
                conta.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>2.2. Uso da Plataforma</SubTopicTitle>
              <Text>
                Coletamos informações sobre como você interage com a Plataforma,
                incluindo a visualização de cardápios, feedback, frequência de
                uso e geração de receitas. Isso nos ajuda a melhorar nossos
                serviços e personalizar sua experiência.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>2.3. Dados de Alimentação</SubTopicTitle>
              <Text>
                Quando você fornece informações sobre cardápios, quantidade de
                pessoas, preferências alimentares e frequência de alunos,
                coletamos esses dados para fornecer as funcionalidades da
                Plataforma.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              3. Uso das Informações <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>3.1. Fornecimento de Serviços</SubTopicTitle>
              <Text>
                Utilizamos suas informações para fornecer os serviços da
                Plataforma, incluindo a exibição de cardápios, feedback, geração
                de receitas e análise de frequência.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>3.2. Melhoria da Plataforma</SubTopicTitle>
              <Text>
                Usamos as informações coletadas para melhorar nossos serviços,
                adaptando-os às necessidades dos usuários e aprimorando a
                funcionalidade da Plataforma.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>3.3. Comunicações</SubTopicTitle>
              <Text>
                Podemos entrar em contato com você para fornecer atualizações
                sobre a Plataforma, enviar notificações relevantes ou responder
                às suas solicitações.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              4. Compartilhamento de Informações <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>4.1. Parceiros e Fornecedores</SubTopicTitle>
              <Text>
                Podemos compartilhar suas informações com parceiros e
                fornecedores que nos ajudam a operar a Plataforma e a fornecer
                os serviços solicitados por você.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>4.2. Análise de Dados</SubTopicTitle>
              <Text>
                Podemos compartilhar dados agregados e não identificáveis
                pessoalmente para fins de análise e pesquisa.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>4.3. Requisitos Legais</SubTopicTitle>
              <Text>
                Em casos exigidos por lei, podemos compartilhar suas informações
                para cumprir com obrigações legais ou responder a processos
                judiciais.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              5. Segurança das Informações <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>5.1. Medidas de Segurança</SubTopicTitle>
              <Text>
                Implementamos medidas de segurança para proteger suas
                informações contra acesso não autorizado, alteração, divulgação
                ou destruição.
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
              6. Seus Direitos <Divider />
            </TopicTitle>

            <SubTopic>
              <SubTopicTitle>6.1. Acesso e Atualização</SubTopicTitle>
              <Text>
                Você pode acessar e atualizar suas informações de conta a
                qualquer momento.
              </Text>
            </SubTopic>
            <SubTopic>
              <SubTopicTitle>6.2. Exclusão de Conta</SubTopicTitle>
              <Text>
                Se desejar encerrar sua conta, entre em contato conosco através
                do endereço de e-mail fornecido abaixo.
              </Text>
            </SubTopic>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              7. Contato
              <Divider />
            </TopicTitle>

            <Text>
              Se tiver alguma dúvida sobre esta Política de Privacidade ou
              desejar exercer seus direitos de privacidade, entre em contato
              conosco em <strong>naescolaalimentacao@gmail.com</strong>.
            </Text>
          </Topic>
          <Topic>
            <TopicTitle>
              {' '}
              8. Alteração na Política
              <Divider />
            </TopicTitle>

            <Text>
              Reservamo-nos o direito de modificar esta Política de Privacidade
              a qualquer momento. Quaisquer alterações entrarão em vigor após a
              publicação das versões atualizadas na Plataforma. Esta Política de
              Privacidade foi atualizada pela última vez em 29 de outubro de
              2023.
            </Text>
          </Topic>
        </section>
      </Main>
      <Footer />
    </>
  );
}
