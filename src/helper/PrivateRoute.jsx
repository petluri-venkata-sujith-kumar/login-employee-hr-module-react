import { Navigate } from "react-router-dom";

const PrivateRoutes=({children})=>{
    const validateUser = location.state?.validateUser;
  console.log(validateUser)
    if(validateUser === false){
        return <Navigate to="/login"/>
    }
    else{
        return <>{children}</>
    }
}
export default PrivateRoutes