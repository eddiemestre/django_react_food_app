import { Outlet } from "react-router-dom";
import InAppHeader from "../InAppHeader";
import { useState } from 'react';

const InAppTemplate = () => {

  return (
    <div>
      <InAppHeader /> 
      <Outlet />
    </div>
  )
  }

  export default InAppTemplate;