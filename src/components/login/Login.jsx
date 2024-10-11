"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import FormLogin from "./FormLogin";

import FormCreateUser from "./FormCreateUser";
import Image from "next/image";
import sjl from "@/assets/logo.png"
import ModalPasswordReset from "../modalview/ModalPasswordReset";
export const Login = () => {
  const [view, setView] = useState(true);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
      password: "",
    },

    validate: {
      dni: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI valido"),
      password: (value) => {
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
        // if (!/[A-Z]/.test(value)) return "La contraseña debe tener al menos una letra mayúscula";
        // if (!/[a-z]/.test(value)) return "La contraseña debe tener al menos una letra minúscula";
        // if (!/[0-9]/.test(value)) return "La contraseña debe tener al menos un número";
        // if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "La contraseña debe tener al menos un carácter especial";
        return null;
      },
    },
  });

  const registreForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
      firstName: "",
      lastName: "",
      department: "",
      province: "",
      district: "",
      mobileNumber: "",
      email: "",
      password: "",
      // birthDate:"",
    },
  
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      dni: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI válido"),
      mobileNumber: (value) =>
        /^\d{9}$/.test(value) ? null : "Ingrese un número válido",
      firstName: (value) =>
        value.trim() ? null : "El nombre es obligatorio",
      // birthDate: (value) =>{
      //   if (!value) {
      //     return "Fecha de nacimiento obligatoria";
      //   }
      // },
      lastName: (value) =>
        value.trim() ? null : "El apellido es obligatorio",
      department: (value) =>
        value.trim() ? null : "El departamento es obligatorio",
      province: (value) =>
        value.trim() ? null : "La provincia es obligatoria",
      district: (value) =>
        value.trim() ? null : "El distrito es obligatorio",
      password: (value) => {
        if (value.length < 6) return "La contraseña debe tener al menos 6 caracteres";
        // if (!/[A-Z]/.test(value)) return "La contraseña debe tener al menos una letra mayúscula";
        // if (!/[a-z]/.test(value)) return "La contraseña debe tener al menos una letra minúscula";
        // if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "La contraseña debe tener al menos un carácter especial";
        return null;
      },
    },
  });
  
  const handleReset = ()=>{
    registreForm.reset();
    setView(true)
  }

  return (
    <div className={` border-2 px-8 py-10 bg-white rounded-xl ${view ? "login" : "registre"} `}>
      {/* title */}
       <div className="flex justify-center items-center mb-2"><Image src={sjl} width={250} alt="logo san juan de lurigancho"/></div>
      <h2 className={`text-center text-[1.2rem] font-medium mb-4`}>{view ? "INGRESAR A GENERADOR DE CITAS" : "CREAR CUENTA"}  </h2>
      {/* form */}
      {view && <FormLogin form={form} />}
      {!view && <FormCreateUser registreForm={registreForm}  setView={setView} />}
      {/* link bottom nav */}
      {view && (
        <div className="flex justify-between mt-3">
          {/* <p className="text-xs">Olvide mi contraseña</p> */}
          <ModalPasswordReset/>
          <span className="flex gap-3">
            <p onClick={() => setView(false)} className="text-xs cursor-pointer-login">Crear Cuenta</p>
          </span>
        </div>
      )}
      {!view && (
        <div className="mt-3 w-full">
         <p className="flex items-center justify-center text-xs cursor-pointer-login" onClick={()=>handleReset()}>Ya tengo cuenta</p>
        </div>
      )}
    </div>
  );
};
