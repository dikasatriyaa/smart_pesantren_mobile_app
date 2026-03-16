// GlobalsApi.js
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clwh63p9s02uz07uzn3dwl04d/master',
  cache: new InMemoryCache(),
});

// Export the getSlider function
export const getSlider = async () => {
    const query = gql`
      query MyQuery {
        sliders_Connection {
          edges {
            node {
              id
              image {
                url
              }
              name
            }
          }
        }
      }
    `;
  
    try {
      const { data } = await client.query({ query });
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
