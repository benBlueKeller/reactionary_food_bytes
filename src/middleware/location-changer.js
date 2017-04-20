

const dataLogger = store => next => action => {
	if(action.type.slice(0, 2) === "to/") = {
		var subsequentType = action.slice(3);
		console.log(subsequentType);
	}
	next(action);
}

export default dataLogger;