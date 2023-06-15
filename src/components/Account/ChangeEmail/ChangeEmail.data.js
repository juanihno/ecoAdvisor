import * as Yup from "yup";
export function initialValues() {
  return {
    email: "",
  };
}
export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Wrong email")
      .required("Please a right email is required"),
  });
}
