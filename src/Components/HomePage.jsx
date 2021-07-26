import React from 'react'
import '../sass/Components/HomePage.scss'


import { GiCyberEye } from "react-icons/gi";

const HomePage = () => {
    return (
        <div className='HomePage'>
            <div className='TitleWraper'>
                <GiCyberEye 
                    size={`25rem`}
                    className='icon'/>  
                <div className='Text'>
                    {`Welcome \n to AlgoSight`}
                </div>  
            </div>  
            <div className='TagText'>
                Your CS Guide</div>                    
        </div>
    )
}

export default HomePage