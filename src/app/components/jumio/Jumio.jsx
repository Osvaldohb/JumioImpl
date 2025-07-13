'use client'

import { use, useEffect, useState } from 'react'
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'

import dynamic from 'next/dynamic'
import { JumioAccountCreation } from '../Api/jumioAccountCreation'
import { FetchAccAWS } from '../Api/FetchAccAWS'
import { useSearchParams } from 'next/navigation'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {
  const [sdkToken, setSdkToken] = useState('')
  const searchParams = useSearchParams()


  useEffect(() => {
    const cpv = searchParams.get('i')
    if (!cpv) {
      console.error('No cpv found in search params')
      return
    }
    const fetchSdkToken = async () => {
      try {
        const tokenData = await FetchAccAWS(cpv)
        if (!tokenData || !tokenData.sdk || !tokenData.sdk.token) {
          throw new Error('Invalid token data received')
          
        }else{
        setSdkToken(tokenData.sdk.token)
        }


      } catch (error) {
        alert('Error generating Jumio SDK token:', error)
      }
    }

    fetchSdkToken()
  }, [])

  if (!sdkToken) return <p>Loading Jumio...</p>

  return <JumioComponent token={sdkToken} />
}