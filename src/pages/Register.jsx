import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/Forms/SignUp';

const Register = () => {

  return (
    <div>
      <SignUp />
    </div>
  )
}

export default Register
