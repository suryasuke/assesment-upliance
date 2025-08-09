export const saveForm = (formId, formData) => {
  localStorage.setItem(formId, JSON.stringify(formData));
};

export const loadForm = (formId) => {
  const data = localStorage.getItem(formId);
  return data ? JSON.parse(data) : null;
};

export const listForms = () => {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith('form_'))
    .map((key) => {
      const data = JSON.parse(localStorage.getItem(key));
      return { id: key, ...data };
    });
};
export const deleteForm = (formId) => {
  localStorage.removeItem(formId);
};
