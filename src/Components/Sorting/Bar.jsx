import React, { useState } from 'react'
import '../../sass/Components/Sorting/Bar.scss'

const Bar = (props) => {   
    const { barVal, length } = props
    const width = 1 / length
    
    
    const arrayBarColor = (barVal) => {
        if (barVal < 10) {
          return "#001845";
        } else if (barVal < 20) {
          return "#2C306E";
        } else if (barVal < 30) {
          return "#12257A";
        } else if (barVal < 40) {
          return "#1A88C7";
        } else if (barVal < 50) {
          return "#4AA6CF";
        } else if (barVal < 60) {
          return "#13B9DB";
        } else if (barVal < 70) {
          return "#2ACAE6";
        } else if (barVal < 80) {
          return "#7EE5D9";
        } else if (barVal < 90) {
          return "#FFE3BC";
        } else {
          return "#E6FEFE";
        }
      }

    return (
        <div className='Bar' 
            style={{
                backgroundColor: arrayBarColor(barVal),                
                // width: `${width}%`
                height: `${barVal}%`
                }}>
            {barVal}
        </div>
    )
}

export default Bar