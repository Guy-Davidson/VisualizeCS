import React, { useState } from 'react'
import '../../sass/Components/Quiz/Tester.scss'
import Test from './Test'
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Tester = (props) => {
    const [gotError, setGotError] = useState(false)

    const renderTests = () => {
        return (
            <div className='TestWrapper'>
                {props.question.tests.map((test, index) => {
                    return (
                        <Test
                            key={`test${index}`}
                            userInput={props.userInput}
                            test={test}
                            testNumber={index + 1}
                            setGotError={setGotError}
                            />
                    )
                })}
            </div>
            
        )
    }

    const renderError = () => {        
        return (
            <div className='Error'>
                <FiX 
                    className='WrongIcon'
                    size={`4rem`} />
                Opps! Your Code Failed to Compile...
            </div>
        )
    }

    return (
        <div className='Tester'>
            {gotError ? renderError() : renderTests()}
        </div>
    )
}

export default Tester