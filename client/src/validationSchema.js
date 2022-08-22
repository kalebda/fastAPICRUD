import * as yup from "yup";

const phoneRegEx =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const phoneBookValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .required("First Name is Required")
    .typeError("First Name should be a string"),
  lastname: yup
    .string()
    .required("Last name is Required")
    .typeError("Last Name should be a string"),
  phonenumber: yup
    .string()
    .required("Phone Number is required")
    .matches(phoneRegEx, "Phone Number is not valid")
    .typeError("phone number should be a string"),
});
