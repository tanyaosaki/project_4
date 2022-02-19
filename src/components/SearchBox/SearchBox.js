import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';

class SearchBox extends Component {
    state = {
        searchLine: '',
       // filmInfo: '',
    }

    //getFilms = (filmName) => {
    //    let link = 'http://www.omdbapi.com/?i=${filmName}&apikey=28846f78';
     //   fetch(link)
     //       .then((res) => res.json())
     //       .then((data) => {
     //           this.setState({ filmInfo: data })
     //       });
    //}

    //componentDidMount () {
    //    this.getFilms()
    //    console.log(this.state.filmInfo);

    //    const state = store.getState();
    //    this.setState({searchLine: state.searchLine});
    //}

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        console.log('local state ', e.target.value);
     //   this.getFilms(this.state.searchLine)
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        store.dispatch({
            type: 'SEARCH',
            payload: {searchLine: this.state.searchLine}
        });
        console.log('submit handler ', this.state.search);
    }

    //findFilm = () => {
    //    store.dispatch({
    //        type: 'FIND_FILM',
    //        payload: {filmInfo: this.state.filmInfo}
     //   })
    //}

    render() {
        const { searchLine } = this.state;

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                        //onClick={() => this.findFilm()}
                    >   Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;