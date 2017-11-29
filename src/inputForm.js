/**
 * Created by Hrvoje on 28.11.2017..
 */
import React, { Component } from 'react';
import style from './css';
 import axios from 'axios';
import { Button } from 'react-bootstrap';

function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

class inputForm extends Component {
    constructor(props) {
        super(props);
        this.state = { url:'', shortUrl:'',message:''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);

    }
    handleUrlChange(e) {

        this.setState({ url: e.target.value });

    }
    handleSubmit(e) {

        e.preventDefault();

        let url = this.state.url.trim();

        if(!isUrlValid(url)  ) {this.setState({message:'You must enter a valid URL'}); return;}

        if(!url) {return;}

        this.setState({message:'URL is valid!'});

        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        axios.post("http://localhost:3001/api/shorten",   {url:url} )
            .then(res => {
                console.log(res.data.shortURL);
                this.setState({shortUrl:res.data.shortURL});
            })
            .catch(err => {
                console.error(err);
            });


      }
    render() {
        return (
            <div >
                <form  onSubmit={ this.handleSubmit }>
                    <input
                        type='text'
                        style={style.inputField}
                        placeholder='(http://long.link)'
                        onChange={this.handleUrlChange}/>
                    <p style={style.error}>{this.state.message}</p>
                     <input
                        type='submit'
                         style={style.submitButton}
                         value='Go!' />
                 </form>
            <div>

                    <a href={this.state.shortUrl} style={style.text}>{ this.state.shortUrl}</a>
            </div>
            </div>
        )
    }
}

export default inputForm;