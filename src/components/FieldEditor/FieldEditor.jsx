import React from 'react';
import {
  TextField, Checkbox, FormControlLabel, Box, Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateField, deleteField } from '../../redux/FormSlice';

function FieldEditor({ field, index }) {
  const dispatch = useDispatch();

  const update = (key, value) => {
    dispatch(updateField({ ...field, [key]: value }));
  };

  const updateValidation = (rule, value) => {
    const newValidations = { ...field.validations, [rule]: value };
    update('validations', newValidations);
  };

  return (
    <Box p={2} mb={2} border="1px solid #ccc" borderRadius={2}>
      <h4>Field #{index + 1} ({field.type})</h4>

      <TextField
        label="Label"
        value={field.label}
        onChange={e => update('label', e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <TextField
        label="Default Value"
        value={field.defaultValue}
        onChange={e => update('defaultValue', e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={field.required}
            onChange={e => update('required', e.target.checked)}
          />
        }
        label="Required"
      />

      <TextField
        label="Min Length"
        type="number"
        value={field.validations?.minLength || ''}
        onChange={e => updateValidation('minLength', e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <TextField
        label="Max Length"
        type="number"
        value={field.validations?.maxLength || ''}
        onChange={e => updateValidation('maxLength', e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={field.validations?.email || false}
            onChange={e => updateValidation('email', e.target.checked)}
          />
        }
        label="Email Format"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={field.validations?.password || false}
            onChange={e => updateValidation('password', e.target.checked)}
          />
        }
        label="Password Rule"
      />

      <Button
        color="error"
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => dispatch(deleteField(field.id))}
      >
        Delete
      </Button>
    </Box>
  );
}

export default FieldEditor;
