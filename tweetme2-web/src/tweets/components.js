import React, {useEffect, useState} from 'react'
import {TweetsList} from './list'
import {TweetCreate} from './create'
import {Tweet} from './detail'
import {apiTweetDetail} from './lookup'
import {FeedList} from './feed'


export function FeedComponent(props){
  console.log(props)
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === 'false'? false : true
  const handleNewTweet = (newTweet)=>{
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }

  return <div className={props.className}> 
  {canTweet === true && <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />   
  } <FeedList newTweets={newTweets} {...props}/>
  </div>  
}

export function TweetsComponent(props){
  console.log(props)
  const [newTweets, setNewTweets] = useState([])

  const canTweet = props.canTweet === 'false'? false : true
  const handleNewTweet = (newTweet)=>{
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }

  return <div className={props.className}> 
  {canTweet === true && <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />   
  } <TweetsList newTweets={newTweets} {...props}/>
  </div>  
}


export function TweetDetailComponent(props){
  const {tweetId} = props
  const [didLookup, setDidLookup] = useState(false)
  const [tweet, setTweet] = useState(null)

  const handleBackendLookup = (response, status) =>{
    if(status === 200){
      setTweet(response)
    }
    else{
      alert("There was an error finding your tweet")
    }
  }
  useEffect(()=>{
    if (didLookup === false){
      apiTweetDetail(tweetId, handleBackendLookup)
      setDidLookup(true)
    }
  },[tweetId,didLookup, setDidLookup])
  return tweet === null ? null : <Tweet tweet = {tweet} classname={props.className}/>
}


