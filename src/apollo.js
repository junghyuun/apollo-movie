import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:4000/",

  cache: new InMemoryCache(),

  resolvers: {
    Movie: {
      isLiked: () => false  // default
    },

    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        console.log(isLiked);

        const myMovie = {
          __typename: 'Movie',
          id: `${id}`,
        };

        cache.modify({
          id: cache.identify(myMovie),

          fields: {
            isLiked: (isLiked) => !isLiked  // true-false toggle
          },
        });
      },
    },
  },
});

export default client;