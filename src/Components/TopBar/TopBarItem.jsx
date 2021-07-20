import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '../../Hooks/UseQuery.jsx'
import '../../sass/Components/TopBarItem.scss'

const TopBarItem = (props) => {
    const { item } = props;   
    let query = useQuery().get("mode")
    const [isActive, setIsActive] = useState(false)

    useEffect( () => {
        item.key === query ? setIsActive(true) : setIsActive(false)
    }, [query])

    return (        
        <Link 
          className={isActive ? 'TopBarItem Active' : 'TopBarItem'}
          to={{
            pathname: `/`,
            search: `?mode=${item.link}`
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