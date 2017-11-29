/**
 * Created by Hrvoje on 29.11.2017..
 */
/**
 * Created by Hrvoje on 28.11.2017..
 */

import React, { Component } from 'react';
import axios from 'axios';


class Redirect extends Component {
    constructor(props) {
        super(props);
     }
    componentDidMount(){

        console.log(this.props.url);
         axios.post("http://localhost:3001/api/getURL",   {urlKey:this.props.match.params.urlKey} )
            .then(res => {

                console.log(res.data);
                 window.location = res.data;

            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        return (
            <div >

            </div>
        )
    }
}

export default Redirect;