function speak(content) {
    responsiveVoice.speak(content, 'US English Female', { rate: 1.25, onstart: responseSpeechOnStart, onend: responseSpeechOnEnd });
}

class SpeechRecognitionApi {
    constructor(options) {
        const SpeechToText = window.speechRecognition || window.webkitSpeechRecognition;
        this.transcript = '';
        this.isStarted = false;
        this.isReady = false;
        this.speechApi = new SpeechToText();
        this.speechApi.continuous = true;
        this.speechApi.interimResults = false;
        this.speechApi.onresult = (event) => {
            console.log(event);
            var resultIndex = event.resultIndex;
            var transcript = event.results[resultIndex][0].transcript;

            console.log('transcript>>', transcript);
            decideSpeak(transcript);
        }
    }
    init() {
        this.speechApi.start();
        this.isStarted = true;
    }
    stop() {
        this.speechApi.stop();
        this.isStarted = false;
    }
}
var speech = new SpeechRecognitionApi();

function decideSpeak(transcript) {
    document.getElementById('status').innerHTML = '<p>' + transcript + '</p> ';
    if (transcript.toLowerCase().includes('friday') && !speech.isReady) {
        speech.stop();
        speak('Yes sir?');
        speech.isReady = true;
    } else if (speech.isReady == true) {

        if (transcript.toLowerCase().includes("your name")) {
            speak('Im Friday.');
            speech.isReady = false;
        }

        // encode
        else if (
            (transcript.toLowerCase().includes("encode") ||
                transcript.toLowerCase().includes("in code") ||
                transcript.toLowerCase().includes("in court") ||
                transcript.toLowerCase().includes("include")) &&
            !transcript.toLowerCase().includes("file")
        ) {
            document.getElementById('encode').click();
            speak('Choose your file to encode when key is this AVL tree.');
            speech.isReady = false;
        } else if (
            (transcript.toLowerCase().includes("encode") ||
                transcript.toLowerCase().includes("in code") ||
                transcript.toLowerCase().includes("in court") ||
                transcript.toLowerCase().includes("include")) &&
            transcript.toLowerCase().includes("file")) {
            speak('Im trying to encode this file for you. You will get it in a while.');
            document.getElementById('encode-btn').click();
            speech.isReady = false;
        }

        // decode 
        else if ((transcript.toLowerCase().includes("decode") ||
                transcript.toLowerCase().includes("equal") ||
                transcript.toLowerCase().includes("legal")) &&
            !transcript.toLowerCase().includes("file")
        ) {
            document.getElementById('decode').click();
            speak('Choose your file to decode when key is this AVL tree.');
            speech.isReady = false;
        } else if ((transcript.toLowerCase().includes("decode") ||
                transcript.toLowerCase().includes("equal") ||
                transcript.toLowerCase().includes("legal")) &&
            transcript.toLowerCase().includes("file")) {
            speak('Im trying to decode this file for you. You will get it in a while.');
            document.getElementById('decode-btn').click();
            speech.isReady = false;
        }

        // insert
        else if (transcript.toLowerCase().includes("in short") ||
            transcript.toLowerCase().includes("insert") ||
            transcript.toLowerCase().includes("in shirt") ||
            transcript.toLowerCase().includes("in church") ||
            transcript.toLowerCase().includes("insured")
        ) {
            // get number
            var num = '';
            for (var i = transcript.length - 3; i < transcript.length; i++)
                if (transcript[i] != ".")
                    num += transcript[i];

            document.getElementById('v-insert').value = num;
            speak('Im trying to insert ' + num + ' to current AVL tree.');
            insertVertex();
            speech.isReady = false;
        }

        // search
        else if (
            transcript.toLowerCase().includes("shoot") ||
            transcript.toLowerCase().includes("should") ||
            transcript.toLowerCase().includes("search")
        ) {
            // get number
            var num = '';
            for (var i = transcript.length - 3; i < transcript.length; i++)
                if (transcript[i] != ".")
                    num += transcript[i];

            document.getElementById('v-search').value = num;
            speak('Searching ' + num + ' in current AVL tree.');
            searchVertex();
            speech.isReady = false;
        }

        // remove
        else if (transcript.toLowerCase().includes("remove")) {
            // get number
            var num = '';
            for (var i = transcript.length - 3; i < transcript.length; i++)
                if (transcript[i] != ".")
                    num += transcript[i];

            document.getElementById('v-remove').value = num;
            speak('Removing ' + num + ' in current AVL tree.');
            removeVertex();
            speech.isReady = false;
        }
    }
}

function responseSpeechOnEnd() {
    setTimeout(function() {
        speech.init();
    }, 1000);
}

function responseSpeechOnStart() {
    speech.stop();
}