import React, { useEffect, useRef } from 'react';
import { useParams} from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoComponent = () => {
  
    const {roomID} = useParams();
const containerref = useRef(null);
useEffect(() => {


  let myMeeting = async (element) => {
    if(!roomID || !containerref.current) return;
    // generate Kit Token
     const appID = 1879837470 ;
     const serverSecret = "b79fd07eed32a517ab086abfc04cfbe";
     const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,
        Date.now().toString(), "Anonymous",
      );
 
   
    // Create instance object from Kit Token.
     const zp = ZegoUIKitPrebuilt.create(kitToken);
     // start the call
     zp.joinRoom({
       container: element,
       sharedLinks: [
         {
           name: 'Personal link',
           url:
            window.location.protocol + '//' + 
            window.location.host + window.location.pathname +
             '?roomID=' +
             roomID,
         },
       ],
       scenario: {
         mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
       },
     });
 
   
 };
 myMeeting(containerref.current);
 return()=>
 {
  if(containerref.current){
    containerref.current.innerHTML ="";
  }
 };
}, [roomID]);


    

return (
  <div
    className="myCallContainer"
    ref={containerref}
    style={{ width: '100vw', height: '100vh' }}
  ></div>
);
 
};

export default VideoComponent;