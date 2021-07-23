import React, { useEffect, useState } from 'react'
import '../../sass/Components/PathFinding/Finder.scss'
import { Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import { IoSpeedometerOutline } from 'react-icons/io5' 
import { IoIosArrowForward } from 'react-icons/io'; 
import { VscDebugRestart } from 'react-icons/vsc'; 
import { CgSize } from 'react-icons/cg';
import Cell from './Cell'

const DFS = 1
const BFS = 2

const BASE_SPEED = 1
const MAX_LENGTH = 50

const Finder = () => {
    const [findingAlgo, setFindingAlgo] = useState(DFS)
    const [length, setLength] = useState(MAX_LENGTH) 
    const [speed, setSpeed] = useState(null)    
    const [maze, setMaze] = useState(null)
    const [isFinding, setIsFinding] = useState(false)
    const [found, setFound] = useState(false) 
    const [cells, setCells] = useState([])
    const [components, setComponents] = useState([])

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
            let randomFinish = Math.floor((Math.random() * (length ** 2)) + 1)

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
                                        adjList={currentMaze[cell1Idx].props.adjList.concat([cell2])}
                                        up={currentMaze[cell1Idx].props.up}
                                        down={currentMaze[cell1Idx].props.down}
                                        right={false}
                                        left={currentMaze[cell1Idx].props.left}    
                                        isFinishPoint={randomFinish === cell1}/>

                    let newCell2 = <Cell 
                                        key={cell2}
                                        adjList={currentMaze[cell2Idx].props.adjList.concat([cell1])}
                                        up={currentMaze[cell2Idx].props.up}
                                        down={currentMaze[cell2Idx].props.down}
                                        right={currentMaze[cell2Idx].props.right}
                                        left={false}    
                                        isFinishPoint={randomFinish === cell2}/>

                    currentMaze.splice(cell1Idx, 1, newCell1)    
                    currentMaze.splice(cell2Idx, 1, newCell2)   
                }
                else if (cell1 + length == cell2) {                    


                    let newCell1 = <Cell 
                                        key={cell1}
                                        adjList={currentMaze[cell1Idx].props.adjList.concat([cell2])}
                                        up={currentMaze[cell1Idx].props.up}
                                        down={false}
                                        right={currentMaze[cell1Idx].props.right}
                                        left={currentMaze[cell1Idx].props.left}    
                                        isFinishPoint={randomFinish === cell1}/>

                    let newCell2 = <Cell 
                                        key={cell2}
                                        adjList={currentMaze[cell2Idx].props.adjList.concat([cell1])}
                                        up={false}
                                        down={currentMaze[cell2Idx].props.down}
                                        right={currentMaze[cell2Idx].props.right}
                                        left={currentMaze[cell2Idx].props.left}    
                                        isFinishPoint={randomFinish === cell2}/>

                    currentMaze.splice(cell1Idx, 1, newCell1)    
                    currentMaze.splice(cell2Idx, 1, newCell2)
                }
              }
        }

        setMaze(currentMaze)
    }

    const generateGrid = () => {
        let currentMaze = []

        let k = 1
        for (let i = 0 ; i < length ; i++) {            
            for (let j = 0 ; j < length ; j++) {
                currentMaze.push (
                    <Cell 
                        key={k}
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
        setMaze(currentMaze)
    }

    const initUnionFind = () => {
        let currentCells = []

        currentCells = Array.from({
          length: length ** 2
        }, (_, index) => index + 1);

        setCells(currentCells)

        let currentComponents = []

        currentComponents = Array.from({
          length: length ** 2
        }, (_, index) => index + 1);

        setComponents(currentComponents)        
      }

    const isSingleComponents = () => {        
        return components.every(v => v === components[0]);
      }

    const find = (cell) => {
        return components[cell - 1];
      }

    const union = (cell1, cell2) => {
        let newComponents = [...components]  

        let leader = find(cell1);
        let sec = find(cell2);
      
        for (let i = 0; i < newComponents.length; i++) {
          if (newComponents[i] == sec) {
            newComponents[i] = leader;
          }
        }

        setComponents(newComponents)
      }
    
    return (
        <div className='Finder'>
            <div className='MazeSideBar'>
                <div className='AlgoWrapper'>
                    <span className={findingAlgo === DFS ? 'ActiveAlgo FindingButton' : 'FindingButton'}
                        onClick={() => {}}>
                        DFS
                    </span>
                    <span className={findingAlgo === BFS ? 'ActiveAlgo FindingButton' : 'FindingButton'}
                        onClick={() => {}}>
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
                                    max={80}
                                    defaultValue={40} 
                                    disabled={isFinding}
                                    vertical/>
                                <CgSize size={`3rem`}/>
                            </div>
                        </div>
                

                

                {found ?

                    <div className='FindWrapper' onClick={() => {}}>
                        <span className={''}>
                            {'Generate'}</span>
                        <VscDebugRestart 
                            className={''}
                            size={`2.8rem`} />
                    </div>

                    : 

                    <div className='FindWrapper' onClick={() => {}}>
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