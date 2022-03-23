import * as yup from 'yup';

// user register form schema
export const userRegisterSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  email: yup.string().email('Email is invalid.').required('Email is required.'),
  password: yup.string().required('Password is required.'),
  confirmPassword: yup.string().required('Please Confirm your password.')
    .oneOf([yup.ref('password'), null], 'Passwords did not match.'),
});

// user register variable structure
export const userRegisterStructure = {
  password: '',
  confirmPassword: '',
  username: '',
  email: '',
};
