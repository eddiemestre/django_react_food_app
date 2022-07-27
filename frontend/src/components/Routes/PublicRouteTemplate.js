import { Outlet } from "react-router-dom";
import InAppHeader from "../InAppHeader";
import { Container } from "./Styles";

const PublicTemplate = () => {
  return (
    <Container>
      <InAppHeader /> 
      <Outlet />
    </Container>
  )
  }

  export default PublicTemplate;