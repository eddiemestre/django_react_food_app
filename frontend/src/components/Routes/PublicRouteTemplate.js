import { Outlet } from "react-router-dom";
import Header from '../Header/index';
import Footer from "../Footer/index";
import { Container } from "./Styles";
const PublicTemplate = () => {
  return (
    <Container>
      <Header /> 
      <Outlet />
      <Footer />
    </Container>
  )
  }

  export default PublicTemplate;