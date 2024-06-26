export const TechnicalParameterCategorySchema = Yup.object().shape({
    name: Yup.string().max(50).required('Name is required') ,
    description: Yup.string().max(5000),
    isDisabled : Yup.boolean(),
  });