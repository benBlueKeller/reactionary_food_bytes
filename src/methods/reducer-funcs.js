'use strict'

export function addItem (food, action) {
	return [...food,   {
		        name: action.name,
		        ndbno: action.ndbno,
		        qty: action.qty || 0,
		        id: action.id
		    }];
}

export function addID (food, action) {
	for (var i = food.length - 1; i >= 0; i--) {
		if(action.ndbno) {
			if(food[i].ndbno === action.ndbno) {
				return [
					...food.slice(0, i),
					{
						...food[i],
						id: action.id
					},
					...food.slice(i + 1)
				]
			} 
		} else if(food[i].name === action.name) {
			return [
				...food.slice(0, i),
				{
					...food[i],
					id: action.id
				},
				...food.slice(i + 1)
			]
		} 		
	}
}