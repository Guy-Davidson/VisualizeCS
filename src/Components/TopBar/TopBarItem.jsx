import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../sass/Components/TopBarItem.scss'

const TopBarItem = (props) => {
    const { item } = props;       
    const [isActive, setIsActive] = useState(false)
    let url = useLocation();

    useEffect( () => {        
        `/${item.key}` === url.pathname ? setIsActive(true) : setIsActive(false)
        
    }, [url, item.key])

    return (        
        <Link 
          className={isActive ? 'TopBarItem Active' : 'TopBarItem'}
          to={{
            pathname: `/${item.link}`,            
                }}>       
            <div className='icon'>
                {item.icon}
            </div>
            <div className='name'>
                {item.name}
            </div>
        </Link>        
    )
}

export default TopBarItem