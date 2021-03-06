import React, { Component } from 'react';
import store from '../../redux/store';
import './Favorites.css';
import { Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: '',
        isClicked: false,

        movies: [],
        idList: '',
    }
    componentDidMount() {
        store.subscribe(() => {
            const favState = store.getState();
            this.setState({ movies: favState.favMovies });
        })
    }
    detListID = (idList) => {
        store.dispatch({
            type: 'GET_LIST_ID',
            payload: {
                idList: this.state.idList,
            }
        });
    }
    
handleChangeNewList = (event) => {
    this.setState({
        title: event.target.value,
        isFilled: true,
    });
};
handleSaveList = (event) => {
    this.setState({ isClicked: true });
    console.log(this.state.movies, this.state.title);
    const data = this.state
    fetch('https://acb-api.algoritmika.org/api/movies/list', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            let idList = data.id
            this.setState({ idList: idList })
            console.log(this.state.idList);
        })
        .catch((error) => {
            console.log(error);
        })

};

delFromFavs = (imdbID) => {
    store.dispatch({
        type: 'DELETE_FROM_FAVS',
        payload: {
            id: imdbID,
        }
    })
}

render() {
    return (
        <div className="favorites">
            <input placeholder="Новый список" value={this.state.title} onChange={this.handleChangeNewList} className="favorites__name" />
            <ul className="favorites__list">
                {this.state.movies.map((item) => {
                    return <li key={item.id}>{item.title} ({item.year}) <button key={item.id} onClick={() => this.delFromFavs(item.id)}>X</button></li>;
                })}
            </ul>
            {this.state.isClicked ?
                <Link to={`/list/${this.state.idList}`} > Перейти к списку </Link> : <button type="button" className="favorites__save" onClick={this.handleSaveList} disabled={!this.state.title}>Сохранить список</button>
            }
        </div>
    );
}
    }

export default Favorites;