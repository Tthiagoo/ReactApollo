import React from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export default function LinkList() {
  const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>
        if (error) return <div>Error</div>

        const linksToRender = data.feed.links
        console.log(linksToRender)
        //const {0:{postedBy}} = linksToRender
        //console.log(postedBy)
        return (
          <div>
          {linksToRender.map((link, index, {votes}) => (
            <Link key={link.id} url={link.url} index={index} description={link.description} postedBy={link.postedBy} createdAt={link.createdAt} length={votes.length}/>
          ))}
        </div>
        )
      }}
    </Query>
  )

}

