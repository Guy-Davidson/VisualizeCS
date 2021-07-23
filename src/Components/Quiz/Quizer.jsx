import React, { useEffect, useState } from 'react'
import '../../sass/Components/Quiz/Quizer.scss'

import Question from './Question'
import CodeEditor from './CodeEditor'
import QuestionSideBarItem from './QuestionSideBarItem'

import { db } from './QuizData'

const BUBBLE_QUESTION = 0
const MERGE_QUESTION = 1
const QUICK_QUESTION = 2
const DFS_QUESTION = 3
const BFS_QUESTION = 4


const Quizer = () => {
    
    const [questionIdx, setQuestionIdx] = useState(0)
    const [question, setQuestion] = useState(null)

    useEffect( () => {        
        setQuestion(db[questionIdx])
    }, [questionIdx])

    const renderSideBar = () => {  
        return (
            db.map( (q, idx) => {                
                return (
                    <QuestionSideBarItem
                        idx={idx}
                        key={idx}
                        title={q.title} 
                        setQuestionIdx={setQuestionIdx}/>
                )
            })
        )      
    }

    return (
        <div className='Quizer'>
            <div className='QuizSideBar'>
                <div className='QuistionsWrapper'>
                    {renderSideBar()}
                </div>
            </div>

            <div className='Editor'>
                {question && <Question question={question}/>}                  
                {question && <CodeEditor question={question}/>}
            </div>
        </div>
    )
}

export default Quizer