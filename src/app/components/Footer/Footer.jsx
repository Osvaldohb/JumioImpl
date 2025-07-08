'use client'

import React from 'react'
import { useState } from 'react';

const Footer = () => {

      const [validateCurpCpv, setValidateCurpCpv] = useState(true);

        const onTest = async () => {
    
  };

    const onValidateFaceMach = async () => {


  };


  return (
    <footer className='footer'>
      <div >
        <div className="containerCont_P2">
          {validateCurpCpv ? (
            <>
              <button className="button_P2 buttonExpandsBase " onClick={onTest}>
                <span className="txtButton_P2">Confirmar</span>
              </button>
            </>
          ) : (
            <>
              <button className="button_P2 buttonExpandsBase " onClick={onValidateFaceMach}>
                <span className="txtButton_P2">Confirmar</span>
              </button>
            </>
          )}
        </div>
        <div className="imageContainer_P2">
          <img src='/assets/foodbrand@2x.png' className="imgFooter_P2" />
        </div>
      </div>
    </footer>
  )
}

export default Footer