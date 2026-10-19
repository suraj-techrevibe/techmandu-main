import { RegisterCustomerAccountMutationVariables } from '~/generated/graphql';

const EMAIL_REGEX = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export type RegisterValidationErrors = {
  form?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
  phoneNumber?: string;
  vatpanNumber?: string;
  bussinessName?: string;
};

export const validateRegistrationForm = (
  formData: FormData,
): RegisterValidationErrors => {
  const errors: RegisterValidationErrors = {};
  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (!email || typeof email !== 'string' || !email.match(EMAIL_REGEX)) {
    errors.email = 'A valid e-mail address is required.';
  }
  if (!password || typeof password !== 'string' || password.length === 0) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!/[A-Z]/.test(password)) {
    errors.password = 'Password must contain at least one uppercase letter.';
  } else if (!/[a-z]/.test(password)) {
    errors.password = 'Password must contain at least one lowercase letter.';
  } else if (!/[0-9]/.test(password)) {
    errors.password = 'Password must contain at least one number.';
  } else if (!/[^A-Za-z0-9]/.test(password)) {
    errors.password = 'Password must contain at least one special character.';
  }
  if (!repeatPassword || typeof repeatPassword !== 'string') {
    errors.repeatPassword = 'Please repeat password!';
  }
  if (repeatPassword !== password) {
    errors.repeatPassword = 'Passwords do not match!';
  }

  const isBusiness = formData.get('isBusiness') === 'true';
  if (isBusiness) {
    const vatpan = formData.get('vatpanNumber');
    if (!vatpan || typeof vatpan !== 'string' || vatpan.trim().length === 0) {
      errors.vatpanNumber = 'VAT/PAN number is required for business accounts.';
    }
  }

  if(isBusiness){
    const bussinessName = formData.get('bussinessName');
    if(!bussinessName || typeof bussinessName !== 'string' || bussinessName.trim().length === 0){
      errors.bussinessName = 'Business Name is required for business accounts.';
    }
  }

  return errors;
};

export const extractRegistrationFormValues = (
  formData: FormData,
): RegisterCustomerAccountMutationVariables => {
  const input: RegisterCustomerAccountMutationVariables['input'] = {
    emailAddress: formData.get('email') as string,
    firstName: (formData.get('firstName') as string) || void 0,
    lastName: (formData.get('lastName') as string) || void 0,
    password: formData.get('password') as string,
    phoneNumber: (formData.get('phoneNumber') as string) || void 0,
    customFields: {
      isBusiness:
        formData.get('isBusiness') === 'true' ? true : false,
      vatPan:
        formData.get('isBusiness') === 'true'
          ? (formData.get('vatpanNumber') as string)
          : void 0,
    }
  };

  return { input };
};

export const validatePasswordResetForm = (
  formData: FormData,
): RegisterValidationErrors => {
  const errors: RegisterValidationErrors = {};
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (!password || typeof password !== 'string' || password.length < 8) {
    errors.password = 'Password must be at lease 8 characters long';
  }
  if (repeatPassword !== password) {
    errors.repeatPassword = 'Passwords do not match';
  }

  return errors;
};
