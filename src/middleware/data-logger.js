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
	console.log(store.getState());
	var body = {
		...action,
		location: action.type.slice(0, action.type.indexOf("/"))
	}

	/**
	 * location returns the store object associated with the string body.location
	 * @return {Object} store pantry||cart||recipes
	 * 
	 */
	function location () {
		switch(body.location) {
			case 'pantry':
				return store.getState().pantry;
			case 'cart':
				return store.getState().cart;
			case 'recipes':
				return store.getState().recipes;
		}
	}

	if(action.type.includes('ADD_ITEM')) {
		console.log(body);
		AJAX(dataRoot + '/', 
			'POST', 
			(json) => {
				console.log(json);
				store.dispatch({
					type: body.location + '/ADD_ID',
					ndbno: action.ndbno,
					name: action.name,
					id: json._id
				});
			}, 
			body);
	}

	if(action.type.includes('CHANGE_ITEM_QTY')) {
		console.log(action.delta);
		var newQty = location().food[action.index].qty + action.delta;
		AJAX(dataRoot + '/' + location().food[action.index].id,
			'PUT',
			(json) => {
				if(json.error) {
					console.error("data/CHANGE_ITEM_QTY returned an error\n", json.error.message );
				}
				console.log(json);
			},
			{ qty: newQty });
	}

	next(action);
}

export default dataLogger;