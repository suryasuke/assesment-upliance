// PreviewWrapper.jsx
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadForm } from "../../utils/Storage"; // your localStorage helper
import { setFormName, setFields } from "../../redux/FormSlice";
import PreviewForm from "../PreviewForm/PreviewForm";

function PreviewWrapper() {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  useEffect(() => {
    const savedForm = loadForm(id);
    if (savedForm) {
      dispatch(setFormName(savedForm.formName));
      dispatch(setFields(savedForm.fields));
    }
  }, [id, dispatch]);

  return <PreviewForm />;
}

export default PreviewWrapper;
