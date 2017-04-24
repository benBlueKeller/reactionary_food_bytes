

const locationChanger = store => next => action => {
	if(action.type.slice(0, 3) === "to/") {
		var typeArray = action.type.split("/");
		for (let i = 0; i < typeArray.length; i++) {
			if (typeArray[i] === "from") {
				var fromPosition = i;
			}
		}
		var toLocation = typeArray[1];
		var fromLocation = "";
		for (let i = fromPosition + 1; i < typeArray.length; i++) {
			if (i > fromPosition + 1) fromLocation += "/";
			fromLocation +=	typeArray[i];
		}
		store.dispatch({
			...action,
			type: fromLocation + '/REMOVE_ITEM',
			skipLogging: true
		});	
		store.dispatch({
			...action,
			type: toLocation + '/ADD_ITEM',
			skipLogging: true
		});

	}
	next(action);
}

export default locationChanger;