import * as Yup from "yup";
export function initialValues() {
  return {
    address: "",
  };
}
export function validationSchema() {
  return Yup.object({
    address: Yup.string().required("The address is required"),
  });
}
