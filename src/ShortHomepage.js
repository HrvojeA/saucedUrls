/**
 * Created by Hrvoje on 28.11.2017..
 */

import React, { Component } from 'react';

import style from './css';
import InputForm from './inputForm'

class ShortHomepage extends Component {
    constructor(props) {
        super(props);
     }
    render() {
        return (
            <div style={ style.urlInput }>
                <h2 style={style.text}>Shrink-a-link</h2>
            <InputForm  />
            </div>
        )
    }
}

export default ShortHomepage;