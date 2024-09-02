import {useEffect, useState} from 'react'
import { apiCred } from '../libs/connection';
const PrivateRoute = ({children}) => {
    const currentPath = window.location.pathname;
    const [animate, setAnimate] = useState(true);
  
  
    const check_auth = async () => {
      setAnimate(true);
      await apiCred
        .get(`/api/v1/auth/me`)
        .then((response) => {
            //   localStorage.removeItem("data");
            //   localStorage.setItem("data", JSON.stringify(response.data.data));
            setTimeout(() => {
              setAnimate(false);
            }, 1000);
        })
        .catch((error) => {
          localStorage.removeItem("data");
          localStorage.removeItem("access_token");
          window.location.href = "/auth/login";
          setAnimate(false);
        });
      };
      useEffect(() => {
        check_auth();
      }, [currentPath]);
  return (
   <>
   {animate ? <span>Loading The Page</span> : children}
   </>
  )
}

export default PrivateRoute