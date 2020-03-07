import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";
import store from "./store";

const GridItem = props => (
  <div className="grid__flex">
    <img className="grid__img" src={props.image} />
    <div className="text__bar">{props.text}</div>
  </div>
);

class App extends Component {
  state = this.getCurrentStateFromStore();

  getCurrentStateFromStore() {
    return {
      loaded: false,
      items: [],
      error: false,

      searchString: store.getState().searchValue
    };
  }

  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();

    if (this.state.searchString !== currentState.searchString) {
      this.fetchSearch(currentState.searchString);
    }
  };
  fetchSearch(searchString) {
    const query = `
    query {
      Page {
        media( sort: POPULARITY_DESC, search: "${searchString}") {
          genres
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
          }
        }
      }
    }
    `;

    const variables = {};

    this.getAnime(query, variables);
  }
  componentWillUnmount() {
    this.unsubscribeStore();
  }
  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.updateStateFromStore);

    const query = `
    query {
      Page {
        media( sort: POPULARITY_DESC, search: "") {
          genres
          id
          title {
            english
            romaji
            native
          }
          coverImage {
            large
          }
        }
      }
    }
    `;

    const variables = {};

    this.getAnime(query, variables);
  }

  getAnime = async (query, variables) => {
    try {
      const response = await axios.post("https://graphql.anilist.co", {
        query,
        variables
      });

      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.Page.media
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  };

  render() {
    console.log(this.state);

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container">
          <div>
            <Header />
            <br />
            <div className="grid">
              {items.map(item => (
                <GridItem
                  resizeMode={"contain"}
                  key={item.id}
                  text={item.title.english}
                  image={item.coverImage.large}
                />
              ))}
            </div>
            <br />
            <Footer />
          </div>
        </div>
      );
    }
  }
}

export default App;
