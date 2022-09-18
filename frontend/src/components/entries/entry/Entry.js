import React from 'react'
import './entry.css'

const Entry = ({ date, rating, speech, summary, setInfo, setUseModal }) => {
  const mood_palette = ['#B84A62', '#F17B50', '#E8DAAF', '#A8E096', '#00EE5B']

  const openModal = () => { 
    setInfo({ 
      date: date,
      rating: rating,
      speech: speech,
      summary: summary,
    })

    setUseModal(true);
  }

  return (
    <div onClick={ openModal } className='entry__recording' style={{ backgroundColor:mood_palette[rating] }}>
        <div className='recording__title'> 
            { summary }
        </div>
        <div className='recording__title'> 
            { date }
        </div>
    </div>
  )
}

export default Entry