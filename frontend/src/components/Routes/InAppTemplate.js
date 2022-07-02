import { Outlet } from "react-router-dom";
import InAppHeader from "../InAppHeader";

const InAppTemplate = () => {
  return (
    <div>
      <InAppHeader /> 
      <Outlet />
    </div>
  )
  }

  export default InAppTemplate;