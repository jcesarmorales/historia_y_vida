import Card from 'react-bootstrap/Card';
import { BarraNav } from '../componentes/BarraNav';
export const Mision = () => {
  return (
    
    <>
    <BarraNav/>
    <Card>
      <Card.Header><strong>Mision</strong></Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            <p>Nuestra misión es proporcionar un aplicativo web que revolucione el manejo de historias clínicas en entidades de salud, permitiendo un acceso fácil, seguro y eficiente a través de una base de datos global. Nos esforzamos por mejorar la calidad de atención médica al facilitar el intercambio de información médica autorizada entre diferentes entidades, garantizando la confidencialidad y la integridad de los datos.</p>{' '}
          </p>
          <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
    </>
    
  );


}
