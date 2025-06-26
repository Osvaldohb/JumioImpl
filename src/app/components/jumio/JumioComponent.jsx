'use client'

import React from 'react'
import { JumioSdkComponent } from "@jumio/websdk";


const JumioComponent = ({token}) => {
  return (
    <div className='h-screen'>


        <jumio-sdk dc="us" token={token}>
    
        </jumio-sdk>
       


    </div>
  )
}

export default JumioComponent