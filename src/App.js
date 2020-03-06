import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import axios from 'axios';
import store from './store'


const GridItem = (props) => (
  <div className="grid__glex">
    <img className="grid__img" src={props.image} />
  </div>
)

class App extends Component {

  state = this.getCurrentStateFromStore()
  
  getCurrentStateFromStore() {
    return {
      loaded: false,
      items: [],
      error: false,
  
      searchString: store.getState().searchValue
    }
  }
  
  updateStateFromStore = () => {
    const currentState = this.getCurrentStateFromStore();
    
    if (this.state.searchString !== currentState.searchString) {
      // this.setState(currentState);
      this.fetchSearch(currentState.searchString)
    }
  }
    fetchSearch(searchString) {
      const query = `
    query {
      Page {
        media( sort: POPULARITY_DESC, search: "${searchString}") {
          genres
          id
          title {
            english
          }
          coverImage {
            large
          }
        }
      }
    }
    `;

    const variables = {};

    this.getAnime(query, variables)
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
          }
          coverImage {
            large
          }
        }
      }
    }
    `;

    const variables = {};

    this.getAnime(query, variables)

  }
  
  getAnime = async (query, variables) => {
    try {
      const response = await axios.post('https://graphql.anilist.co', {
        query,
        variables
      });

      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.Page.media
      }));

    } catch (error) {
      this.setState(() => ({ error }))
    }
  }
  
  render() {
    console.log(this.state)

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {



       return (   
         <div>
           <Header />
           <br/>
           <div className="grid">
          {items.map(item => (
            <GridItem key={item.id} text={item.title} image={item.coverImage.large} />
          ))}
            </div>
          <br />
          <Footer />
         </div>      
        
      )
          }
  }
}


export default App;
