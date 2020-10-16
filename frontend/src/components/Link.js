import React from 'react'

import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

 export default function Link ({description, url, index,length, createdAt, postedBy, linkId}){
  const authToken = localStorage.getItem(AUTH_TOKEN)

  const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
       id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
              <Mutation mutation={VOTE_MUTATION} 
              variables={{ linkId: linkId}} 
              
              >
              {voteMutation => (
                <div className="ml1 gray f11" onClick={voteMutation} style={{cursor:"pointer", width:'10px'}}>
                  ▲
                </div>
              )}
            </Mutation>
        
        )}
      </div>
      <div className="ml1">
        <div>
          {description} ({url})
        </div>
        <div className="f6 lh-copy gray">
          {length} votes | by{' '}
          {postedBy ? postedBy: 'Unknown'}{' '}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  )
  
}



