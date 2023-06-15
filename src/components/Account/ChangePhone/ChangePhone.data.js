import * as Yup from "yup";
export function initialValues() {
  return {
    phone: "",
  };
}
export function validationSchema() {
  return Yup.object({
    phone: Yup.string().required().phone("AU", true, "Invalid phone"),
  });
}
