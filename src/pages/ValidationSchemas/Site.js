export   const AddSiteSchema = Yup.object().shape({
    name: Yup.string().min(2).max(40).required('Name is required'),
    customer: Yup.string(),
    billingSite: Yup.string(),
    // phone: Yup.string().matches(phoneRegExp, {message: "Please enter valid number.", excludeEmptyString: true}).max(15, "too long"),
    email: Yup.string().trim('The contact name cannot include leading and trailing spaces'),
    // fax: Yup.string(),
    website: Yup.string(),
    lat: Yup.string().max(25),
    long: Yup.string().max(25),
    street: Yup.string(),
    suburb: Yup.string(),
    city: Yup.string(),
    region: Yup.string(),
    postcode: Yup.string().matches(numberRegExp, {message: "Please enter valid number.", excludeEmptyString: true}).min(0),
    // country: Yup.string().nullable(),
    primaryBillingContact: Yup.string().nullable(),
    primaryTechnicalContact: Yup.string().nullable(),
  });