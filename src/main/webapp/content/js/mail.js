function getUnlayer() {
  return unlayer;
}
function unlayerInit(endpoint, token) {
  unlayer.init({
    id: 'editor-container',
    projectId: 1234,
    displayMode: 'email',
  });
  registerupload(endpoint, token);
  unlayer.addEventListener('editor:ready', function () {
    console.log('editor:ready');
  });
  return unlayer;
}

function Unlayersavehtml() {
  return unlayer;
}

function loadtemplate(design) {
  unlayer.loadDesign(design);
}

function registerupload(endpoint, token) {
  unlayer.registerCallback('image', function (file, done) {
    var data = new FormData();
    data.append('file', file.attachments[0]);

    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    })
      .then(response => {
        // Make sure the response was valid
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Pass the URL back to Unlayer to mark this upload as completed

        done({ progress: 100, url: data.fileDownloadUri });
      });
  });
}
