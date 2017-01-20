const initialState = {
	pantry: {
    food: [
      {
        name: "Mae Ploy Yellow Curry Paste",
        ndbno: "45103142",
        qty: 402
      },
      {
        name: "Parsnips, raw", 
        ndbno: "11298",
        qty: 24
      }
    ]
  },
  
  cart: {
    shopList: {
      food: []
    },
    basket: {
      food: []
    }
  },

	recipes: [
    {
      name: 'Thai Yellow Curry',
      food: [
        {
          name: "Mae Ploy Yellow Curry Paste",
          ndbno: "45103142",
          qty: 24
        },
        {
          name: "Coconut Milk",
          ndbno: "45086905",
          qty: 402
        },
      ],
    }
  ]
}

export const pantry = initialState.pantry;
export const cart = initialState.cart;
export const recipes = initialState.recipes;
export default initialState;