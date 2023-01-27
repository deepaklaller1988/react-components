import React from 'react';
import GooglePicker from 'react-google-picker';

function ApiPicker() {
    return (
        <div>
            <GooglePicker clientId={'638697376575-kjfp3g69lipudvd1houve00e6vtgomqd.apps.googleusercontent.com'}
              developerKey={'AIzaSyCHpJWFIkMZ7BXB-AJbLm46FmV6CqXexT8'}
              scope={['https://www.googleapis.com/auth/drive']}
              onChange={data => console.log('on change:', data)}
              onAuthFailed={data => console.log('on auth failed:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              viewId={'DOCS'}
              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
              createPicker={ (google, oauthToken) => {
                const googleViewId = google.picker.ViewId.DOCS;
                const uploadView = new google.picker.DocsUploadView();
                const docsView = new google.picker.DocsView(googleViewId)
                    .setIncludeFolders(true)
                    .setSelectFolderEnabled(true);

                const picker = new window.google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                  .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .addView(docsView)
                    .addView(uploadView)/*DocsUploadView added*/
                    .setOAuthToken(oauthToken)
                    .setDeveloperKey('AIzaSyCHpJWFIkMZ7BXB-AJbLm46FmV6CqXexT8')
                    .setCallback((data)=>{
                      if (data.action == google.picker.Action.PICKED) {
                          var fileId = data.docs[0].id;
                          alert('The user selected: ' + fileId);
                          picker();
                      }
                    });
                picker.build().setVisible(true);
            }}>
            <span>Click here</span>
            <div className="google"></div>
        </GooglePicker>
            
        </div>
    )
}

export default ApiPicker
