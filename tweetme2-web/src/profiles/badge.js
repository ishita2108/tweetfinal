import React, {useState, useEffect} from 'react';
import {DisplayCount} from './utils'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'
import {UserDisplay, UserPicture} from './components'


function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props
    let currentVerb = (user && user.is_following) ? "Unfollow" : "Follow"
    currentVerb = profileLoading ? "Loading" : currentVerb
    const handleFollowToggle =(event) => {
        event.preventDefault()
        console.log(event)
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentVerb)
        }
    }
    //Here if we didin't use profileLoading then we would be able to click the button multiple times which we don't want.
    return user ? <div>
        <UserPicture user={user} hideLink />
        <p><UserDisplay user={user} includeFullName  hideLink/></p>
        <p>Followers: <DisplayCount>{user.followers_count}</DisplayCount>  </p>
        <p>Following: <DisplayCount>{user.following_count}</DisplayCount></p>
        <p>{user.bio}</p>
        <p>{user.location}</p>
        <button className="btn btn-primary" onClick ={handleFollowToggle}>{currentVerb}</button>
        </div> : null
}

export function ProfileBadgeComponent(props){
    const {username} = props
    //lookup
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) =>{
        if(status === 200){
        setProfile(response)
        }
    }
    useEffect(()=>{
        if (didLookup === false){
        apiProfileDetail(username, handleBackendLookup)
        setDidLookup(true)
        }
    },[username,didLookup, setDidLookup])
    const handleNewFollow = (actionVerb) =>{
        console.log(actionVerb)
        apiProfileFollowToggle(username, actionVerb,(response, status)=>{
            console.log(response, status)
            if (status === 200){
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }
   
    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} /> : null
}