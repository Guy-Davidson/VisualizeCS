import React, { useEffect, useState } from 'react'
import '../../sass/Components/Quiz/Test.scss'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner"; 
import { GrStatusGood, GrClose } from 'react-icons/gr';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Test = (props) => {
    const userInput = props.userInput
    const input = props.test.input 
    const output = props.test.output 

    const [isLoading, setIsLoading] = useState(true)
    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)     

    useEffect( () => {
        let userResult = eval(userInput + input)
        arrayEquals(userResult, output) ? setIsCorrect(true) : setIsWrong(true)
    }, [])

    const arrayEquals = (a, b) => {
        return Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index]);
      }

    const renderLoader = () => {
        setTimeout( () => {
            setIsLoading(false) 
        }, 3000)

        return (
            <div className='Loader'>
                <Loader 
                    type="TailSpin" 
                    color="#00BFFF" 
                    height={40} 
                    width={40} 
                    />
                {`test ${props.testNumber}`}
            </div>
        )
    }

    const renderCorrect = () => {
        return (
            <div className='TestResult'>
                <FiCheckCircle 
                    className='CorrectIcon'
                    size={`4.5rem`}                     
                    />
                <span>Pass!</span>
            </div>            
        )
    }
    
    const renderWrong = () => {
        return (
            <div className='TestResult'>
                <FiX 
                    className='WrongIcon'
                    size={`5rem`} />
                <span>Failed</span>
            </div>            
        )
    }

    return (
        <div className='Test'>
            {isLoading && renderLoader()}
            {!isLoading && isCorrect && renderCorrect()}
            {!isLoading && isWrong && renderWrong()}
        </div>
    )
}

export default Test