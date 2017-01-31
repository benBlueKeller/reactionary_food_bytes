//pulled from https://www.html5rocks.com/en/tutorials/cors/ and they cite https://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/
//


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest !== "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

function AJAX(url, callback, err = () => {console.log("ERR in AJAX")}) {
  var onLoad = function() {
    return callback(JSON.parse(this.responseText));
  };
  var req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.addEventListener("error", err);
  req.open("GET", url);
  req.send();
}


export function getJSON(url, callback, err) {
	var xhr = createCORSRequest('GET', url);
	if (xhr) {
		xhr.onload = () => {callback(JSON.parse(xhr.responseText))};
		xhr.onerror = err ? err : () => {console.log("ERR in CORS")};
		xhr.send();
	} else {
	  console.warn('CORS not supported. Attempting AJAX');
	  AJAX(url, callback, err);
	}
}