import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

const GridItem = (props) => (
  <div className="grid__glex">
    <img className="grid__img" src={props.image} />
  </div>
)

class App extends Component {
  
  state = {
    error: null,
    isLoaded: false,
    items: []
  }

  componentDidMount() {
    const query = `
    query {
      Page {
        media( sort: POPULARITY_DESC) {
          genres
          isAdult
          averageScore
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

      console.log(response.data)

      this.setState(() => ({
        isLoaded: true,
        items: response.data.data.Page.media
      }));

    } catch (error) {
      this.setState(() => ({ error }))
    }
  }
  render() {
    
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>{error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="grid">
          {items.map(item => (
            <GridItem key={item.id} image={item.coverImage.large} />
          ))}
        </div>
      )
    }
  }
}





  



export default App;
