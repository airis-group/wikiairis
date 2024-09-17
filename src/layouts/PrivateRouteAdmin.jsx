import {useEffect, useState} from 'react'
import { apiCred } from '../libs/connection';
import LoadingPage from '../components/LoadingPage';
const PrivateRouteAdmin = ({children}) => {
    const currentPath = window.location.pathname;
    const [animate, setAnimate] = useState(true);
    let uLevel = 'admin'
    if(uLevel != "admin"){
      window.location.href = "/u/dashboard";

    }
  return (
   <>
   {children}
   </>
  )
}

export default PrivateRouteAdmin