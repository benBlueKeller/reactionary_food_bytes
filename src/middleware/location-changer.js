

const locationChanger = store => next => action => {
	if(action.type.slice(0, 3) === "to/") {
		var splitType = action.type.split("/");
		console.log(splitType);
		var toLocation = splitType[1];
		var fromLocation = splitType[3];
		store.dispatch({
			...action,
			type: toLocation + '/ADD_ITEM',
			skipLogging: true
		});
	}
	next(action);
}

export default locationChanger;