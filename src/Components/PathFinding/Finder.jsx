import React, { useEffect, useState } from 'react'
import '../../sass/Components/PathFinding/Finder.scss'
import { Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import { IoSpeedometerOutline } from 'react-icons/io5' 
import { IoIosArrowForward } from 'react-icons/io'; 
import { VscDebugRestart } from 'react-icons/vsc'; 
import { CgSize } from 'react-icons/cg';
import Cell from './Cell'

const DFS_ALGO = 1
const BFS_ALGO = 2

const BASE_SPEED = 1
const MAX_LENGTH = 35


const Finder = () => {
    const [findingAlgo, setFindingAlgo] = useState(DFS_ALGO)
    const [length, setLength] = useState(MAX_LENGTH)     
    const [speed, setSpeed] = useState(null)    
    const [maze, setMaze] = useState(null)
    const [isFinding, setIsFinding] = useState(false)
    const [found, setFound] = useState(false) 
    

    useEffect( () => {
        initMaze()
    }, [length])


    const initMaze = () => {        

        let currentMaze = []
        

        let k = 1
        for (let i = 0 ; i < length ; i++) {            
            for (let j = 0 ; j < length ; j++) {
                currentMaze.push (
                    <Cell 
                        key={k}
                        name={k}
                        up={true}
                        down={true}
                        right={true}
                        left={true}    
                        isFinishPoint={false}                         
                        adjList={[]}                     
                        />                        
                )
                k++
            }            
        }           

        let cells = Array.from({
            length: length ** 2
          }, (_, index) => index + 1);

        let components = Array.from({
            length: length ** 2
          }, (_, index) => index + 1);         
          
        while (!components.every(v => v === components[0])) {        

            
            
            let randCol = Math.floor((Math.random() * length) + 1);
            let randRow = Math.floor((Math.random() * length));
            let r1 = randCol + randRow * length;

            let r = Math.random()
            let r2 = -1

            if (r1 == length ** 2) {
                continue;
            } else if (r < 0.5 && (r1 + length < length ** 2) || (randCol % length == 0)) {
                r2 = r1 + length;
            } else {
                r2 = r1 + 1;
            }

            let cell1 = cells[r1 - 1] 
            let cell2 = cells[r2 - 1] 

            let cell1Idx = cell1 - 1
            let cell2Idx = cell2 - 1

            let findCell1 = components[cell1Idx]
            let findCell2 = components[cell2Idx]
            if (findCell1 !== findCell2) {                

                for (let i = 0; i < components.length; i++) {
                    if (components[i] == findCell1) {
                        components[i] = findCell2;
                    }
                }                         

                if (cell1 + 1 == cell2) {                    
                    
                    let newCell1 = <Cell 
                                        key={cell1}
                                        name={currentMaze[cell1Idx].props.name}
                                        adjList={currentMaze[cell1Idx].props.adjList.concat([cell2])}
                                        up={currentMaze[cell1Idx].props.up}
                                        down={currentMaze[cell1Idx].props.down}
                                        right={false}
                                        left={currentMaze[cell1Idx].props.left}    
                                        isFinishPoint={false}
                                        />

                    let newCell2 = <Cell 
                                        key={cell2}
                                        name={currentMaze[cell2Idx].props.name}
                                        adjList={currentMaze[cell2Idx].props.adjList.concat([cell1])}
                                        up={currentMaze[cell2Idx].props.up}
                                        down={currentMaze[cell2Idx].props.down}
                                        right={currentMaze[cell2Idx].props.right}
                                        left={false}    
                                        isFinishPoint={false}
                                        />

                    currentMaze.splice(cell1Idx, 1, newCell1)    
                    currentMaze.splice(cell2Idx, 1, newCell2)   
                }
                else if (cell1 + length == cell2) {                    


                    let newCell1 = <Cell 
                                        key={cell1}
                                        name={currentMaze[cell1Idx].props.name}
                                        adjList={currentMaze[cell1Idx].props.adjList.concat([cell2])}
                                        up={currentMaze[cell1Idx].props.up}
                                        down={false}
                                        right={currentMaze[cell1Idx].props.right}
                                        left={currentMaze[cell1Idx].props.left}    
                                        isFinishPoint={false}
                                        />

                    let newCell2 = <Cell 
                                        key={cell2}
                                        name={currentMaze[cell2Idx].props.name}
                                        adjList={currentMaze[cell2Idx].props.adjList.concat([cell1])}
                                        up={false}
                                        down={currentMaze[cell2Idx].props.down}
                                        right={currentMaze[cell2Idx].props.right}
                                        left={currentMaze[cell2Idx].props.left}    
                                        isFinishPoint={false}
                                        />

                    currentMaze.splice(cell1Idx, 1, newCell1)    
                    currentMaze.splice(cell2Idx, 1, newCell2)
                }
              }
        }

        let randomFinish = Math.floor((Math.random() * (length ** 2)) ) 
        let randomFinishIdx = randomFinish - 1        
        
        let newFinishCell = <Cell 
                key={randomFinish}                
                adjList={currentMaze[randomFinishIdx].props.adjList}
                up={currentMaze[randomFinishIdx].props.up}
                down={currentMaze[randomFinishIdx].props.down}
                right={currentMaze[randomFinishIdx].props.right}
                left={currentMaze[randomFinishIdx].props.left}                   
                isFinishPoint={true}/>

        currentMaze.splice(randomFinishIdx, 1, newFinishCell) 

        setMaze(currentMaze)
        setFound(false)
    }

    const sleep = (ms) =>  {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const find = async (vertex) => {
        setIsFinding(true)
        let findingMaze = [...maze]
        let stack = [];        
        stack.push(vertex);

        while (stack.length) {
          let v = -1

          findingAlgo === DFS_ALGO ? v = stack.pop() : v = stack.shift()

          let vIdx = v - 1

            if (findingMaze[vIdx].props.isFinishPoint) {                

                let path = v;
      
                while (path) {
                    
        
                    let pathIdx = path - 1
                    let next = findingMaze[pathIdx].props.parent

                    let pathCell = <Cell                                     
                                            key={path}                                                            
                                            adjList={findingMaze[pathIdx].props.adjList}
                                            up={findingMaze[pathIdx].props.up}
                                            down={findingMaze[pathIdx].props.down}
                                            right={findingMaze[pathIdx].props.right}
                                            left={findingMaze[pathIdx].props.left}    
                                            isFinishPoint={findingMaze[pathIdx].props.isFinishPoint} 
                                            parent={findingMaze[pathIdx].props.parent}                                   
                                            path={true}
                                            findingAlgo={findingAlgo}  
                                            />
        
                    findingMaze.splice(pathIdx, 1, pathCell)
                    let stateMaze = [...findingMaze]
                    setMaze(stateMaze)
                    await sleep(BASE_SPEED + speed);
        
                    path = next
                }
                 
                let stateMaze = [...findingMaze]
                setMaze(stateMaze) 
                setIsFinding(false)   
                setFound(true)                     
                return;
            }

            if (!findingMaze[vIdx].props.isMarked) {                

                let markedCell = <Cell                                     
                                    key={v}                                    
                                    isMarked={true} 
                                    adjList={findingMaze[vIdx].props.adjList}
                                    up={findingMaze[vIdx].props.up}
                                    down={findingMaze[vIdx].props.down}
                                    right={findingMaze[vIdx].props.right}
                                    left={findingMaze[vIdx].props.left}    
                                    isFinishPoint={findingMaze[vIdx].props.isFinishPoint} 
                                    parent={findingMaze[vIdx].props.parent}     
                                    findingAlgo={findingAlgo}                                
                                    />

                findingMaze.splice(vIdx, 1, markedCell)
                let stateMaze = [...findingMaze]
                setMaze(stateMaze)
                await sleep(BASE_SPEED + speed);
                
                findingMaze[vIdx].props.adjList.forEach(u => {
                    let uIdx = u - 1
                    if (!findingMaze[uIdx].props.isMarked) {

                        let childCell = <Cell                                     
                        key={u}                                                            
                        adjList={findingMaze[uIdx].props.adjList}
                        up={findingMaze[uIdx].props.up}
                        down={findingMaze[uIdx].props.down}
                        right={findingMaze[uIdx].props.right}
                        left={findingMaze[uIdx].props.left}    
                        isFinishPoint={findingMaze[uIdx].props.isFinishPoint} 
                        parent={v}                                   
                        findingAlgo={findingAlgo}  
                        />

                        findingMaze.splice(uIdx, 1, childCell)
                        let stateMaze = [...findingMaze]
                        setMaze(stateMaze)
                        

                        stack.push(u);
                    }
                });
            }
            
        }        
    }

    return (
        <div className='Finder'>
            <div className='MazeSideBar'>
                <div className='AlgoWrapper'>
                    <span className={findingAlgo === DFS_ALGO ? 'ActiveAlgo FindingButton' : 'FindingButton'}
                        onClick={() => setFindingAlgo(DFS_ALGO)}>
                        DFS
                    </span>
                    <span className={findingAlgo === BFS_ALGO ? 'ActiveAlgo FindingButton' : 'FindingButton'}
                        onClick={() => setFindingAlgo(BFS_ALGO)}>
                        BFS
                    </span>
                </div>

                <div className='SettingsWrapper'>                    
                    <div className='TopSettings'>
                        <div className='SliderWrapper'>
                                <Slider     
                                    onChange={(newSpeed) => setSpeed(newSpeed) }
                                    style={{ 
                                        height: '20rem',
                                        width: '1rem', 
                                        margin: `1rem`                                                               
                                    }}
                                    min={1}
                                    max={9}
                                    defaultValue={5} 
                                    disabled={isFinding}
                                    vertical/>
                                <IoSpeedometerOutline size={`3rem`}/>
                            </div>

                            <div className='SliderWrapper'>
                                <Slider                                         
                                    onChange={(newLength) => {
                                        setLength(MAX_LENGTH - newLength)
                                        setFound(false)                                        
                                    }}
                                    style={{ 
                                        height: '20rem',
                                        width: '1rem', 
                                        margin: `1rem`                                                               
                                    }}                                
                                    min={0}
                                    max={20}
                                    defaultValue={10} 
                                    disabled={isFinding}
                                    vertical/>
                                <CgSize size={`3rem`}/>
                            </div>
                        </div>
                

                

                {found ?

                    <div className='FindWrapper' onClick={initMaze}>
                        <span className={''}>
                            {'Generate'}</span>
                        <VscDebugRestart 
                            className={''}
                            size={`2.8rem`} />
                    </div>

                    : 

                    <div className='FindWrapper' onClick={() => {
                            if (!isFinding) {
                                findingAlgo === DFS_ALGO ? find(1) : find(length)
                            }                      
                        }}>
                        <span className={isFinding ? 'ActiveFind' : ''}>
                            {isFinding ? 'Finding' : 'Find'}</span>
                        <IoIosArrowForward 
                            className={isFinding ? 'ActiveArrow' : ''}
                            size={`3rem`} />
                    </div>

                }
                </div>
            </div>

            <div className='Maze'
                style={length && {
                    gridTemplateRows: `repeat(${length}, 1fr)`,
                    gridTemplateColumns: `repeat(${length}, 1fr)`,
                }}>
                {maze && maze}
            </div>
        </div>
    )
}

export default Finder