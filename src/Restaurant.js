import React, { Component } from 'react'
import axios from 'axios';
import './Restaurant.scss'

class Restaurant extends Component{
    constructor(){
        super()

        this.state = {
            city: '',
            restaurants: []
        }
    }

    searchCity(event){
        console.log('searchCity:'+event.target.value)
        this.setState({
            city: event.target.value,
            restaurants: []
        })
    }

    onSubmit(event){
        let request = `http://opentable.herokuapp.com/api/restaurants?city=${this.state.city}`

        axios.get(request)
        .then((response) => {
            
            this.setState(state => {
                const restaurants = [...response.data.restaurants]
            
                return{
                    restaurants
                }
            })
            })
        }


    render(){
        console.log(this.state.restaurants)
        const list = this.state.restaurants.map(item =>{
            return(
                <div className="listView" key={item.id}>
                    <span className="listName">{item.name}</span><br />
                    <span className="listText">Address: {item.address}</span><br />
                    <span className="listText">Price: {item.price}</span>
                </div>
            )
        })
        console.log(window)

        return(
            <div className="appView">
                <div className="searchView">
                <h3>Welcome to the restaurant search engine</h3><br />
                <input onChange={this.searchCity.bind(this)} className="inputField" type='text' placeholder='Enter city' /><br />
                <button onClick={this.onSubmit.bind(this)}>Search</button>
                </div>

                <div className="resultView">
                {list}
                </div>

            </div>
        )
    }
}

export default Restaurant