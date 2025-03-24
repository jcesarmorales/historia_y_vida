import { BarraNav } from "../componentes/BarraNav"
import  Card  from "react-bootstrap/Card"
export const Vision = () => {
  return (
    <>
    <BarraNav/>
    <Card>
      <Card.Header><strong >Vision</strong></Card.Header>
      <Card.Body>
        <blockquote  className="blockquote mb-0">
          <p>
            {' '}
           <p>Nos visualizamos como líderes en el sector de la salud, brindando un aplicativo web innovador y de vanguardia que sea utilizado por diversas entidades de salud en todo el mundo. Nuestro objetivo es ser reconocidos como el estándar de excelencia en el manejo de historias clínicas, facilitando la colaboración y el intercambio de información médica para mejorar los resultados de salud y optimizar la toma de decisiones clínicas. Aspiramos a crear un entorno digital global donde los usuarios autorizados puedan acceder fácilmente a la información clínica necesaria, promoviendo una atención médica integrada y de calidad.</p>{' '}
          </p>

        </blockquote>
      </Card.Body>
    </Card>
    </>
  )
}
