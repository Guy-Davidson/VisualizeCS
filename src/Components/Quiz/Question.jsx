import React, { useEffect, useState } from 'react';
import Hint from './Hint';
import Solution from './Solution';
import '../../sass/Components/Quiz/Question.scss'
import { BiBrain } from 'react-icons/bi';
import { FaCircle, FaStar, FaRegStar, FaCoins } from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';

const MODE_QUESTION = 1;
const MODE_SOLUTIONS = 2;


const Question = (props) => {
    const { question } = props;
    const [isStared, setIsStared] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [mode, setMode] = useState(MODE_QUESTION);
    const [exp, setEXP] = useState(question.maxEXP);    
    const [solutionLockList, setSolutionLockList] = useState({})

    useEffect(() => {
        initSolutionLockList();        
    }, [])

    const initSolutionLockList = () => {             
        let initSolutionLockList = {};        
        question.solutions.forEach((solution) => {                        
            initSolutionLockList[solution._id] = true;            
        })                
        setSolutionLockList(initSolutionLockList);
    }

    const handleUnlockClick = (id, price) => {              
        if(solutionLockList[id]){            
            let newsolutionLockList = solutionLockList;        
            newsolutionLockList[id] = false;    
            setSolutionLockList(newsolutionLockList)
            setEXP(exp - price);
        }
    }

    const handleRunClick = () => {
        let newsolutionLockList = solutionLockList;
        Object.keys(newsolutionLockList).forEach((key) => newsolutionLockList[key] = false);
        setSolutionLockList(newsolutionLockList);
    }

    const renderDifficulty = () => {
        return (
            <div>
                {[...Array(question.difficulty)].map((elm,idx) => {
                    return (
                        <BiBrain 
                        key={question.id + 'brain' + idx}
                        size='1.2em'
                        style={{margin: '0 2px 0 2px', color:'pink'}}/>
                    )
                })}
            </div>
        )
    }

    const renderHints = () => {        
        return (
            <ul>
            {question.hints.map((hint, hintIdx) => {
                const hintText = hint.text;
                if(hintIdx === question.hints.length - 1){
                    return (
                        <Hint 
                        key={question.id + 'hint' + hintIdx}
                        hintText={hintText}
                        hintName={"Optimal Time & Space Complexity"}/>                        
                    )
                }
                return (
                    <Hint 
                    key={question.id + 'hint' + hintIdx}
                    hintText={hintText}
                    hintName={"Hint " +  (1 + hintIdx).toString()}/>
                )
            })}
        </ul>
        )
    }

    const renderSolutions = () => {   
        return (
            <div className='solutions'>
                <div className='hacking-exp'>
                    <span>Hacking Experience: </span>
                    <span>{exp} <FaCoins style={{color:'#ffba08'}}/></span>
                </div>
                <ul>
                {question.solutions.map((solution, solutionIdx) => {                    
                    let id = solution._id;
                    let isLocked = solutionLockList[id];

                    return (
                        <Solution 
                        key={id}
                        id={id}
                        isLocked={isLocked}
                        solutionText={solution.text}
                        solutionIdx={1 + solutionIdx}
                        price={solution.price}
                        handleUnlockClick={handleUnlockClick}/>
                    )
                })}
            </ul>
        </div>
        )
    }

    const renderQuestion = () => {
        return (
            <div className='question'>
                <div className='meta-data'>
                    <div className='difficulty'>
                        <span>Difficulty: </span>
                        {renderDifficulty()}
                    </div>
                    <div className='category'>
                        <span>Category: </span>
                        <span>{question.category}</span>
                    </div>
                    <div className='exp'>
                        <span>Credits: </span>
                        <span style={{whiteSpace:'nowrap'}}>{question.maxEXP} <FaCoins style={{color:'#ffba08'}}/></span>
                    </div>
                    <div className='submissions'>
                        <span>Successful Submissions: </span>
                        <span>{question.successfulSubmission}+</span>
                    </div>
                </div>
                <div className='description'>
                    <div className='header'>
                        <span className='title'>{question.title}</span> 
                        <span className='isCompleted'
                        onClick={() => {
                            setIsCompleted(!isCompleted);
                            handleRunClick();
                        }}>                         
                            {isCompleted ? <FaCircle size='1.3em'/> : <FiCircle size='1.3em'/>}
                        </span>
                        <span onClick={() => setIsStared(!isStared)} className='iStared'>
                             {isStared ? <FaStar size='1.3em' /> : <FaRegStar size='1.3em' />}
                        </span>
                    </div>
                    <div className='text'>
                        <p>
                            {question.description}
                        </p>
                    </div>
                </div>
                <div className='IO'>
                    <div className='input'>
                        <span className='title'>Sample Input</span>
                        <div className='code'>                        
                            {question.inputCode}                        
                        </div>
                    </div>
                    <div className='output'>
                        <span className='title'>Sample Output</span>
                        <div className='code'>                            
                            {question.outputCode}                            
                        </div>
                    </div>
                </div>
                <div className='hints'>
                    <span className='title'>Hints</span>
                    <div className='list'>
                        {question.hints ? renderHints() : null}
                    </div>
                </div>
            </div>
        )
    }

    const renderFeature = () => {
        if(mode === MODE_QUESTION){
            return renderQuestion()
        } else if(mode === MODE_SOLUTIONS){
            return renderSolutions()
        }
    }


    return (
        <div className='question-editor'>
            <div className='feature'>                
                <span className={mode === MODE_QUESTION ? 'option clicked' : 'option'}
                    onClick={() => setMode(MODE_QUESTION)}
                    >Question</span>
                <span className={mode === MODE_SOLUTIONS ? 'option clicked' : 'option'}
                    onClick={() => setMode(MODE_SOLUTIONS)}
                    >Our Solutions</span>
            </div>
            {renderFeature()}
        </div>
    )
}

export default Question;