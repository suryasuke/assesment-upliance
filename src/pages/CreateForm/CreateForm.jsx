import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addField, setFormName } from '../../redux/FormSlice';
import { Button, TextField, MenuItem, Typography, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import FieldEditor from '../../components/FieldEditor/FieldEditor';
import { saveForm } from '../../utils/Storage';

const fieldTypes = [
  "text", "number", "textarea", "select", "radio", "checkbox", "date"
];

function CreateForm() {
  const dispatch = useDispatch();
  const { formName, fields } = useSelector(state => state.form);
  const [name, setName] = useState(formName);
  const [type, setType] = useState('text');

  const handleAddField = () => {
    dispatch(addField({
      id: uuidv4(),
      type,
      label: '',
      required: false,
      defaultValue: '',
      validations: {},
    }));
  };

  const handleSaveForm = () => {
  if (!name.trim()) {
    alert("Please enter a form name.");
    return;
  }
  if (fields.length === 0) {
    alert("Please add at least one field before saving.");
    return;
  }

  const formId = `form_${Date.now()}`;
  saveForm(formId, {
    formName: name.trim(),
    fields,
    createdAt: new Date().toISOString(),
  });

  alert('Form saved successfully!');
};

  return (
    <Box p={3}>
      <Typography variant="h4">Form Builder</Typography>

      <TextField
        label="Form Name"
        value={name}
        onChange={e => {
          setName(e.target.value);
          dispatch(setFormName(e.target.value));
        }}
        fullWidth
        sx={{ mt: 2 }}
      />

      <Box mt={2}>
        <TextField
          select
          label="Select Field Type"
          value={type}
          onChange={e => setType(e.target.value)}
          sx={{ width: '200px', mr: 2 }}
        >
          {fieldTypes.map(ft => (
            <MenuItem key={ft} value={ft}>{ft.toUpperCase()}</MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleAddField}>
          Add Field
        </Button>
      </Box>

      <Box mt={4}>
        {fields.map((field, index) => (
          <FieldEditor key={field.id} field={field} index={index} />
        ))}
      </Box>

      <Button variant="contained" sx={{ mt: 4 }} onClick={handleSaveForm}>
        Save Form
      </Button>
    </Box>
  );
}

export default CreateForm;
