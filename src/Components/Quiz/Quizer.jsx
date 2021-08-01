import React, { useEffect, useState } from 'react'
import '../../sass/Components/Quiz/Quizer.scss'
import { useLocation } from 'react-router-dom'

import Question from './Question'
import CodeEditor from './CodeEditor'
import QuestionSideBarItem from './QuestionSideBarItem'

import { createApiClient } from '../../api/api';

const api = createApiClient();

const Quizer = () => {        
    const [activeQuestion, setActiveQuestion] = useState(null)
    const [questionsList, setQuestionList] = useState([]);
    let url = useLocation();

    const getQuestionsList = async () => {          
        let newQuestionList = await api.getData();    
        setQuestionList(newQuestionList);
    }

    useEffect( () => {        
        getQuestionsList()
    }, [])

    useEffect( () => {
        
        let urlActiveQuestion = url.pathname.split('/')[url.pathname.split('/').length - 1]        
        let newactiveQuestion = questionsList.find(q => q.link === urlActiveQuestion)
        setActiveQuestion(newactiveQuestion)
    }, [url, questionsList]) 

    const renderSideBar = () => {  
        return (
            questionsList.map( (q, idx) => {                
                return (
                    <QuestionSideBarItem
                        idx={idx}
                        key={idx}
                        title={q.title} 
                        link={q.link}
                        />
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
                {activeQuestion && <Question question={activeQuestion}/>}                  
                {activeQuestion && <CodeEditor question={activeQuestion}/>}
            </div>
        </div>
    )
}

export default Quizer