import React from 'react'
import '../sass/Components/Console.scss'
import { Switch, Route } from "react-router-dom";

import TopBar from './TopBar'
import Sorter from './Sorting/Sorter'

const Console = () => {
    return (
        <div className='Console'>
            <TopBar />
            <Switch>
                <Route path='/Sorting' exact component={Sorter} /> 
            </Switch>
        </div>
    )
}

export default Console