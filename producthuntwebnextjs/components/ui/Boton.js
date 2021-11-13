// Styles
import styled from "@emotion/styled";

const Boton = styled.a`
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin-right: 1rem;
  // Si existe el prop bgColor le asignamos el fondo naranja, caso contrario blanco
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "#FFFFFF")};
  // Si existe el prop bgColor le asignamos el color de letra blanco, caso contrario naranja
  color: ${(props) => (props.bgColor ? "#FFFFFF" : "#DA552F")};

  // Al último boton no le ponemos margin-right
  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default Boton;
