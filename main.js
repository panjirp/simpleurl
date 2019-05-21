const endpoint = "https://www.jsonstore.io/b7c3a5ea041181feb02c9548e5b67010c26b55c1e279b637996f2ac2393dfa85";

function getRandom(){
    var random_string = Math.random().toString(32).substring(2, 5) + Math.random().toString(32).substring(2, 5);
    return random_string
}

function getUrl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function genHash(){
    if (window.location.hash == ""){
        var hash = getRandom();
        var url = window.location + '#' + hash;
        document.getElementById("urlinput").value = url;
        return hash;
    }
}

function sendRequest(url, hash) {
    this.url = url + '#' + hash;
    console.log(hash.substr(1));
    $.ajax({
        'url': endpoint + "/" + hash,
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
}


function shortUrl(){
    var longurl = getUrl();
    console.log(longurl);
    var hash = genHash();
    sendRequest(longurl, hash);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}

function copyUrl(){
    var selected = document.getElementById("urlinput").value;
    var tempInput = document.createElement('input');
    tempInput.setAttribute('value', selected);
    document.body.appendChild(tempInput);
    tempInput.select();
    var result = document.execCommand("copy");
    document.body.removeChild(tempInput);
    return result;
}