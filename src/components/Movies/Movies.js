import React, { Component } from 'react';
import store from '../../redux/store';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: []
        // {
        //     imdbID: 'tt3896198',
        //     title: "Guardians of the Galaxy Vol. 2",
        //     year: 2017,
        //     poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

    }

    componentDidMount() {
        //const state = store.getState();
        //this.setState({movies: state.movies});

        store.subscribe(() => {
            const globalState = store.getState();
            fetch(`https://www.omdbapi.com/?apikey=28846f78&s=${globalState.searchLine}`)
                .then(resp => {
                    return resp.json();
                })
                .then(data => {
                    data.response === false ?
                        this.setState({ movies: 0 }) :
                        this.setState({ movies: data.Search });
                })
                .catch((error) => {
                    console.log('Error : ', error);
                })
            //this.setState({
            //     movies: [state.movies]
            // })
        })
    }

    render() {

        return (
            <>
                {this.state.movies ?
                    <ul className="movies">
                        {this.state.movies.map((movie) => (
                            <li className="movies__item" key={movie.imdbID}>
                                <MovieItem {...movie} />
                            </li>
                        ))}
                    </ul> : <h1>По запросу ничего не найдено</h1>
                }
            </>

        );
    }
}

export default Movies;