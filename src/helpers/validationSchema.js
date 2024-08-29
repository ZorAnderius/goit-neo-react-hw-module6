import * as Yup from 'yup';

const phoneReg = '[0-9]{3}-[0-9]{2}-[0-9]{2}';

export const validSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .strict(false)
    .min(3, 'Contact name is too short')
    .max(50, 'Contact name is more then 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .trim()
    .strict(false)
    .matches(phoneReg, {
      message: 'Number format is 123-45-67',
      excludeEmptyString: false,
    })
    .required('Number is required'),
});
