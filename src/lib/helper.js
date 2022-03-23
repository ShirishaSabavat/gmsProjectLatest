// validate form function
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

export {
  // ATTENTION:  Please remove the below eslint if you have added
  // other exports
  // eslint-disable-next-line import/prefer-default-export
  onFormValidation, // validate form function
};
