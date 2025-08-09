import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm/CreateForm'
import PreviewForm from './pages/PreviewForm/PreviewForm';
import MyForms from './pages/ListForms/ListForms';
import Home from './pages/Home/Home';
import PreviewWrapper from './pages/PreviewWrapper/PreviewWrapper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForms />} />
        <Route path="/preview/:id" element={<PreviewWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
