import React from 'react'

const Entry = () => {
    const mood_palette = ['#9BD8DA', '#377173', '#D9D9D9', '#43AC25', '#B2ECA1']

  return (
    <div className='entry__recording' style={{ backgroundColor:mood_palette[0] }}>
        <div className='recording__title'> 
            {
                // put the title here
            }
        </div>
      
    </div>
  )
}

export default Entry