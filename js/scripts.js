var device = null;

function connect() {
    // Connect to FB-01
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(function (midi) {
                device = midi;
                log("Connected to midi device");
            }, function () {
                log('Could not access midi devices');
            });
    }
}

function log(message) {
    var text = document.getElementById("console").value;
    text = message + "\r\n" + text;
    document.getElementById("console").value = text;
}