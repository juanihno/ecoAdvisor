import * as Yup from "yup";
import "yup-phone-lite";

export function initialValues() {
  return {
    owner: false,
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: null,
    images: [],
  };
}
export function validationSchema() {
  return Yup.object().shape({
    owner: Yup.boolean(),
    name: Yup.string().required("Business name is required"),
    address: Yup.string().required("Business address is required"),
    phone: Yup.string().phone("AU", true, "Invalid phone"),
    //   .required("Restaurant phone is required"),
    email: Yup.string().email("Invalid email"),
    //   .required("Restaurant email is required"),
    description: Yup.string().required("Business description is required"),
    location: Yup.object().required("Business location is required"),
    images: Yup.array()
      .min(1, "You must upload at least one image")
      .required("You must upload at least one image"),
  });
}
