import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import avator from '../assets/avatar.png'
import styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast'
import toast from 'react-hot-toast'
import {useFormik} from 'formik'
import { passwordValidate} from '../helper/validate'
import {useAuthStore} from '../store/store.js'
import useFetch from '../hooks/fetch.data.js';
 import { verifyPassword } from '../helper/helper.js'

export default function Password() {
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/profile')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  return (
    <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-7'>Explorre more</span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img className={styles.profile_img} src={apiData?.profile || avator} alt='avator'/>
            </div>

            <div className='flex flex-col items-center justify-center'>
              <input {...formik.getFieldProps('password')} className={styles.textBox} type='password' placeholder='Password'/>
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
