'use client'
import { useEffect, useState } from 'react'
import { AccountCreation } from '../Api/AccountCreation'
import { FetchToken } from '../Api/Fetch'

import dynamic from 'next/dynamic'

const JumioComponent = dynamic(() => import('./JumioComponent'), { ssr: false })

export default function JumioJsx() {
  const [token, setToken] = useState('')


  return (
    <div className="h-screen">
      <JumioComponent token="eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_5XLOw4CMQwE0LukxpLzd-goabmB49iIhgJWAglxd5K9AcUUM3rzcfo-be7ofM1IrUScIXdwLHIeczdUTUoNQh4KKWoASsoQOyv1gSKBF99xzRVDI4W4XMpYgTrxvA0Rz5HMbOKX6T9cLmpTP7fH7X5dfT_7Yd5KR1DRBKkwAxt2IE9N-sjci7jvD7rXvvbgAAAA.6ggYHuRGPg6ztzKnCYnAwIae4wGZTvOH2QEnMTpzYggKdu2oRrB_DeHzcZokSiKmCeRGSJLSdZT_8-UVuYzm4Q" />
    </div>
  )
}