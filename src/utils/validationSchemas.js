import * as Yup from "yup";

const phoneRegExp = /^[1-9]\d{8,10}$/;
const currentYear = new Date().getFullYear();

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
  summary: Yup.string().max(500, "Summary cannot exceed 500 characters"),
});

export const educationSchema = Yup.object({
  degree: Yup.string().required("Degree is required"),
  institute: Yup.string().required("Institute is required"),

  startYear: Yup.number()
    .min(1950, "Enter a valid year")
    .max(currentYear, "Year cannot be in the future")
    .required("Start year is required"),

  endYear: Yup.number()
    .min(1950, "Enter a valid year")
    .required("End year is required")
    .test(
      "end-after-start",
      "End year cannot be before start year",
      function (value) {
        return !value || !this.parent.startYear || value >= this.parent.startYear;
      }
    ),

  scoreType: Yup.string().oneOf(["cgpa", "marks"]),

  obtainedCgpa: Yup.number()
    .typeError("Must be a number")
    .when("scoreType", {
      is: "cgpa",
      then: (schema) =>
        schema
          .min(0, "Cannot be negative")
          .test(
            "not-more-than-total-cgpa",
            "Obtained CGPA cannot exceed total CGPA",
            function (value) {
              const total = this.parent.totalCgpa;
              return !value || !total || value <= total;
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  totalCgpa: Yup.number()
    .typeError("Must be a number")
    .when("scoreType", {
      is: "cgpa",
      then: (schema) => schema.min(0.1, "Must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  obtainedMarks: Yup.number()
    .typeError("Must be a number")
    .when("scoreType", {
      is: "marks",
      then: (schema) =>
        schema
          .min(0, "Cannot be negative")
          .test(
            "not-more-than-total-marks",
            "Obtained marks cannot exceed total marks",
            function (value) {
              const total = this.parent.totalMarks;
              return !value || !total || value <= total;
            }
          ),
      otherwise: (schema) => schema.notRequired(),
    }),

  totalMarks: Yup.number()
    .typeError("Must be a number")
    .when("scoreType", {
      is: "marks",
      then: (schema) => schema.min(1, "Must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),
});