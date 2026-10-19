import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z, { object, refine } from 'zod';

export default function Register() {
  let [apiErrorMessage, setapiErrorMessage] = useState(null);
  let navigate = useNavigate();
  let [apiCalled, setapiCalled] = useState(false);

  let schema = z.object({
    name: z.string().min(2, 'Enter 2 characters at least').max(9,'Max 9 Characters'), //String() validation includes an empty value. To overcome it, .min()
    username: z.string().regex(/^[a-z0-9_]{3,30}$/),
    email: z.email("Invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),// The regex is taken from the backend.    //Complete it from video 2, session 2, week 4
    rePassword: z.string(),  //Complete it from video 2, session 2, week 4
    dateOfBirth: z.string().min(6, "Enter a valid date"),  //Complete it from video 2, session 2, week 4
    gender: z.enum(["male", "female"], "Gender required"),      //Complete it from video 2, session 2, week 4
  }).refine(
    (object)=>{ //(object) here represents z.object which carried the entire validation scheme 
      return object.password == object.rePassword // the return for this ar0row function must equal true for it consider the entire data "object" as valid
    }, 
    {error:'Password & repassword are not matching',
    path:["rePassword"]} //path takes the elements point that it should be pointed at incase of the error
  );

  let form = useForm({
    defaultValues : {
      name: '',
      username:'',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    resolver: zodResolver(schema)
  });

  let {register, handleSubmit, formState} = form;

  let inputvalues = {};

  function submitValues(values){

    setapiCalled(true);

    axios.post("https://route-posts.routemisr.com/users/signup", values)
    .then((response)=>{
      setapiCalled(false);
      console.log(response);
      if(response.data.success == true){
        navigate('/login');
      }
    })
    .catch((error)=>{
      setapiCalled(false);
      console.log('errror:::::::::::::  ');
      console.log(error.response.data.errors);
      setapiErrorMessage(error.response.data.errors);
    });
  }

  return ( <>
      

  <form onSubmit={handleSubmit(submitValues)} >
    {apiErrorMessage != null ? <div className='error bg-red-500 text-white text-center rounded-2xl p-1'>{apiErrorMessage}</div> : ''}
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="text" {...register('name')} name="name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_first_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">First name</label>
        {formState.errors.name ? <p className="text-red-600">{formState.errors.name.message}</p> : ""}
    </div>
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="text" {...register('username')} name="username" id="floating_user_name" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_user_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Username</label>
        {formState.errors.username ? <p className="text-red-600">{formState.errors.username.message}</p> : ""}
    </div>
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="email" {...register('email')} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
        {formState.errors.email ? <p className="text-red-600">{formState.errors.email.message}</p> : ""}
    </div>
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="password" {...register('password')} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        {formState.errors.password ? <p className="text-red-600">{formState.errors.password.message}</p> : ""}
    </div>
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="password" {...register('rePassword')} name="rePassword" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_repeat_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Confirm password</label>
        {formState.errors.rePassword ? <p className="text-red-600">{formState.errors.rePassword.message}</p> : ""}
    </div>

    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="date" {...register('dateOfBirth')} name="dateOfBirth" id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="dateOfBirth" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Birthday</label>
        {formState.errors.dateOfBirth ? <p className="text-red-600">{formState.errors.dateOfBirth.message}</p> : ""}
    </div>
    <div className='flex w-96 mx-auto justify-evenly'>
      <div className="flex items-center mb-4">
        <input id="country-option-1" {...register('gender')} type="radio" name="gender" value="male" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
        <label htmlFor="country-option-1" className="select-none ms-2 text-sm font-medium text-heading">
          Male
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input id="country-option-1" {...register('gender')} type="radio" name="gender" value="female" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"/>
        <label htmlFor="country-option-1" className="select-none ms-2 text-sm font-medium text-heading">
          Female
        </label>
      </div>
      {formState.errors.gender ? <p className="text-red-600">{formState.errors.gender.message}</p> : ""}
    </div>


    <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
      {apiCalled ? <i className='fa fa-spin fa-spinner'></i> : 'Submit' }      
    </button>
  </form>
    </>
  )
}
