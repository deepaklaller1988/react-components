import { useEffect, useState } from "react";

var SCOPE = 'https://www.googleapis.com/auth/drive.file';
var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';



function Gdrive() {
    const [name,setName] = useState('')
    const [googleauth, setGoogleauth] = useState('');
 
  useEffect(() => {
    // do anything with the selected/uploaded files
    var script = document.createElement('script');
    script.onload= handleClientLoad;
    script.src="https://apis.google.com/js/api.js";
    document.body.appendChild(script);
  }, []);

  const initClient = () => {
    try{
      window.gapi.client.init({
          'apiKey': "--YOUR API KEY --",
          'clientId': "--CLIENT ID KEY --",
          'scope': SCOPE,
          'discoveryDocs': [discoveryUrl]
        }).then(() => {
          
            setGoogleauth(window.gapi.auth2.getAuthInstance());
         googleauth.isSignedIn.listen(updateSigninStatus);  
         document.getElementById('signin-btn').addEventListener('click', signInFunction);
         document.getElementById('signout-btn').addEventListener('click', signOutFunction);

      });
    }catch(e){
        console.log(e);
      }
    }

    const signInFunction =()=>{
        googleauth.signIn();
        updateSigninStatus();
      }
    
    const signOutFunction =()=>{
        googleauth.signOut();
        updateSigninStatus();
      }
    
    const updateSigninStatus = ()=> {
        setSigninStatus();
      }

    const setSigninStatus= async ()=>{
        var user = googleauth.currentUser.get();
        console.log(user)
        if (user.wc == null){
          setName('');
        }
        else{
          var isAuthorized = user.hasGrantedScopes(SCOPE);
          if(isAuthorized){
            
              setName(user.Ot.Cd)
            const boundary='foo_bar_baz'
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";
            var fileName='mychat123';
            var fileData='this is a sample data';
            var contentType='text/plain'
            var metadata = {
              'name': fileName,
              'mimeType': contentType
            };

            var multipartRequestBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n\r\n' +
          fileData+'\r\n'+
          close_delim;

          console.log(multipartRequestBody);
          var request = window.gapi.client.request({
            'path': 'https://www.googleapis.com/upload/drive/v3/files',
            'method': 'POST',
            'params': {'uploadType': 'multipart'},
            'headers': {
              'Content-Type': 'multipart/related; boundary=' + boundary + ''
            },
            'body': multipartRequestBody});
        request.execute(function(file) {
          console.log(file)
        });
      }
    }
  }

  const handleClientLoad = ()=>{
    window.gapi.load('client:auth2', initClient);
  }
    return (
        <div>
             <div>UserName: <strong>{ name}</strong></div>
        <button id="signin-btn">Sign In</button>
        <button id="signout-btn">Sign Out</button>
        </div>
    )
}

export default Gdrive
