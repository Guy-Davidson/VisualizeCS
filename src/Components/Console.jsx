import React from 'react'
import '../sass/Components/Console.scss'
import { Switch, Route } from "react-router-dom";

import TopBar from './TopBar'
import Sorter from './Sorting/Sorter'
import Finder from './PathFinding/Finder';
import Quizer from './Quiz/Quizer';
import HomePage from './HomePage';

const Console = () => {
    return (
        <div className='Console'>
            <TopBar />
            <Switch>
                <Route path='/Sorting' exact component={Sorter} /> 
                <Route path='/PathFinding' exact component={Finder} />
                <Route path='/Quiz' component={Quizer}/>
                <Route path='/' exact component={HomePage}/>
            </Switch>
        </div>
    )
}

export default Console