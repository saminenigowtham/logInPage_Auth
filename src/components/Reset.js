import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { resetpasswordValidation} from '../helper/validate'
import  { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'
// import useFetch from '../hooks/fetch.data'


export default function Reset() {
  const {username} = useAuthStore(state => state.auth)
  // const [{ isLoading, apiData,status, serverError }] = useFetch('createResetSession')
  const navigate = useNavigate();
  const formik = useFormik({
      initialValues : {
        password : "",
        conform_pwd : ""
      },
      validate : resetpasswordValidation,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit : async values =>{
        console.log(values)
        let resetPromise = resetPassword({username, password : values.password})
        toast.promise(resetPromise,{
          loading:"Updating the message..!",
          success:<b>The Password was updated..!</b>,
          error:<b>Something Went Wrong..!</b>
        })
        resetPromise.then(function(){ navigate('/password') })
      }
    })
    // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
    // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    // if(status && status!==201) return <Navigate to='/password'></Navigate>
    
  return (
    <div className='container mx-auto' onSubmit={formik.handleSubmit}>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-7'>enter the new password</span>
          </div>
          <form className='py-20' onSubmit={formik.handleSubmit}>
          <div className='input text-center'>
              <input {...formik.getFieldProps('password')} className={styles.textBox} type='text' placeholder='password'/>
              <input {...formik.getFieldProps('conform_pwd')} className={styles.textBox} type='password' placeholder='Confirm password'/>
          </div>
            <div className='flex flex-col items-center justify-center'>
            
              <button className={styles.btn} type='submit'>Reset</button>
            </div>
            
            <div className='text-center py-4'>
          
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
