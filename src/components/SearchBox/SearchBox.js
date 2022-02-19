import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';

class SearchBox extends Component {
    state = {
        searchLine: '',

    }

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
        console.log('local state ', e.target.value);
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        store.dispatch({
            type: 'SEARCH',
            payload: { searchLine: this.state.searchLine }
        });
        console.log('submit handler ', this.state.search);
    }

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
                    >   Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;