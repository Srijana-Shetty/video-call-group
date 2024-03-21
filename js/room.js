let mediaRecorder;
let recordedChunks = [];


let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});

let displayFrame = document.getElementById('stream__box')
let videoFrames = document.getElementsByClassName('video__container')
let userIdInDisplayFrame = null;

let expandVideoFrame = (e) => {

  let child = displayFrame.children[0]
  if(child){
    document.getElementById('streams__container').appendChild(child)
  }

  displayFrame.style.display = 'block'
  displayFrame.appendChild(e.currentTarget)
  userIdInDisplayFrame = e.currentTarget.id

  for(let i =0; videoFrames.length>i; i++){
    if(videoFrames[i].id != userIdInDisplayFrame){
    videoFrames[i].style.height = '100px'
    videoFrames[i].style.width = '100px'
    }
 }

}

for(let i =0; videoFrames.length>i; i++){
   videoFrames[i].addEventListener('click', expandVideoFrame)
}

let hideDisplayFrame = () => {
  userIdInDisplayFrame = null;
  displayFrame.style.display = null;

  let child = displayFrame.children[0]
    document.getElementById('streams__container').appendChild(child)
  
   for(let i =0; videoFrames.length > i; i++){
    videoFrames[i].style.height = '300px'
    videoFrames[i].style.width = '300px'
   }
  }


  

  
  function startRecording(stream) {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
  }

  function handleDataAvailable(event) {
   if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
  }


  function stopRecording() {
   mediaRecorder.stop();
    mediaRecorder.onstop = () => {
       const blob = new Blob(recordedChunks, {
           type: 'video/webm'
        });
        const url = URL.createObjectURL(blob);
       const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
    };
  }

  document.getElementById('start-recording').addEventListener('click', () => {
    // Assuming `localTracks` contains the video and audio tracks
   const stream = new MediaStream([...localTracks.map(track => track.getMediaStreamTrack())]);
   startRecording(stream);
 });

  document.getElementById('stop-recording').addEventListener('click', stopRecording);






displayFrame.addEventListener('click', hideDisplayFrame)