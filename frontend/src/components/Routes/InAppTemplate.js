import { Outlet } from "react-router-dom";
import InAppHeader from "../InAppHeader";
import { useState } from 'react';
import Footer from "../Footer";
import { Container } from "./Styles";

const InAppTemplate = () => {

  return (
      <Container>
        <InAppHeader /> 
        <Outlet />
      </Container>
  )
    
}

  export default InAppTemplate;