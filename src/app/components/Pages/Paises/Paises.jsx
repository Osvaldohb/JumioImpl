'use client';

import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import './paises.css';
import Footer from '../../Footer/Footer';
import { Form } from "react-bootstrap";


const Paises = () => {
const [hasMounted, setHasMounted] = useState(false); // Evita mismatch
const [showCurp, setShowCurp] = useState(false);
const [msjnumeroNacional, setmsjnumeroNacional] = useState('');
const [isButtonEnabled, setButtonEnabled] = useState(false);
const [game, setGame] = useState("1");
const ref = useRef(null);
const [curpStr, setCurpStr] = useState("");
const [caracteres, setCaracteres] = useState(0);
const [blContinueOp, setBlContinueOp] = useState("1");
const [rutaBackCpv, setRutaBackCpv] = useState("");



useEffect(() => {
  if (curpStr.length < caracteres) {
    setBlContinueOp("1");
  }
  setRutaBackCpv("/?i=" + localStorage.getItem("sCpv"));
});

const handleChange = (event) => {
  if (event.target.value.length < caracteres + 2) {
    setCurpStr(event.target.value.toUpperCase());
  }

  if (event.target.value.length === caracteres) {
    setBlContinueOp("2")
  }
};

useEffect(() => {
  setHasMounted(true);
}, []);

if (!hasMounted) return null;

const handleChangePais = (selectedOption) => {
  const claveIso3 = selectedOption.claveIso3;
  setCaracteres(selectedOption.caracteres);
  setmsjnumeroNacional(selectedOption.numeroNacionalTxt);
  localStorage.setItem('pais', claveIso3);
  localStorage.setItem('paisIso2', selectedOption.claveIso2);
  setShowCurp(true);
  setButtonEnabled(true);
};
  
const handleClick = (event) => {
  if (document.activeElement === ref.current) {
  } else { }
};

  
const handkeOnKeyDown = async (event) => {
  if (
    event.code === "Enter" ||
    event.code === "NumpadEnter" ||
    event.keyCode === 13
  ) {
    onValidateCurp();
  }
};

const onValidateCurp = async () => {
  setGame("2");
  if (localStorage.getItem("curpValidate") === curpStr) {
    const objPerson = {
      cpv: localStorage.getItem("sCpv"),
    };
    const responseIdPerson = await mtfindCpv(objPerson);
    if (responseIdPerson.status === 400) {
      setGame("3");
      setBlContinueOp("3");
    } else if (responseIdPerson.status === 200) {
      setGame("3");
      setBlContinueOp("4");
    } else {
      setShow(true);
      setShowStatus(responseIdPerson.status);
      setShowMessage(responseIdPerson.message);
    }
  } else {
    setShow(true);
    setShowStatus('Credenciales inválidas');
    setShowMessage('El Número de Identificación Nacional no es correcto. Por favor, verifique sus datos e intente de nuevo');
  }
};

const country = [
  {
    claveIso2: 'MX',
    claveIso3: 'MEX',
    nombre: 'México',
    ruta: 'https://flagcdn.com/w40/mx.png',
    caracteres: 18,
    numeroNacionalTxt: 'CURP',
  },
  {
    claveIso2: 'AR',
    claveIso3: 'ARG',
    nombre: 'Argentina',
    ruta: 'https://flagcdn.com/w40/ar.png',
    caracteres: 11,
    numeroNacionalTxt: 'DNI',
  },
];

const style = {
  control: (base) => ({
    ...base,
    borderColor: '#c4cbd1',
    height: '52px',
    paddingLeft: '5px',
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? '#f5f5f5' : 'white',
    color: '#333',
  }),
};


return (
  <main className="containerRender onContentExpands animate__animated animate__fadeIn">
    <section className="containerInfo_P2">
      <div className="containerIdent_P2">
        <div className="txtNat_P3">Nacionalidad</div>
        <div style={{padding: '15px 0'}}>
          <Select
            options={country}
            onChange={handleChangePais}
            styles={style}
            formatOptionLabel={(country) => (
              <div className="animate__animated animate__fadeIn containerNac">
                <div className="pais">{country.claveIso2} {country.nombre}</div>
                <div className="animate__animated animate__fadeIn paisBandera">
                  <img className="bandera" src={country.ruta} alt={country.nombre} />
                </div>
              </div>
            )}
            placeholder="Seleccionar nacionalidad"
          />
        </div>

        <div style={{ display: showCurp ? 'block' : 'none' }} className="containerInfoOnExpands">
          <div className="txtNum_P3">Número de Identificación Nacional</div>
            <div style={{padding: '15px 0'}}>
            {(() => {
              switch (game) {
                case "1":
                  const style = {
                    borderColor: "#c4cbd1 !important",
                    display: "block",
                    width: "100%",
                    padding: "7px 0 7px 7px",
                    border: "1px solid #c4cbd1",
                    borderRadius: "0.375rem",
                    height: "52px",
                  };

                  return (
                    <>
                      <Form>
                        <input
                          style={style}
                          required={true}
                          maxLength={18}
                          type="text"
                          ref={ref}
                          placeholder={msjnumeroNacional}
                          value={curpStr}
                          onChange={handleChange}
                          onClick={handleClick}
                          onKeyDown={handkeOnKeyDown}
                        />
                      </Form>
                    </>
                  );
                case "2":
                const style2 = {
                  borderColor: "#c4cbd1 !important",
                  display: "block",
                  width: "100%",
                  padding: "12px 0px 12px 15px",
                  border: "1px solid #c4cbd1",
                  borderRadius: "8px 0 0 8px",
                  height: "52px !important",
                };

                return (
                  <>
                    <div className="Row_P3">
                      <div className="Column_P3">
                        <Form.Control
                          style={style2}
                          required={true}
                          maxLength={18}
                          type="text"
                          ref={ref}
                          placeholder={msjnumeroNacionalPholder}
                          value={curpStr}
                          onChange={handleChange}
                          onClick={handleClick}
                          onKeyDown={handkeOnKeyDown}
                        />
                      </div>
                      <div className="Column1_P3 animate__animated myDiv_P3">
                        <div className="myDiv_P3_3">
                          <Spinner
                            className="spinerColor"
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            variant="light"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                );
                case "3":
                const style3 = {
                  borderColor: "#c4cbd1 !important",
                  display: "block",
                  width: "100%",
                  padding: "12px 0px 12px 15px",
                  border: "1px solid #c4cbd1",
                  borderRadius: "8px 0 0 8px",
                  height: "52px !important",
                };
                return (
                  <>
                    <div className="Row_P3 ">
                      <div className="Column_P3">
                        <Form.Control
                          style={style3}
                          required={true}
                          maxLength={18}
                          type="text"
                          ref={ref}
                          placeholder={msjnumeroNacionalPholder}
                          value={curpStr}
                          onChange={handleChange}
                          onClick={handleClick}
                          onKeyDown={handkeOnKeyDown}
                        />
                      </div>
                      <div className="Column1_P3 animate__animated myDiv_P3">
                        <div className="myDiv_P3_3 ">
                          <img src={check} />
                        </div>
                      </div>
                    </div>
                  </>
                );
                case "4":
                return <></>;
                default:
                return null;
              }
            })()}
            {(() => {
              switch (blContinueOp) {
                case "1":
                  return (
                    <section className="btnRenderPercent">
                      <br />
                      <hr className="line" />
                      <br />
                      <button className="btnVer_P3 ">
                        <span className="txtVer_P3">Verificar</span>
                      </button>
                    </section>
                  );
                case "2":
                  return (
                    <section className="btnRenderPercent">
                      <br />
                      <hr className="line" />
                      <br />
                      <button
                        className="btnVer_P3_Select"
                        onClick={onValidateCurp}
                        onChange={handleClick}
                      >
                        <span className="txtVer_P3">Verificar</span>
                      </button>
                    </section>
                  );
                case "3":
                  return (
                    <section className="btnRenderPercent">
                      <hr className="line" />
                      <button
                        className="button_P2 animate__animated animate__fadeIn"
                        onClick={onModalShow}
                      >
                        <span className="txtButton_P2">Continuar</span>
                      </button>
                      <br />
                    </section>
                  );
                case "4":
                  return (
                    <section className="btnRenderPercent">
                      <hr className="line" />
                      <button
                        className="button_P2 animate__animated animate__fadeIn"
                        onClick={onValidateFaceMach}
                      >
                        <span className="txtButton_P2">Continuar</span>
                      </button>
                      <br />
                    </section>
                  );
                default:
                return null;
              }
          })()}
          </div>
        </div>
        

      </div>
    </section>
    <Footer />
  </main>
);
};

export default Paises;
