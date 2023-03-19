import styled from 'styled-components';
import { darkGreen } from '../../config/collors/colors';
interface Props {
  readonly level: number;
  readonly levelRequired: number;
}
export const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(11, 11, 11, 0.1);
  border-radius: 12px;
  padding: 10px;
  text-align: left;
  display: ${(props: Props) =>
    props.level < props.levelRequired ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: space-between;
  max-height: 120px;
  gap: 10px;
`;
export const Icon = styled.div`
  svg {
    font-size: 50px;
    color: ${darkGreen};
  }
`;
