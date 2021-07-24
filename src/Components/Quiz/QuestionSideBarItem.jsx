import React, { useState, useEffect } from 'react'
import '../../sass/Components/Quiz/QuestionSideBarItem.scss'
import { Link, useLocation } from 'react-router-dom'

const QuestionSideBarItem = (props) => {
    const [isActive, setIsActive] = useState(false)
    let url = useLocation();

    useEffect( () => {        
        `/Quiz/${props.link}` === url.pathname ? setIsActive(true) : setIsActive(false)
        
    }, [url, props.link])
    return (     
        <Link
            style={{ textDecoration: 'none' }}
            className={isActive ? 'QuestionButton ActiveQuestion' : 'QuestionButton'}
            to={{
            pathname: `/Quiz/${props.link}`,            
                }}>   
            <div className='name'>
                {props.title}                
            </div>    
        </Link>   
    )
}

export default QuestionSideBarItem