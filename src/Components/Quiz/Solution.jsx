import React, { useState } from 'react';
import '../../sass/Components/Quiz/Solution.scss'
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaLock, FaLockOpen } from "react-icons/fa";


const Solution = (props) => {
    const [showSolution, setShowSolution] = useState(false);
    const [isLocked, setIsLocked] = useState(props.isLocked);

    const solutionCodeBlock = () => {        
        return (
            <div>
                {props.solutionText}
            </div>            
        )
      }

    const solutionByMode = () => {
        if(isLocked) {
            return(
                <div className='unlock-solution'>
                    <span>Unlock Solution? </span>
                    <span 
                        className='yes'
                        onClick={() => {
                            props.handleUnlockClick(props.id, props.price)
                            setIsLocked(false);
                        }}>
                        Yes
                    </span>
                    <span 
                        className='no'
                        onClick={() => setShowSolution(!showSolution)}>
                        No
                    </span>
                </div>
            )
        } else {
            return solutionCodeBlock()
        }
    }

    const lockIcon = () => {
        if(isLocked) {
            return (
                <div className='right-tools'>
                    <span className='tool'>
                        {props.price}
                    </span>
                    <FaLock className='tool' size='1.2em'/>                    
                    <span> 
                        {showSolution ? <TiArrowSortedUp size='1.5em'/> : <TiArrowSortedDown size='1.5em'/>}
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    <FaLockOpen className='tool' size='1.2em'/>
                    <span> 
                    {showSolution ? <TiArrowSortedUp size='1.5em'/> : <TiArrowSortedDown size='1.5em'/>}
                    </span>
                </div>
            )
        }
    }
    

    return (
        <div 
        className={showSolution ? 'solution clicked' : 'solution'}>
            <li>
                <div className='solutionTitle' onClick={() => setShowSolution(!showSolution)}>
                    <span>Solution {props.solutionIdx}</span>                    
                    {lockIcon()}                    
                </div>                
                <span className='code'>
                    {showSolution ? solutionByMode() : null}                    
                </span>
            </li>
        </div>
    )
}

export default Solution