import React, { Component } from 'react';
import store from '../../redux/store';
import './MovieItem.css';

class MovieItem extends Component {

    addToFavorites = (Title, Year, Poster, imdbID) =>{
        store.dispatch({
            type: 'ADD_TO_FAVS',
            payload: {
                title: Title,
                year: Year,
                poster: Poster,
                id: imdbID,
            }
        });
        console.log('ourfilm ', Title );
    }
    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        console.log('title ', this.props);
        console.log('title ', Title);
        console.log('year ', Year);
        console.log('poster ', Poster);
        console.log('imdbID ', imdbID);
        return (
            
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button" className="movie-item__add-button" 
                    onClick={
                        ()=> {
                            this.addToFavorites(Title, Year, Poster, imdbID)
                        }
                    }
                    >Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;