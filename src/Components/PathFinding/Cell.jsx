import React, { useEffect, useState } from 'react'
import '../../sass/Components/PathFinding/Cell.scss'

const DFS_ALGO = 1
const BFS_ALGO = 2

const Cell = (props) => {
    const [classes, setClasses] = useState(null)

    useEffect( () => {
        let currentClasses = ['Cell']

        if (!props.up) {            
            currentClasses.push('Up')
        }
        if (!props.down) {            
            currentClasses.push('Down')
        }
        if (!props.right) {            
            currentClasses.push('Right')
        }
        if (!props.left) {            
            currentClasses.push('Left')
        }
        if (props.isFinishPoint) {            
            currentClasses.push('Finish')
        }
        if (props.isMarked) {      
            if(props.findingAlgo === DFS_ALGO)  {
                currentClasses.push('dfsMarked')
            } else {
                currentClasses.push('bfsMarked')
            }
            
        }
        if (props.path) {                        
            if(props.findingAlgo === DFS_ALGO)  {
                currentClasses.push('dfsPath')
            } else {
                currentClasses.push('bfsPath')
            }
        }

        setClasses(currentClasses)    
    }, [
        props.isMarked, props.path, props.parent, props.findingAlgo, props.isFinishPoint,
        props.up, props.down, props.right, props.left
    ])

    return (
        <div className={classes && classes.join(' ')}>            
        </div>
    )
}

export default Cell