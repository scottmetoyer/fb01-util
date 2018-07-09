var device = null;      // The Web MIDI device
var port = 0;           // The MIDI port to which the FB-01 is connected

function findMidiDevices(name) {
    return navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        let input, output;
        midiAccess.inputs.forEach((currentInput) => {
          if(currentInput.name === name) input = currentInput;
        });
        midiAccess.outputs.forEach((currentOutput) => {
          if(currentOutput.name === name) output = currentOutput;
        })
        return { input, output };
      });
  }

function connect() {
    /*
    // Connect to FB-01
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess()
            .then(function (midi) {
                device = midi;
                log("Connected to midi device");

                // Set up listeners for connected MIDI devices
                // TODO: Scope this to just the FB-01 (get the FB-01 port number and assign it to the global port var)
                for (var input of device.inputs.values()) {
                    input.onmidimessage = handleMidi;
                }

            }, function () {
                log('Could not access midi devices');
            });
    }*/

    findMidiDevices("test").then(function(result){
        console.log(result);
    });
}

function handleMidi(message) {
    console.log(message);
}

function test() {
    // Send a test request to the FB-01
    message = [240, 126, 127, 6, 1, 247]; // Device ID request
    outputPort = device.outputs.get(port);
    outputPort.send(message);
}

function log(message) {
    var text = document.getElementById("console").value;
    text = message + "\r\n" + text;
    document.getElementById("console").value = text;
}