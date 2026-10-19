import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z, { object, refine } from 'zod';

export default function Login() {
  let [apiErrorMessage, setapiErrorMessage] = useState(null);
  let navigate = useNavigate();
  let [apiCalled, setapiCalled] = useState(false);

  let schema = z.object({
    email: z.email("Invalid email"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),// The regex is taken from the backend.    //Complete it from video 2, session 2, week 4
  });

  let form = useForm({
    defaultValues : {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema)
  });

  let {register, handleSubmit, formState} = form;

  let inputvalues = {};

  function submitValues(values){

    setapiCalled(true);

    axios.post("https://route-posts.routemisr.com/users/signin", values)
    .then((response)=>{
      setapiCalled(false);
      console.log(response);
      if(response.data.success == true){
        navigate('/');
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
        <input type="email" {...register('email')} name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
        {formState.errors.email ? <p className="text-red-600">{formState.errors.email.message}</p> : ""}
    </div>
    <div className="relative z-0 w-96 mx-auto my-5 group">
        <input type="password" {...register('password')} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
        <label htmlFor="floating_password" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Password</label>
        {formState.errors.password ? <p className="text-red-600">{formState.errors.password.message}</p> : ""}
    </div>

    <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
      {apiCalled ? <i className='fa fa-spin fa-spinner'></i> : 'Login' }      
    </button>
  </form>
    </>
  )
}