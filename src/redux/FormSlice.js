import { createSlice } from '@reduxjs/toolkit';

const FormSlice = createSlice({
  name: 'form',
  initialState: {
    formName: '',
    fields: [],
  },
  reducers: {
    setFormName: (state, action) => {
      state.formName = action.payload;
    },
    addField: (state, action) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action) => {
      const index = state.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = action.payload;
      }
    },
    deleteField: (state, action) => {
      state.fields = state.fields.filter(f => f.id !== action.payload);
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    resetForm: (state) => {
      state.fields = [];
      state.formName = '';
    },
  },
});

export const {
  setFormName,
  addField,
  updateField,
  deleteField,
  setFields,
  resetForm,
} = FormSlice.actions;

export default FormSlice.reducer;
