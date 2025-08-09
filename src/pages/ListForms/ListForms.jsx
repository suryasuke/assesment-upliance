import React, { useState } from 'react';
import { listForms, loadForm, deleteForm } from '../../utils/Storage';
import { useDispatch } from 'react-redux';
import { setFormName, setFields } from '../../redux/FormSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button, Stack } from '@mui/material';

function MyForms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forms, setForms] = useState(listForms());

  const openForm = (formId) => {
    const form = loadForm(formId);
    if (form) {
      dispatch(setFormName(form.formName));
      dispatch(setFields(form.fields));
      navigate(`/preview/${formId}`);
    }
  };

  const removeForm = (formId) => {
    deleteForm(formId);
    setForms(listForms()); // refresh the list
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Saved Forms
      </Typography>

      {forms.length === 0 ? (
        <Typography>No forms saved yet.</Typography>
      ) : (
        <List>
          {forms.map((form) => (
            <ListItem
              key={form.id}
              sx={{ border: '1px solid #ddd', mb: 2, borderRadius: 1 }}
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openForm(form.id)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeForm(form.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              }
            >
              <ListItemText
                primary={form.formName}
                secondary={`Created at: ${form.createdAt}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default MyForms;
