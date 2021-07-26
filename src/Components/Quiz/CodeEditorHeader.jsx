import React, { useState } from 'react';
import '../../sass/Components/Quiz/CodeEditorHeader.scss'
import { FaPlay, FaUndo } from "react-icons/fa";

const CodeEditorHeader = (props) => {
    const [version, setVersion] = useState(1);
    const [showUndo, setShowUndo] = useState(false);

    return (
        <div className='code-editor-header'>
            <div>                 
                <span className={version === 1 ? 'soultion-version clicked' : 'soultion-version'}
                    onClick={() => {
                        setVersion(1);
                        props.handleVersionClick(1)}
                    }>
                    version 1</span>
                <span className={version === 2 ? 'soultion-version clicked' : 'soultion-version'}
                    onClick={() => {
                        setVersion(2);
                        props.handleVersionClick(2)}
                    }>
                    version 2</span>
                <span className={version === 3 ? 'soultion-version clicked' : 'soultion-version'}
                    onClick={() => {
                        setVersion(3);
                        props.handleVersionClick(3)}
                    }>
                    version 3</span>
            </div>
            <div className='undo-play'>
                {showUndo ?
                <div className='pop-up'>
                    <span>Restore?</span>
                    <span 
                    className='undo-option'
                    onClick={() => props.handleResetClick()}
                    >
                        Yes
                    </span>
                    <span 
                    className='undo-option'
                    onClick={() => setShowUndo(false)}>
                         No
                    </span>
                </div>
                : null }                
                <FaUndo onClick={() => setShowUndo(!showUndo)} className='play'/>
                <FaPlay onClick={() => props.handleRunClick()} className='reset'/>
            </div>
        </div>
    )
}

export default CodeEditorHeader;