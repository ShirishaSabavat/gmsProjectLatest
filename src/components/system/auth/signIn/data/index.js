import * as yup from 'yup';

export const userLoginSchema = yup.object().shape({
  email: yup.string().email('Email is invalid.').required('Email is required.'),
  password: yup.string().trim().required('Password is required.'),
});

export const userLoginStructure = {
  email: '',
  password: '',
};
