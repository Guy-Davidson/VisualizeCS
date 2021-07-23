import React, { useEffect } from 'react'
import '../../sass/Components/Quiz/QuestionSideBarItem.scss'

const QuestionSideBarItem = (props) => {
    useEffect( () => {
        console.log("initing");
    }, [])
    return (
        // <span className={"asd" === BUBBLE_QUESTION ? 'ActiveQuestion QuestionButton' : 'QuestionButton'}
        <span className={'QuestionButton'}
                onClick={() => props.setQuestionIdx(props.idx)}>            
            {props.title}
        </span>
    )
}

export default QuestionSideBarItem