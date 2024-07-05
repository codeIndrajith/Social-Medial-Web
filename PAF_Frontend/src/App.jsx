/* eslint-disable no-unused-vars */
import './App.css';

import LayOut from './LayOut/LayOut';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <LayOut />
      <ToastContainer />
    </>
  );
}

export default App;
