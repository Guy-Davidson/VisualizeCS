import React, { useEffect, useState } from 'react'
import '../../sass/Components/Sorting/Sorter.scss'
import Bar from './Bar'

const Sorter = () => {
    const [length, setLength] = useState(30)
    const [bars, setBars] = useState([])

    useEffect( () => {
        initBars()
    }, [])

    const initBars = () => {
        let currentBars = []

        for (let i = 0 ; i < length; i++) {
            currentBars.push(
                <Bar 
                    barVal={Math.floor(Math.random() * 99) + 1}
                    length={length}/>
            )
        }
        
        setBars(currentBars)
    }

    return (
        <div className='Sorter'>
            <div className='SideBar'>
                <span>
                    press me
                </span>
            </div>

            <div className='Port'>
                {bars}                
            </div>
        </div>
    )
}

export default Sorter