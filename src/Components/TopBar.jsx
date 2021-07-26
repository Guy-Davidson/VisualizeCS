import React, { useEffect, useState } from 'react'
import '../sass/Components/TopBar.scss'

import { Link } from 'react-router-dom'
import TopBarItem from './TopBar/TopBarItem'
import { data } from './TopBar/TopBarData'
import { AiOutlineHome, AiFillCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const TopBar = () => {
const [items, setItems] = useState(null) 

    useEffect( () => {
        setItems(data.map(item => <TopBarItem item={item} key={item.key}/>))
    }, [])

    return (
        <div className='TopBar'>  
            <div className='ItemsWrapper'>                
                    {items && items}                     
            </div>                      
            <div className='IconsWrapper'>
                <Link 
                    style={{ textDecoration: 'none' }}
                    className='icon'
                    to={{
                        pathname: `/`,            
                            }}>       
                    <div className='icon Home'>
                        {<AiOutlineHome />}
                    </div>
                </Link>                     
                <CgProfile className='icon'/>
            </div>
        </div>
    )
}

export default TopBar
