import { Outlet } from "react-router-dom";
import { useState } from 'react';

const SettingsTemplate = () => {
    const [updatedPassword, setUpdatedPassword] = useState(false)
  return (
    <div>
      <Outlet context={[updatedPassword, setUpdatedPassword]} />
    </div>
  )
  }

  export default SettingsTemplate;