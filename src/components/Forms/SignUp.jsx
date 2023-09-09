
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LargeText from "../Inputs/LargeText";
import MiniText from "../Inputs/MiniText";

import "./_forms.scss";
import Selector from "../Inputs/Selector";
import { loadAreas } from "../../store/reducers/areas";
import Spinner from "../Spinner/Spinner";
import ErrorCard from "../Cards/ErrorCard";
import axios from "axios";
import { APIBase } from "../../store/reducers/api";
import { toast } from "react-toastify";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('')

  const [addressName, setAddressName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState('')
  const [streetName, setStreetName] = useState('')
  const [area, setArea] = useState('')

  const [photo, setPhoto] = useState('')

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const { areas, isLoading, error } = useSelector(state => state.areas)

  useEffect(() => {
    dispatch(loadAreas())
  }, [])

  const createUserHandler = () => {
    const fd = new FormData();


    fd.append('firstName', firstName);
    fd.append('lastName', lastName);
    fd.append('email', email);
    fd.append('phoneNumber', phoneNumber);
    fd.append('password', password);
    fd.append('addressName', addressName);

    fd.append('buildingNumber', buildingNumber);
    fd.append('streetName', streetName);

    fd.append('addressArea', area);
    if (email && password && area && phoneNumber) {

      axios.post(`${APIBase}api/auth/register`, fd).then(res => {
        navigate('/login')
      }).catch((err) => {
        const errMsg = err.response.data.errors?.toString().split(',').join('\n');
        toast.error(`${errMsg}`, {
          position: "top-right",
          autoClose: 4500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
        });
      })
    }


  };

  return (
    <>
      {!isLoading && !error && areas && <div className="w-[65vw] border-[3px] border-black rounded-xl m-auto py-[3rem] px-[1rem] lg:px-[3rem] mt-[8rem] text-black">
        <h2 className="form__title">
          {/* {t("registerTitle")} */}
          Register
        </h2>
        <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

          <MiniText name={firstName} setName={setFirstName} label='first name' required />
          <MiniText name={lastName} setName={setLastName} label='last name' required />
        </div>

        <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

          <MiniText name={email} setName={setEmail} label='E-mail' required />
          <MiniText name={password} setName={setPassword} type="password" label='password' required />
        </div>
        <div className="form__input-container  flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">

          <MiniText name={phoneNumber} setName={setPhoneNumber} label='Phone' required />

          <Selector id={area} setId={setArea} label='area' required data={areas} />

        </div>

        <div className="form__input-container   flex flex-col lg:flex-row gap-[2rem] lg:gap-[4rem]">
          <MiniText width='50%' labelWidth='50%' name={addressName} setName={setAddressName} label='address name' required />

          <MiniText width='50%' labelWidth='45%' label='Building Number' name={buildingNumber} setName={setBuildingNumber} />
          <MiniText width='50%' labelWidth='45%' label='Street Name' name={streetName} setName={setStreetName} />

        </div>

        <div className="mt-5 form-btns">
          <div className="form-btn" onClick={createUserHandler}>
            {/* {t("registerTitle")} */}
            SignUp
          </div>
        </div>
      </div>}
      {isLoading && <Spinner />}
      {!isLoading && error && <ErrorCard />}
    </>
  )
}

export default SignUp
