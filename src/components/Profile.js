import React, { useState } from 'react'
import useFetch from '../hooks/fetch.data'
import avator from '../assets/avatar.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import toast from 'react-hot-toast'
import {useFormik} from 'formik'
import { passwordValidate, profileValidation, registerValidation} from '../helper/validate'
import convertToBase64 from './../helper/convert';
import { useAuthStore } from '../store/store'
import {updateUser} from '../helper/helper'
import { useNavigate } from 'react-router-dom'
export default function Password() {
  const [File, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const formik = useFormik({
    initialValues : {
      firstName : apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address : apiData?.address || ''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile :  apiData?.profile ||File || avator || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: 'Updating...',
        success : <b>Update Successfully...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{padding :'20px 0 0 0'}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-7'>Explorre more</span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img className={styles.profile_img} src={File || avator} alt='avator'/>
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('firstName')} className={styles.textBox} type='text' placeholder='First Name'/>
                  <input {...formik.getFieldProps('lastName')} className={styles.textBox} type='text' placeholder='Last Name'/>
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input {...formik.getFieldProps('mobileNo')} className={styles.textBox} type='text' placeholder='Mobile No'/>
                  <input {...formik.getFieldProps('email')} className={styles.textBox} type='email' placeholder='email*'/>
              
                </div>

               
                  <input {...formik.getFieldProps('address')} className={styles.textBox} type='text' placeholder='Address'/>
                  <button className={styles.btn} type='submit'>Update</button>
               
                  
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>

          </form>
        </div>
      </div>
    </div>
  )
}
