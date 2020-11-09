const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Mission {
        name: String
        # Field with query param
        missionPatch(size: PatchSize): String
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }

    type User {
        id: ID!
        email: String!
        # Can be empty but not null
        trips: [Launch]! 
    }

    enum PatchSize {
        SMALL
        LARGE
    }

    # To fetch the data from client (Can't update)
    type Query {
        launches: [Launch]!
        launch(id: ID!): Launch
        me: User
    }

    # To allow mutation
    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String # login token
    }

    # Define response object type
    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }


`;

module.exports = typeDefs;