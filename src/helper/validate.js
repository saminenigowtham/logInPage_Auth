import toast from "react-hot-toast"
import { authenticate } from './helper'


/** validate login userName */
export async function usernameValidate(values){
    const errors = usernameVerify({},values)
     if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist!')
        }
    }
    return errors;
}
/** validate login password */
export async function passwordValidate(values){
    const errors=passwordVerify({},values)

    return errors;
}
/** validation on reset password */
export async function resetpasswordValidation(values){
    const errors=passwordVerify({},values)
    if(values.password!==values.conform_pwd){
        errors.exist=toast.error("password are not Matched")
    }
    return errors;
}
/** validation regester form */
export async function registerValidation(values){
    const error=usernameVerify({},values)
    passwordVerify(error,values)
    emailVerify(error,values)
} 
/** validation profile form */
export async function profileValidation(values){
    const error=emailVerify({},values)
    return error;
}
/* validation userName */
function usernameVerify(error={} , values){
    if(!values.username){
        error.username = toast.error("UserName Not Found..!")
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}
/** validation of password */
function passwordVerify(error={} , values){
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/
    if(!values.password){
        error.password = toast.error("password Not Found..!")
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid password...!')
    }else if (values.password.length < 4){
        error.password = toast.error('length should be more..!')
    }else if (!specialChar.test(values.password)){
        error.password = toast.error('special char should be used..!')
    }

    return error;
}
function emailVerify(error={},values){
    if(!values.email){
        error.email = toast.error("email Not Found..!")
    }else if(values.email.includes(" ")){
        error.email = toast.error('Wrong Mail...!')
    }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)){
        error.email = toast.error('Invalid Mail Id..!')
    }
    return error;
}