'use client'

import { useEffect, useState } from 'react'
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'

import dynamic from 'next/dynamic'
import { JumioAccountCreation } from '../Api/jumioAccountCreation'
import { FetchAccAWS } from '../Api/FetchAccAWS'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {
  const [sdkToken, setSdkToken] = useState('')

  useEffect(() => {
    const fetchSdkToken = async () => {
      try {
        const tokenData = await FetchAccAWS()
        console.log('Jumio SDK Token:', tokenData)
       setSdkToken(tokenData.sdk.token)
      } catch (error) {
        console.error('Error generating Jumio SDK token:', error)
      }
    }

    fetchSdkToken()
  }, [])

  if (!sdkToken) return <p>Loading Jumio...</p>

  return <JumioComponent token={sdkToken} />
}