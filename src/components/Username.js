import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import avator from '../assets/avatar.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import {useFormik} from 'formik'
import { usernameValidate } from '../helper/validate'
import {useAuthStore} from '../store/store.js'

// import { passwordValidate } from '../helper/validate'
export default function Username() {
  const navigate = useNavigate();

  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({

      initialValues : {
        username : "",
      },
      validate : usernameValidate,
      validateOnBlur:false,
      validateOnChange:false,
      onSubmit : async values =>{
        setUsername(values.username)
        navigate('/password')
      }
    })


  return (
    <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>hello</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-7'>Explorre more</span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img className={styles.profile_img} src={avator} alt='avator'/>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <input {...formik.getFieldProps('username')} className={styles.textBox} type='text' placeholder='User Name'/>
              <button className={styles.btn} type='submit'>Let's Go!</button>
            </div>
            
            <div className='text-center py-4'>
              <span className="text-gray-400">Not a Member?<Link className='text-red-500' to='/register'>Register Now</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
