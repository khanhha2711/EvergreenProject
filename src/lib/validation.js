import { isValid } from "date-fns";

export const validate = ({ schema, data }) => {
  const result = schema.safeParse(data);
  if (result.success) return { isValid: true, errors: {} };
  const errors = {};
  result.error.issues.forEach((err) => {
    errors[err.path.join(".")] = err.message;
  });
  return { isValid: false, errors };
};
