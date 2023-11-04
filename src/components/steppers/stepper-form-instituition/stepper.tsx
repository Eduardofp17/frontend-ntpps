import { Lock } from '@phosphor-icons/react';
import { BsBuilding } from 'react-icons/bs';
import { TbMap2 } from 'react-icons/tb';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import { primaryGreen } from '../../../config/collors/colors';
import Done from '@mui/icons-material/Done';

type Props = {
  activeStep: number;
};

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ ownerState }) => ({
  zIndex: 1,
  color: 'gray',
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#000',
  }),
  ...(ownerState.completed && {
    color: primaryGreen,
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <BsBuilding size={25} />,
    2: <Lock size={25} />,
    3: <TbMap2 size={25} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <Done /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Dados da instituição', 'Informações da Conta', 'Localização'];

export function StepperComponent(props: Props): JSX.Element {
  return (
    <Stack sx={{ width: '100%', fontSize: '0.675rem' }} spacing={4}>
      <Stepper alternativeLabel activeStep={props.activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {' '}
              <span style={{ fontSize: '0.8rem' }}>{label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
