import React from 'react'

import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'

 export default function Link ({description, url, index,length, createdAt, postedBy, name}){
  const authToken = localStorage.getItem(AUTH_TOKEN)

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
            ▲
          </div>
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



