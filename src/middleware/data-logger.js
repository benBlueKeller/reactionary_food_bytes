'use strict'

let dataRoot = 'http://127.0.0.1:3040/data';

function AJAX(url, type = "GET", callback, body) {
  console.log(url);
  var onLoad = function() {
    return callback(JSON.parse(this.responseText));
  };
  var req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.open(type, url);
  if (body) req.setRequestHeader("Content-Type", "application/json");

  body 
  ? 
  req.send(JSON.stringify(body))
  : 
  req.send();
}

const dataLogger = store => next => action => {

	if(action.type.includes('ADD_ITEM')) {
		var body = {
			...action,
			location: action.type.slice(0, action.type.indexOf("/"))
		}
		console.log(body);
		AJAX(dataRoot + '/', 'POST', (json) => {
			console.log(json);
		}, body);
	}

	next(action);
}

export default dataLogger;