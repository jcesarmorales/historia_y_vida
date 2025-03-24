import BarraNavUser from "../componentes/BarraNavUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Administrador() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/error");
      
    }
  }, [navigate]);
  return (
    <>
      <BarraNavUser />
      <div className="F-home"></div>
    </>
  );
}
export default Administrador;
