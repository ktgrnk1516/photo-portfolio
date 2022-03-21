import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      photosConnection {
        edges {
          node {
            image {
              url
            }
            time
            place {
              distance(from: { latitude: 1.5, longitude: 1.5 })
            }
            desc
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.photosConnection.edges;
};
