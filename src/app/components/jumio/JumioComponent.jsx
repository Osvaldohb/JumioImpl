'use client'

import React from 'react'
import { JumioSdkComponent } from "@jumio/websdk";


const JumioComponent = ({token}) => {
  return (
    <div>


        <jumio-sdk dc="us" token={token}>
    
        </jumio-sdk>

        <JumioSdkComponent  dc="us" token={token}></JumioSdkComponent>

    </div>
  )
}

export default JumioComponent