import React, { Component } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';
import axios from 'axios';


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
        media( sort: POPULARITY_DESC, search: "") {
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
