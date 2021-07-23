import React, { useState } from 'react';

import '../../sass/Components/Quiz/Hint.scss'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const Hint = (props) => {
    const [showHint, setShowHint] = useState(false);

    return (
        <div
        className={showHint ? 'hint clicked' : 'hint'} >
            <li>
                <div className='hintTitle' onClick={() => setShowHint(!showHint)}>
                    <span>{props.hintName}</span>
                    <span> 
                        {showHint ? <TiArrowSortedUp size='1.5em'/> : <TiArrowSortedDown size='1.5em'/>}
                    </span>
                </div>                
                <span>{showHint ? props.hintText : null}</span>
            </li>
        </div>
    )
}

export default Hint