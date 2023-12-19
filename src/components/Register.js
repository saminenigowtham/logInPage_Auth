import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import avator from '../assets/avatar.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import toast from 'react-hot-toast'
import {useFormik} from 'formik'
import {registerValidation} from '../helper/validate'
import {registerUser} from '../helper/helper'
// import { async } from './../helper/validate';
import convertToBase64 from './../helper/convert';

export default function Password() {
   const navigate = useNavigate()
  const [File, setFile] = useState()
  
  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : File||avator|| ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/')});
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }
  return (
    <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-7'>Explorre more</span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
            <label htmlFor='profile'>
            <img className={styles.profile_img} src={File || avator} alt='avator'/>
            </label>
            <input onChange= {onUpload} type='file' id='profile' name='profile'/> 
            </div>

            <div className='flex flex-col items-center justify-center'>
              <input {...formik.getFieldProps('email')} className={styles.textBox} type='email' placeholder='email*'/>
              <input {...formik.getFieldProps('username')} className={styles.textBox} type='text' placeholder='Username*'/>
              <input {...formik.getFieldProps('password')} className={styles.textBox} type='password' placeholder='Password*'/>
              <button className={styles.btn} type='submit'>Sign In</button>
            </div>
            
            <div className='text-center py-4'>
              <span className="text-gray-400">Forget Password?<Link className='text-blue-500' to='/recover'>Recover Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
