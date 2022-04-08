import * as yup from 'yup';

export const userLoginSchema = yup.object().shape({
  userName: yup.string().required('User name is required.'),
  password: yup.string().trim().required('Password is required.'),
});

export const userLoginStructure = {
  userName: '',
  password: '',
};
