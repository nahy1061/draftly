import * as Yup from "yup";

const phoneRegExp = /^[1-9]\d{8,10}$/; 


export const personalInfoSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  jobTitle: Yup.string().required("Job title is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),

  countryCode: Yup.string().required(),
  phone: Yup.string().matches(phoneRegExp, "Enter a valid phone number without a leading 0"),

  address: Yup.string(),
  linkedin: Yup.string().url("Enter a valid URL"),
  github: Yup.string().url("Enter a valid URL"),
  portfolio: Yup.string().url("Enter a valid URL"),

  // TODO: summary — optional, but cap it so it doesn't blow out the resume
  // layout later. Yup string has a .max(number, message) method.
  summary: Yup.string().max(500, "Summary cannot exceed 500 characters")
});