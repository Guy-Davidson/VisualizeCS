import React, { useEffect, useState } from 'react'
import '../../sass/Components/Sorting/Sorter.scss'
import { Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
import { IoSpeedometerOutline } from 'react-icons/io5' 
import { IoIosArrowForward } from 'react-icons/io'; 
import { VscDebugRestart } from 'react-icons/vsc'; 
import { CgSize } from 'react-icons/cg';

import Bar from './Bar'

const BUBBLE = 1;
const MERGE = 2;
const QUICK = 3;


const BASE_SPEED = 1
const MAX_LENGTH = 100

const Sorter = () => {
    const [length, setLength] = useState(MAX_LENGTH) 
    const [speed, setSpeed] = useState(null)
    const [sortingAlgo, setSortingAlgo] = useState(BUBBLE)
    const [bars, setBars] = useState([])
    const [isSorting, setIsSorting] = useState(false)
    const [isSorted, setIsSorted] = useState(false) 

    useEffect( () => {
        initBars()
    }, [length])

    const initBars = () => {
        let currentBars = []
        let r = Math.floor(Math.random() * length) 

        for (let i = 0 ; i < length ; i++) {
            if (i !== r) {
                currentBars.push(
                    <Bar 
                        barVal={Math.floor(Math.random() * 99) + 1}                                    
                        key={i}
                        isHighlighted={false}/>
                )
            } else {
                currentBars.push(
                    <Bar 
                        barVal={100}                                         
                        key={100}
                        isHighlighted={false}/>
                )
            }
        }

        setBars(currentBars)
        setIsSorted(false)
    }

    const sleep = (ms) =>  {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const bubbleSort = async () => {   
        setIsSorting(true)          

        let sorted = false       
        let sortingBars = [...bars]

        for (let i = 0 ; i < bars.length && !sorted ; i++) {
            sorted = true  
                  
            for (let j = 0 ; j < bars.length - 1 ; j++) {                                
                if (sortingBars[j].props.barVal > sortingBars[j + 1].props.barVal) {
                    sorted = false                    

                    let temp = sortingBars[j] 
                    sortingBars[j] = sortingBars[j + 1] 
                    sortingBars[j + 1] = temp 

                    let stateBars = [...sortingBars]
                    setBars(stateBars)
                    await sleep(BASE_SPEED + speed)                                        
                }
            }            
        }
        setIsSorting(false)     
        setIsSorted(true)   
    }

    const mergeSort = async () => {
        setIsSorting(true) 
        
        let sortingBars = [...bars]   
        let len = bars.length     
        
        for (let size = 1 ; size < len ; size *= 2) {
            for (let leftStart = 0 ; leftStart < len ; leftStart += 2 * size) {
        
              let left = leftStart            
              let right = Math.min(left + size, len)
              let leftLimit = right
              let rightLimit = Math.min(right + size, len);
              let i = left
              // merge(from, mid, to):                        
        
              while (left < leftLimit && right < rightLimit) {
                  let val1 = sortingBars[left].props.barVal
                  let val2 = sortingBars[right].props.barVal                
        
                  if (val1 <= val2) {                                          
                      left++;
                  } else {        
                      sortingBars.splice(i , 0, sortingBars.splice(right, 1)[0])                    
                      right++;
                      left++;
                      leftLimit++

                      let stateBars = [...sortingBars]
                      setBars(stateBars)
                      await sleep(BASE_SPEED + speed) 
                  }
                  i++;            
              }
            }
          }
        setIsSorting(false) 
        setIsSorted(true)   
    }

    const quickSort = async () => {
        setIsSorting(true) 
        
        let sortingBars = [...bars]

        let stack = []
        stack.push(0)
        stack.push(bars.length - 1)

        while (stack.length) {

            let end = stack.pop()
            let start = stack.pop()             

            let pivotVal = sortingBars[end].props.barVal  
            let pivotKey = sortingBars[end].props.key

            let highlightedBar = <Bar 
                                    barVal={pivotVal}
                                    key={pivotKey}
                                    isHighlighted={true}/>

            sortingBars.splice(end , 1, highlightedBar)
            let stateBars = [...sortingBars]
            setBars(stateBars)

            let pivotIndex = start; 
            for (let i = start; i < end; i++) {
                if (sortingBars[i].props.barVal < pivotVal) {                                                
                let temp = sortingBars[i]
                sortingBars[i] = sortingBars[pivotIndex]
                sortingBars[pivotIndex] = temp
                pivotIndex++;

                let stateBars = [...sortingBars]
                setBars(stateBars)
                await sleep(BASE_SPEED + speed) 
                }
            }
            
            let temp = sortingBars[end]
            sortingBars[end] = sortingBars[pivotIndex]
            sortingBars[pivotIndex] = temp  

            let unHighlightedBar = <Bar 
                                        barVal={pivotVal}
                                        key={pivotKey}
                                        isHighlighted={false}/>

            sortingBars.splice(pivotIndex , 1, unHighlightedBar) 
            
            stateBars = [...sortingBars]
            setBars(stateBars)
            await sleep(BASE_SPEED + speed) 
  
            if (pivotIndex - 1 > start) {                
                stack.push(start)
                stack.push(pivotIndex - 1)
            }
        
            if (pivotIndex + 1 < end) {                
                stack.push(pivotIndex + 1)
                stack.push(end) 
            }
        }
        
        setIsSorting(false) 
        setIsSorted(true)   
    }    

    const sort = () => {        
        if (sortingAlgo === BUBBLE) {
            bubbleSort()
        } else if (sortingAlgo === MERGE) {
            mergeSort()
        } else if (sortingAlgo === QUICK) {
            quickSort()
        }
    }

    return (
        <div className='Sorter'>
            <div className='SideBar'>
                <div className='AlgoWrapper'>
                    <span className={sortingAlgo === BUBBLE ? 'ActiveAlgo SortingButton' : 'SortingButton'}
                        onClick={() => setSortingAlgo(BUBBLE)}>
                        Bubble
                    </span>
                    <span className={sortingAlgo === MERGE ? 'ActiveAlgo SortingButton' : 'SortingButton'}
                        onClick={() => setSortingAlgo(MERGE)}>
                        Merge
                    </span>
                    <span className={sortingAlgo === QUICK ? 'ActiveAlgo SortingButton' : 'SortingButton'}
                        onClick={() => setSortingAlgo(QUICK)}>
                        Quick
                    </span>
                </div>

                <div className='SettingsWrapper'>
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
                                disabled={isSorting}
                                vertical/>
                            <IoSpeedometerOutline size={`3rem`}/>
                        </div>

                        <div className='SliderWrapper'>
                            <Slider     
                                onChange={(newLength) => {
                                    setLength(MAX_LENGTH - newLength)
                                    setIsSorted(false)
                                }}
                                style={{ 
                                    height: '20rem',
                                    width: '1rem', 
                                    margin: `1rem`                                                               
                                }}                                
                                min={0}
                                max={80}
                                defaultValue={40} 
                                disabled={isSorting}
                                vertical/>
                            <CgSize size={`3rem`}/>
                        </div>
                </div>

                {isSorted ?

                    <div className='SortWrapper' onClick={initBars}>
                        <span className={''}>
                            {'Generate'}</span>
                        <VscDebugRestart 
                            className={''}
                            size={`2.8rem`} />
                    </div>

                    : 

                    <div className='SortWrapper' onClick={sort}>
                        <span className={isSorting ? 'ActiveSort' : ''}>
                            {isSorting ? 'Sorting' : 'Sort'}</span>
                        <IoIosArrowForward 
                            className={isSorting ? 'ActiveArrow' : ''}
                            size={`3rem`} />
                    </div>

                }
            </div>
            <div className='Port'>
                {bars}                
            </div>
        </div>
    )
}

export default Sorter


