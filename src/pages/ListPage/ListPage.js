import React, { Component } from 'react';
import './ListPage.css';
import store from '../../redux/store';

class ListPage extends Component {
    state = {
        movies: [],
        title: '',
    }

    componentDidMount() {

        const id = this.props.match.params.id;
        console.log(id);
        if (id) {
            fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({ movies: data.movies, title: data.title });
                })
                .catch((error) => {
                    console.log('Error : ', error);
                })
        } else {
            console.log(`список не найден ${id}`);
        }

    }
    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        let link = item.id;
                        let linkFilm = `https://www.imdb.com/title/${link}/`
                        return (
                            <li key={item.imdbID}>
                                <a href={linkFilm} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;