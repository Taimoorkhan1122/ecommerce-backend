import { shield, and } from 'graphql-shield'
import * as rules from './rules.js'

export const permissions = shield({
    Query: {
      login : rules.isAuthenticated,
    },
    Mutation: {
      register: rules.isValidInput
    }
  })