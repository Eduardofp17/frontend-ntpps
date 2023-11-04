import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Divider, Backdrop, CircularProgress } from '@mui/material';
import { StepperComponent } from '../../steppers/stepper-form-instituition/stepper';
import { AccountInstituitionInfo } from './account-info-form/account';
import { InstituitionDataInfo } from './instituition-data-form/instituition';
import { LocalizationInfo } from './localization-form/localization';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { RegisterInstituitionRequest } from '../../../store/modules/register-instituition/index';
import { toast, ToastContainer } from 'react-toastify';
import { RegisterErrorResponses } from '../../../translate/register-translations/register-errors';

export type AccountInfo = {
  email: string;
  password: string;
  agreeWithTermsAndPrivacyPolicy: boolean;
};

export type InstituitionData = {
  instituition_name: string;
  school_modality: string;
  cnpj: string;
  forms_of_education: string[];
  isPublic: boolean;
};

export type LocalizationData = {
  cep: string;
  state: string;
  city: string;
  address: string;
  neighborhood: string;
};
function RegisterForm(): JSX.Element {
  const dispatch = useDispatch();
  const [currentStepper, setCurrentStepper] = useState<number>(0);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const loadingState = useSelector(
    (state: States): boolean => state.registerInstituitionReducer.loading,
  );
  const errorState = useSelector(
    (state: States): boolean => state.registerInstituitionReducer.error,
  );
  const errorMessage = useSelector(
    (state: States): string => state.registerInstituitionReducer.errorMessage,
  );
  const handleNext = (): void => {
    setLoadingForm(true);
    setTimeout(() => {
      setCurrentStepper(currentStepper + 1);
      setLoadingForm(false);
    }, 300);
  };
  const handleLast = (): void => {
    setLoadingForm(true);
    setCurrentStepper(currentStepper - 1);
    setTimeout(() => {
      setCurrentStepper(currentStepper - 1);
      setLoadingForm(false);
    }, 150);
  };

  const [instituitionData, setInstituitionData] = useState<InstituitionData>({
    instituition_name: '',
    school_modality: 'regular',
    cnpj: '',
    forms_of_education: [],
    isPublic: true,
  });
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    email: '',
    password: '',
    agreeWithTermsAndPrivacyPolicy: false,
  });
  const [localizationInfo, setLocalizationInfo] = useState<LocalizationData>({
    cep: '',
    city: '',
    state: '',
    neighborhood: '',
    address: '',
  });
  const handleSubmit = async () => {
    try {
      dispatch(
        RegisterInstituitionRequest({
          name: instituitionData.instituition_name,
          school_modality: instituitionData.school_modality,
          cnpj: instituitionData.cnpj,
          forms_of_education: String(instituitionData.forms_of_education),
          isPublic: instituitionData.isPublic,
          email: accountInfo.email,
          password: accountInfo.password,
          agreeWithTermsAndPrivacyPolicy:
            accountInfo.agreeWithTermsAndPrivacyPolicy,
          address: localizationInfo.address,
          city: localizationInfo.city,
          state: localizationInfo.state,
          cep: localizationInfo.cep,
          neighborhood: localizationInfo.neighborhood,
        }),
      );
    } catch (e) {
      toast.error(String('internal Server Error'), {
        toastId: 'unique-toast-id',
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'light',
        bodyStyle: { width: '90%', maxWidth: '320px', margin: 'auto' },
      });
    }
  };

  useEffect(() => {
    console.log(errorState);
    if (errorState) {
      if (String(errorMessage) in RegisterErrorResponses) {
        const translatedErrorMessage = RegisterErrorResponses[errorMessage];
        toast.error(String(translatedErrorMessage), {
          toastId: 'unique-toast-id',
        });
      } else {
        toast.error('INTERNAL SERVER ERROR', {
          toastId: 'unique-toast-id',
        });
      }
    }
  }, [errorState]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: '90%', maxWidth: '320px', margin: 'auto' }}
      />
      <Paper
        key={1}
        elevation={1}
        sx={{
          padding: '10px 10px',
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '100%',
        }}
      >
        <h3>Criar conta da instituição</h3>
        <StepperComponent activeStep={currentStepper} />
        <Divider sx={{ width: '100%', margin: 'auto' }} />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingForm || loadingState ? true : false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {currentStepper === 0 && (
          <InstituitionDataInfo
            onInstituitionDataInfoChange={setInstituitionData}
            onNext={handleNext}
            instituitionDataInfo={instituitionData}
          />
        )}
        {currentStepper === 1 && (
          <AccountInstituitionInfo
            onAccountInfoChange={setAccountInfo}
            onNext={handleNext}
            accountInfo={accountInfo}
            onLast={handleLast}
          />
        )}
        {currentStepper === 2 && (
          <LocalizationInfo
            onLocalizationInfoChange={setLocalizationInfo}
            onSubmit={handleSubmit}
            localizationInfo={localizationInfo}
            onLast={handleLast}
          />
        )}
      </Paper>
    </>
  );
}

export default RegisterForm;
