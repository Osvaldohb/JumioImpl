'use client';

import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { getOcrPais } from '../../Api/getOcrPais';
import { ApiJumioFaceMatchToken } from '../../Api/ApiJumioFaceMatchToken';
import { useAppContext } from '../../../context/AppContext';
import Link from 'next/link';

const Dataconfirm = () => {

      const [loading, setLoading] = useState(false);


        const [firstName, setFirstName] = useState('');
        const [paternalLastName, setPaternalLastName] = useState('');
        const [maternalLastName, setMaternalLastName] = useState('');
        const [birthDate, setBirthDate] = useState('');
        const [claveDeElector, setClaveDeElector] = useState('');
        const [sexo, setSexo] = useState("");
        const [nacionalidad, setNacionalidad] = useState("");
        const [nacionalidadISO, setNacionalidadISO] = useState("");
        const [show, setShow] = useState(false);
        const [showStatus, setShowStatus] = useState(null);
        const [showMessage, setShowMessage] = useState('');
        const [verNameFull, setverNameFull] = useState(false);
        const {cpvI} = useAppContext();
        const {setTokenJumio} = useAppContext();

        useEffect(() => {
          setFirstName(localStorage.getItem("nombre") || '');
          setPaternalLastName(localStorage.getItem("paterno") || '');
          setMaternalLastName(localStorage.getItem("materno") || '');
          setBirthDate(localStorage.getItem("fechaNacimientoFront") || '');
          setClaveDeElector(localStorage.getItem("curpValidate") || '');
          setSexo(localStorage.getItem("sexo") || '');
          setNacionalidad(localStorage.getItem("nacionalidad") || '');
          setNacionalidadISO(localStorage.getItem("nacionalidadISO") || '');
        }, []);


        
      const fetchData = async () => {
        const data = await ApiJumioFaceMatchToken(cpvI || localStorage.getItem('sCpv'));
        if (!data) {
          console.error('No data found');
          return;
        }
        if (data.status === 200) {
          setTokenJumio(data.sdk.token);

        } else {
          console.error('Error fetching data:', data.message);
          throw new Error(data.message);
        }

      }

    useEffect(() => {
      fetchData();

    setLoading(false);


    async function createSession() {

      setLoading(false);

      const objIncode = {
        interviewId: localStorage.getItem("interviewIdINE"),
        tokenIncode: localStorage.getItem("tokenIncodeINE"),
        curpValidate: localStorage.getItem("curpValidate"),
        nombre: localStorage.getItem("nombre"),
        paterno: localStorage.getItem("paterno"),
        materno: localStorage.getItem("materno"),
        fechaNacimientoFront: localStorage.getItem("fechaNacimientoFront"),
        pais: localStorage.getItem("pais"),
      }

      const response = await getOcrPais(objIncode);

      if (response.status === 200) {

        setBirthDate(response.birthDateStr);
        setFirstName(response.nombre);
        setPaternalLastName(response.primerApellido);
        setMaternalLastName(response.segundoApellido);

        if (response.nameFullCompleto === true) {
          setverNameFull(true);
        }

        setClaveDeElector(localStorage.getItem("curpValidate"));
        setSexo(response.sexo);
        setNacionalidad(response.nacionalidad);
        setNacionalidadISO(response.nacionalidadISO);
        setLoading(false);

      } else {

        setLoading(false);
        setShow(true);
        setShowStatus(response.status);
        setShowMessage(response.message);

      }

    }

    createSession();

  }, []);


  return (
   <>
   
      <div className="containerRender">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="containerInfo_P2">
            <div className="containerIdent_P2">

              {!verNameFull ? (
                <>
                  <div className="txtOp_P2">Nombre/Given name</div>
                  <div className="txtVer_P2">{firstName}</div>
                </>
              ) : (
                <>
                  <div className="txtOp_P2">Nombres/Given names</div>
                  <div className="txtVer_P2">{firstName}</div>

                  <div className="txtCpv_P2">Apellidos/Surname</div>
                  <div className="txtVer_P2">
                    {paternalLastName} {maternalLastName}
                  </div>
                </>
              )}

              <div className="txtOp_P2">Fecha de nacimiento/Date of birth</div>
              <div className="txtVer_P2">{birthDate}</div>
              <div className="txtOp_P2">Sexo/Sex</div>
              <div className="txtVer_P2">{sexo}</div>
              <div className="txtOp_P2">Nacionalidad/Nationality</div>
              <div className="txtVer_P2">{nacionalidadISO}  {nacionalidad}</div>
              <div className="txtOp_P2">
                Número de Identificación/Identity Number
              </div>
              <div className="txtVer_P2">{claveDeElector}</div>
            </div>
 
          </div>
        )}

           <Link href="/jumiocomponent" className="btnBack_P2">
              <section className="containerButtonOnExpands_P2 m-1.5">
                  <button
                    className="btnVer_P14OK buttonExpandsBase"
                     >
                    <span className="txtVer_P14OK">Continuar</span>
                  </button>
                  <br />
                </section>
            </Link>
   
      </div>


   </>
  )
}

export default Dataconfirm