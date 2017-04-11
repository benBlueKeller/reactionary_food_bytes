
let dataRoot = 'http://127.0.0.1:3040/data';

function AJAX(url, type = "GET", callback, body) {
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
	if(body.location === 'recipes') {
		body.sub_location = action.recipeIndex
	}

	/**
	 * location returns the store object associated with the string body.location
	 * @return {Object} store pantry||cart||recipes
	 * 
	 */
	function location (loc = body.location) {
		switch(loc) {
			case 'pantry':
				return store.getState().pantry;
			case 'cart':
				return store.getState().cart;
			case 'recipes': {
				return store.getState().recipes.mine[body.sub_location];
			}
		}
	}

	if(action.type.includes('ADD_ITEM')) {
		if(!action.id) AJAX(
			dataRoot + '/', 
			'POST', 
			(json) => {
				console.log(json);
				var type = body.location !== 'cart' ? body.location + '/ADD_ID' : body.location + '/' + body.sub_location + '/ADD_ID';
				store.dispatch({
					type,
					ndbno: action.ndbno,
					name: action.name,
					id: json._id,
					recipeIndex: action.recipeIndex
				});
			}, 
			body
			);
	}

	if(action.type.includes('REMOVE_ITEM')) {
		if(action.id) {
			AJAX(
				dataRoot + '/' + action.id,
				'DELETE',
				(json) => {
					if(json.error) console.error("REMOVE ERROR\n", json.error.message);
					console.log(json.message);
				}
				);
		} else {
			console.warn("insufficient data to delete from server", '\naction id:', action.id);
		}
	}

	if(action.type.includes('CHANGE_ITEM_QTY')) {
		try {
			var newQty;	 
			for(let item of location().food) {
				if(item.id === action.id) newQty = item.qty + action.delta;
			}
			AJAX(
				dataRoot + '/' + action.id,
				'PUT',
				(json) => {
					if(json.error) {
						console.error("data/CHANGE_ITEM_QTY returned an error\n", json.error.message );
					}
					console.log(json);
				},
				{ qty: newQty }
				);
		} catch (e) {
			console.warn("insufficient data to log qty change \n location:", location(), '\naction id:', action.id);
		}
	}

	if(action.type.includes('LOAD')) {
		AJAX(
			dataRoot,
			'GET',
			(json) => {
				for(let doc of json) {
					console.log(doc);
					doc.id = doc._id;
					//FIXME::bbk dispatch only functional with pantry
					store.dispatch({
						type: doc.location + "/ADD_ITEM",
						...doc
					});
				}
			}
			);
	}

	next(action);
}

export default dataLogger;