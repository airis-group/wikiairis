import {useEffect, useState} from 'react'
import ValidasiLabel from './timb/ValidasiLabel'
import ValidasiEntitasLabel from './timb/ValidasiEntitasLabel'
import ValidasiEntitasSpan from './timb/ValidasiEntitasSpan'

const TeamB = () => {
    const [mod, setMod] = useState('lb')

  return (
    <div className="w-full">
        TeamB


        <ValidasiLabel />
        {/* <ValidasiEntitasLabel />
        <ValidasiEntitasSpan /> */}

    </div>
  )
}

export default TeamB