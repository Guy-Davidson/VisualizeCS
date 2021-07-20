import React, { useEffect, useState } from 'react'
import '../sass/Components/TopBar.scss'

import TopBarItem from './TopBar/TopBarItem'
import { data } from './TopBar/TopBarData'

const TopBar = () => {
const [items, setItems] = useState(null) 

    useEffect( () => {
        setItems(data.map(item => <TopBarItem item={item} key={item.key}/>))
    }, [])

    return (
        <div className='TopBar'>            
            {items && items}
        </div>
    )
}

export default TopBar
