import {useEffect, useState} from 'react'
import { apiCred } from '../libs/connection';
import LoadingPage from '../components/LoadingPage';
const PrivateRoute = ({children}) => {
    const currentPath = window.location.pathname;
    const [animate, setAnimate] = useState(true);
  
  
    const check_auth = async () => {
      setAnimate(true);
      await apiCred
        .get(`/auth/me`)
        .then((response) => {
          console.log("res", response)
            //   localStorage.removeItem("data");
            //   localStorage.setItem("data", JSON.stringify(response.data.data));
            setAnimate(false);
       
        })
        .catch((error) => {
          console.log("err", error)
          setAnimate(false);
          localStorage.removeItem("data");
          localStorage.removeItem("access_token");
          window.location.href = "/auth/login";
        });
      };
      useEffect(() => {
        check_auth();
      }, [currentPath]);
  return (
   <>
   {animate ? <LoadingPage /> : children}
   </>
  )
}

export default PrivateRoute