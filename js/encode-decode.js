var base64 = document.createElement("INPUT");
base64.setAttribute("type", "hidden");
var textFile = document.createElement("INPUT");
textFile.setAttribute("type", "hidden");

function onLoad() {
    document.getElementById('fileToEncode').addEventListener('change', upLoadFileToEncode, false);
    document.getElementById('fileToDecode').addEventListener('change', upLoadFileToDecode, false);
}

function upLoadFileToEncode() {
    let data = document.getElementById("fileToEncode").files[0];

    if (data == null) {
        document.getElementsByClassName('encode-btn')[0].style.cssText = 'display: none;';
        document.getElementsByClassName('encode-btn')[1].style.cssText = 'display: none;';
        return null;
    }


    const readerAsBase64 = new FileReader();
    readerAsBase64.onloadend = () => {
        // use a regex to remove data url part
        base64.value = readerAsBase64.result
            .replace("data:", "")
            .replace(/^.+,/, "");
    };
    readerAsBase64.readAsDataURL(data);

    document.getElementsByClassName('encode-btn')[0].style.cssText = 'display: block;';
    document.getElementsByClassName('encode-btn')[1].style.cssText = 'display: block;';
};

function upLoadFileToDecode() {
    let data = document.getElementById("fileToDecode").files[0];

    if (data == null) {
        document.getElementsByClassName('decode-btn')[0].style.cssText = 'display: none;';
        document.getElementsByClassName('decode-btn')[1].style.cssText = 'display: none;';
        return null;
    }

    const readerAsText = new FileReader();
    readerAsText.onloadend = () => {
        // use a regex to remove data url part
        textFile.value = readerAsText.result
            .replace("data:", "")
            .replace(/^.+,/, "");
    };
    readerAsText.readAsText(data);
    document.getElementsByClassName('decode-btn')[0].style.cssText = 'display: block;';
    document.getElementsByClassName('decode-btn')[1].style.cssText = 'display: block;';
};

function encode() {
    let file = document.getElementById("fileToEncode").files[0];
    document.getElementById('encode-loading').style.cssText = 'display: block;';

    // upfile to server to encode
    var fileDto = {
        fileName: file.name.split('.')[0],
        fileType: file.name.split('.')[1],
        keyTree: bstWidget.toNumString(),
        base64: base64.value
    }

    setTimeout(function() {
        var linkEncodeFile = $.ajax({
            url: 'https://3bd28e75ccff.ngrok.io/api/encode',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(fileDto),
            dataType: 'json',
            success: function(result) {
                alert("Something's wrong.");
                return result;
            },
            error: function(error) {
                return error;
            }
        }).responseText;
        document.getElementById('encode-loading').style.cssText = 'display: none;';
        window.location.href = 'https://3bd28e75ccff.ngrok.io' + linkEncodeFile;
    }, 10);

}




function decode() {
    let file = document.getElementById("fileToDecode").files[0];
    document.getElementById('decode-loading').style.cssText = 'display: block;';

    // upfile to server to encode
    var fileDto = {
        fileName: file.name.split('.')[0],
        fileType: file.name.split('.')[1],
        keyTree: bstWidget.toNumString(),
        encodedStr: textFile.value
    }
    setTimeout(function() {
        var link = $.ajax({
            url: 'https://3bd28e75ccff.ngrok.io/api/decode',
            type: 'POST',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(fileDto),
            dataType: 'json',
            success: function(result) {
                return result;
            },
            error: function(error) {
                return error;
            }
        }).responseText;
        document.getElementById('decode-loading').style.cssText = 'display: none;';
        try {
            window.location.href = 'https://3bd28e75ccff.ngrok.io' + link;
        } catch (err) {
            alert("Cannot decode file or your key is wrong.");
        }
    }, 10);

}

function closeEncode() {
    document.getElementById('encode-card').style.cssText = 'display: none;';
}

function closeDecode() {
    document.getElementById('decode-card').style.cssText = 'display: none;';
}