import { Outlet } from "react-router-dom";
import Header from "../Header";
import { Container } from "./Styles";

const NotFoundTemplate = () => {
    return (
        <Container>
        <Header /> 
        <Outlet />
        </Container>
    )
  }

  export default NotFoundTemplate;