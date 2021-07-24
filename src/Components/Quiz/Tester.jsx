import React from 'react'
import '../../sass/Components/Quiz/Tester.scss'
import Test from './Test'

const Tester = (props) => {
    return (
        <div className='Tester'>
            {props.question.tests.map((test, index) => {
                return (
                    <Test
                        key={`test${index}`}
                        userInput={props.userInput}
                        test={test}
                        testNumber={index + 1}
                        />
                )
            })}
        </div>
    )
}

export default Tester