const socket = io('http://localhost:3000/')

socket.on('DANH_SACH_ONLINE', arrUserInfo => {
    console.log(arrUserInfo);
})
socket.on('CO_NGUOI_DUNG_MOI', user => {
    console.log(user);
})

function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

openStream()
    .then(stream => playStream('localStream', stream));

var peer = new Peer();
peer.on('open', id => {
    document.getElementById('my-peer').append(id);
    $('#btnSignup').click(function () {
        const userName = $('#txtUsername').val();
        socket.emit('NGUOI_DUNG_DANG_KY', { userName, id })
    });
});

// Caller

$('#btnCall').click(() => {
    const id = $('#remoteId').val();
    openStream()
        .then(stream => {
            playStream('localStream', stream);
            const call = peer.call(id, stream);
            call.on('stream', remoteStream => playStream('remoteStream', remoteStream))
        });
});
// AnSwer
peer.on('call', call => {
    openStream()
        .then(stream => {
            call.answer(stream);
            playStream('localStream', stream);
            call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
        });
});

