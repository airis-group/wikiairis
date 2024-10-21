import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { api } from '../libs/connection';
import Swal from 'sweetalert2';

const GoogleLoginComp = ({err, setErr}) => {
    const [animate, setAnimate] = useState(false)
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        let input = {
                            email : res.data.email
                        }

                        api.post(`/auth/login/google`, input)
                        .then((response) => {
                        
                            localStorage.setItem("access_token", response.data.access_token);
                            localStorage.setItem("lang", "ind");
                            localStorage.setItem("data", JSON.stringify(response.data.data));
                            window.location.href = "/u/dashboard";
                          setTimeout(() => setAnimate(false), 700);
                          setErr("");
                        })
                        .catch((error) => {
                          setAnimate(false);

                          console.log("err", error)
                        //   setErr(error.response.data.detail);
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Invalid credential!",
                            timer: 3000,
                          }).then(function() {
                            // window.location.reload();
                          });
                        });
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    // const googleAuth = async () => {

    //     let input = {
    //         email : 'fikrymusa@gmail.com'
    //     }

    //     setAnimate(true)
    //     await api.post(`/auth/login/google`, input)
    //     .then((response) => {
        
    //         localStorage.setItem("access_token", response.data.access_token);
    //         localStorage.setItem("lang", "ind");
    //         localStorage.setItem("data", JSON.stringify(response.data.data));
    //         window.location.href = "/u/dashboard";
    //       setTimeout(() => setAnimate(false), 700);
    //       setErr("");
    //     })
    //     .catch((error) => {
    //       setAnimate(false);
    //       setInput("");
    //       console.log("err", error)
    //       setErr(error.response.data.detail);
    //     });
    // }

    // console.log("user", user)
    // console.log("profile", profile)
  return (
    <div>
        <GoogleOAuthProvider clientId='336834040279-b4m8ei3a7ef1sk7uklka9e27jpaor9j8.apps.googleusercontent.com'>
                        <button onClick={login}
                        className='bg-slate-300 w-full px-4 py-2 rounded-md hover:bg-red-100 flex flex-row items-center justify-center gap-4 duration-300'
                        
                        >
                        <div className='w-8 h-8'>
                            <svg viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></g></svg>

                        </div>
                        <span>Sign in with Google 🚀 </span>
                        
                        </button>

        </GoogleOAuthProvider>

    </div>
  )
}

export default GoogleLoginComp