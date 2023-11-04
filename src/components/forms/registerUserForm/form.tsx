import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RegisterUserRequest } from '../../../store/modules/register-user/index';
import { StepperComponent } from '../../steppers/stepper-form-user/stepper';
import { Paper } from '@mui/material';
import { Divider } from '@mui/material';
import { PersonalUserInfo } from './personal-info-form/personal';
import { AccountUserInfo } from './account-info-form/account';
import { Backdrop, CircularProgress } from '@mui/material';
import { InstituitionInfo } from './instituition-info-form/instituition';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { States } from '../../../store/globalTypes';
import { RegisterErrorResponses } from '../../../translate/register-translations/register-errors';

export type PersonalInfo = {
  name: string;
  lastname: string;
  isMale: boolean;
  birthday: string;
};

export type AccountInfo = {
  email: string;
  password: string;
  agreeWithTermsAndPrivacyPolicy: boolean;
};
export type InstituitionInfo = {
  code: string;
};

function UserForm(): JSX.Element {
  const [currentStepper, setCurrentStepper] = useState<number>(0);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const loadingState = useSelector(
    (state: States): boolean => state.registerUserReducer.loading,
  );
  const errorState = useSelector(
    (state: States): boolean => state.registerUserReducer.error,
  );
  const errorMessage = useSelector(
    (state: States): string => state.registerUserReducer.errorMessage,
  );
  const dispatch = useDispatch();

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

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    lastname: '',
    isMale: true,
    birthday: '',
  });
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    email: '',
    password: '',
    agreeWithTermsAndPrivacyPolicy: false,
  });
  const [instituitionInfo, setInstituitionInfo] = useState<InstituitionInfo>({
    code: '',
  });
  const handleSubmit = async () => {
    try {
      dispatch(
        RegisterUserRequest({
          name: personalInfo.name,
          lastname: personalInfo.lastname,
          email: accountInfo.email,
          code: instituitionInfo.code,
          password: accountInfo.password,
          acceptedTermsandPrivacyPolicy:
            accountInfo.agreeWithTermsAndPrivacyPolicy,
          isMale: personalInfo.isMale,
          birthday: personalInfo.birthday,
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
    setLoadingForm(loadingState);
  }, [loadingState]);
  useEffect(() => {
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
      {' '}
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
        }}
      >
        <h3>Solicitar Pedido de Adesão</h3>
        <StepperComponent activeStep={currentStepper} />
        <Divider sx={{ width: '100%', margin: 'auto' }} />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loadingForm}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {currentStepper === 0 && (
          <PersonalUserInfo
            onPersonalInfoChange={setPersonalInfo}
            onNext={handleNext}
            personalInfo={personalInfo}
          />
        )}
        {currentStepper === 1 && (
          <AccountUserInfo
            onAccountInfoChange={setAccountInfo}
            onNext={handleNext}
            accountInfo={accountInfo}
            onLast={handleLast}
          />
        )}
        {currentStepper === 2 && (
          <InstituitionInfo
            onInstituitionInfoChange={setInstituitionInfo}
            onNext={handleSubmit}
            instituitionInfo={instituitionInfo}
            onLast={handleLast}
          />
        )}
      </Paper>
    </>
  );
}

export default UserForm;
