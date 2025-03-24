import { BarraNavAdmin } from "../componentes/BarraNavAdmin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
      <BarraNavAdmin />
      <div className="F-home"></div>
    </>
  );
}
export default Administrador;
