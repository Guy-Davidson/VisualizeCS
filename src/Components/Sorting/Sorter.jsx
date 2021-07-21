import React, { useEffect, useState } from 'react'
import '../../sass/Components/Sorting/Sorter.scss'
import Bar from './Bar'

const BUBBLE = 1;
const MERGE = 2;
const QUICK = 3;
const RACE = 4;

const Sorter = () => {
    const [length, setLength] = useState(40)
    const [speed, setSpeed] = useState(900)
    const [sortingAlgo, setSortingAlgo] = useState(BUBBLE)
    const [bars, setBars] = useState([])

    useEffect( () => {
        initBars()
    }, [])

    const initBars = () => {
        let currentBars = []

        for (let i = 0 ; i < length; i++) {
            currentBars.push(
                <Bar 
                    barVal={Math.floor(Math.random() * 99) + 1}
                    isHighlighted={false}                    
                    key={i}/>
            )
        }

        setBars(currentBars)
    }

    const sleep = async (ms) =>  {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    const bubbleSort = async () => {   
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
                    await sleep(10)                                        
                }
            }            
        }
        
      }

    const mergeSort = async () => {

    }

    const quickSort = async () => {

    }

    return (
        <div className='Sorter'>
            <div className='SideBar'>
                <div className='AlgoWrapper'>
                    <span className={sortingAlgo == BUBBLE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={bubbleSort}>
                        Bubble
                    </span>
                    <span className={sortingAlgo == MERGE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={mergeSort}>
                        Merge
                    </span>
                    <span className={sortingAlgo == QUICK ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={quickSort}>
                        Quick
                    </span>
                </div>

                <div className='AlgoWrapper'>
                    <span className={sortingAlgo == BUBBLE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={bubbleSort}>
                        Bubble
                    </span>
                    <span className={sortingAlgo == MERGE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={mergeSort}>
                        Merge
                    </span>
                    <span className={sortingAlgo == QUICK ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={quickSort}>
                        Quick
                    </span>
                </div>

                <div className='AlgoWrapper'>
                    <span className={sortingAlgo == BUBBLE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={bubbleSort}>
                        Bubble
                    </span>
                    <span className={sortingAlgo == MERGE ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={mergeSort}>
                        Merge
                    </span>
                    <span className={sortingAlgo == QUICK ? 'ActiveSorter SortingButton' : 'SortingButton'}
                        onClick={quickSort}>
                        Quick
                    </span>
                </div>
            </div>

            <div className='Port'>
                {bars}                
            </div>
        </div>
    )
}

export default Sorter