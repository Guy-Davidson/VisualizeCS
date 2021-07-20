import React from 'react'
import '../sass/Components/Console.scss'
import { Switch, Route } from "react-router-dom";

import TopBar from './TopBar'
import Sorter from './Sorting/Sorter'
import Finder from './PathFinding/Finder';
import Flower from './Flow/Flower';

const Console = () => {
    return (
        <div className='Console'>
            <TopBar />
            <Switch>
                <Route path='/Sorting' exact component={Sorter} /> 
                <Route path='/PathFinding' exact component={Finder} />
                <Route path='/Flow' exact component={Flower}/>
            </Switch>
        </div>
    )
}

export default Console