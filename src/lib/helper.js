// validate form function
import qs from 'qs';
import { history } from 'redux/store';

const onFormValidation = async (schema, form) => {
  try {
    const value = await schema.validate(form, { abortEarly: false });
    return { error: false, value };
  } catch (error) {
    const { message: count, inner } = error;
    return {
      error: true,
      count,
      messages: inner.map(({ message }) => message),
      paths: inner.map(({ path }) => path),
    };
  }
};

const onDecodeQueryParams = (search) => qs.parse(search, { ignoreQueryPrefix: true });
const onEncodeQueryParams = (value, pathname) => {
  const search = qs.stringify(
    value,
    { addQueryPrefix: true },
  );
  history.replace({ search, pathname });
};

export {
  // ATTENTION:  Please remove the below eslint if you have added
  // other exports
  // eslint-disable-next-line import/prefer-default-export
  onFormValidation, // validate form function
  onDecodeQueryParams, // decode query params
  onEncodeQueryParams, // encode query params
};
