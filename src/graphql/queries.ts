import { gql } from 'graphql-tag';

export const GET_EXAMPLE_DATA = gql`
  query MainMenu {
    mainMenu {
      name
      _id
      slug
      fields {
        _id
        name
        slug
      }
    }
  }
`;
