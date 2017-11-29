/**
 * Created by Hrvoje on 29.11.2017..
 */
import React from 'react';
import ShortHomepage from './ShortHomepage'
import Redirect from './Redirect'

 import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

const Routing = () => (

    <Router>
        <div>
            <Route exact path='/'   component={ShortHomepage}/>
            <Route path='/:urlKey'   component={Redirect}/>
        </div>
    </Router>

)



export default Routing
