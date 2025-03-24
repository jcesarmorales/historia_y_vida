import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { Mision } from './pages/Mision';
import { Vision } from './pages/Vision';
import Administrador from './pages/administrador';
import RegistroPaciente from './pages/RegistroPaciente';
import User  from './pages/user';
import ConsultarPaciente from './pages/consultarPaciente';
import RegistrarHistoriaClinica from './pages/registrarHistClin';
import AlertDismissible from './componentes/ErrorInicioSesion';
import { ConsultarHistClinica } from './pages/ConsultarHistClinica';
import InfoUser from './componentes/infoUser';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mision" element={<Mision />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/admin" element={<Administrador/>} />
        <Route path="/user" element={<User/>} />
        <Route path="/reg-historia-clinica" element={<RegistrarHistoriaClinica />} />
        <Route path="/consulta-paciente" element={<ConsultarPaciente />} />
        <Route path="/registrar-paciente" element={<RegistroPaciente />} />
        <Route path="/error" element={<AlertDismissible />} />
        <Route path="/infouser" element={<InfoUser />} />
        <Route path="/cosultar-historia-clinico" element={<ConsultarHistClinica />} />



      </Routes>
    </BrowserRouter>
  );
}
//<Route path="/signup" element={<SignUp />} />
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <App />
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

