import { Outlet } from "react-router-dom";
import InAppHeader from "../InAppHeader";
import { Container } from "./Styles";
const InAppTemplate = () => {
  return (
    <div>
      <InAppHeader /> 
      <Outlet />
    </div>
  )
  }

  export default InAppTemplate;