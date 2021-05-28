import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ProfileBadgeComponent} from './profiles'
import {TweetsComponent, TweetDetailComponent, FeedComponent} from './tweets';

const appEl = document.getElementById('root')
if(appEl){
  ReactDOM.render(
    <App />, appEl);
}

const e = React.createElement

const tweetsEl = document.getElementById('tweetme-2')
if (tweetsEl){
  // console.log(tweetsEl.dataset)
  ReactDOM.render(
     e(TweetsComponent, tweetsEl.dataset), tweetsEl);
}

const tweetFeedEl = document.getElementById('tweetme-2-feed')
if (tweetFeedEl){
  // console.log(tweetsEl.dataset)
  ReactDOM.render(
     e(FeedComponent, tweetFeedEl.dataset), tweetFeedEl);
}

const tweetDetailElement = document.querySelectorAll('.tweetme2-detail')

tweetDetailElement.forEach(container =>{
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset), container);
})

const userProfileBadgeElement = document.querySelectorAll('.tweetme-2-profile-badge')

userProfileBadgeElement.forEach(container =>{
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset), container);
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
