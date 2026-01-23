import React from 'react'
import { Progress } from '@/components/ui/progress'
const UsageCreditProgress = () => {
  return (
    <div className='p-3 border rounded-2xl mb-5 flex flex-col gap-2'>
<h2 className='font-bold text-xs'>Free Plan</h2>
<h2 className='text-gray-400'>0/5 message used</h2>
<Progress value={33}/>
    </div>
  )
}

export default UsageCreditProgress