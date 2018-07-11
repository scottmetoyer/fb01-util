var device = null; // The Web MIDI device
var port = 0; // The MIDI port to which the FB-01 is connected

var slider = document.getElementById("slider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

function findMidiDevices(name) {
    return navigator
        .requestMIDIAccess()
        .then((midiAccess) => {
            let input, output;
            midiAccess.inputs.forEach((currentInput) => {
                console.log(currentInput);
                if (currentInput.name === name) input = currentInput;
            });
            midiAccess.outputs.forEach((currentOutput) => {
                if (currentOutput.name === name) output = currentOutput;
            })
            return {
                input,
                output
            };
        });
}

function inputChanged() {
    console.log("hi");
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

    findMidiDevices("IAC Driver Bus 1").then(function (result) {
        device = result;

        if (device.input != null && device.output != null) {
            log ("Connected to FB-01");
        } else {
            log ("Error: can't establish connection to FB-01")
        }
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