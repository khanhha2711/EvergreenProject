export const buildSectionData = ({ fields, rawData }) =>
  fields?.reduce((acc, field) => {
    acc[field.name] = rawData[field.name];
    return acc;
  }, {});
