// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, update, remove } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

// Profile update
export const editProfile = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },
    
    email: {
       name: 'email',
       type: GraphQLString
     },
     
     shippingAddress: {
       name: 'shippingAddress',
       type: GraphQLString
     },

    description: {
      name: 'description',
      type: GraphQLString
    }

  },
  resolve: update
}

