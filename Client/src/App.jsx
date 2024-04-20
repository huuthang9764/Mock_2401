import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./routes";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const state = useSelector((state) => state.theme);
  const theme = createTheme(state);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='app'>
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App