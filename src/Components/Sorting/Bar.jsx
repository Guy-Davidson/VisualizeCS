import React from 'react'
import '../../sass/Components/Sorting/Bar.scss'
import { arrayBarColor } from './SortingUtilities'

const Bar = (props) => {   
    const { barVal } = props    
    const { isHighlighted } = props 

    return (
        <div className='Bar' 
            style={{                               
                backgroundColor: isHighlighted ? '#ffdd00' : arrayBarColor(barVal), 
                width: `100%`,
                height: `${barVal}%`
                }}>            
        </div>
    )
}

export default Bar