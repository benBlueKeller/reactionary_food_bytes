function foodIsEqual(f, o) {
  console.log("untested");
  if(f.length != o.length) {
    return false;
  }

  for (var i = f.length - 1; i >= 0; i--) {
    if(f[i].ndbno !== o[i].ndbno) {
      return false;
    }
  }

  if(i < 0) {
    return true;
  }
}

var FOOD = [
	{
		name: "coconut milk",
    qty: 42
	},
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
];

var AJAX = function(url, callback) {
  var onLoad = function() {
    return callback(JSON.parse(this.responseText));
  };
  var req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.open("GET", url);
  req.send();
}

var createItemObj = function(ndbno) {
  return AJAX(window.url.food(ndbno), function(json) {
    console.log(json);
    var item = json.report.food;
    return {
    name: item.name,
    ndbno: ndbno,
    serving: item.nutrients[0].qty,
    label: item.nutrients[0].label
    }
  });
};
console.log(createItemObj("45103142"));

for(var i in FOOD) {
  console.log(window.url.food(FOOD[i].ndbno));
}

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      {props.action ? <HeaderButton action={props.action} /> : <div></div>}
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  action: React.PropTypes.func
};

/**
 * Stopwatch is just that, it takes no props and handles all state (except Date) internally                      [description]
 */
var Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },
  
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  
  onTick: function() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
  },
  
  onStart: function() {
    this.setState({ 
      running: true,
      previousTime: Date.now(),
    });
  },
  
  onStop: function() {
    this.setState({ running: false });
  },
  
  onReset: function() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  },
  
  render: function() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? 
          <button onClick={this.onStop}>Stop</button> 
          : 
          <button onClick={this.onStart}>Start</button>
        } 
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});

function HeaderButton(props) {
  return (
    <div className="stopwatch">
      <button onClick={props.action}> - </button>
    </div>
  );
}

HeaderButton.propTypes = {
  action: React.PropTypes.func.isRequired
}

function Counter(props) {
  return (
      <div className="counter">
        <button className="counter-action decrement" onClick={function() {props.onChange(-1);}}> - </button>
        <div className="counter-qty"> {props.qty} </div>
        <button className="counter-action increment" onClick={function() {props.onChange(1);}}> + </button>
      </div>
    );
}

Counter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  qty: React.PropTypes.number.isRequired
}

function Item(props) {
	return (
		<div className="item">
			<div className="item-name">
				<a className="remove-item" onClick={props.onRemove}>✖</a>
				{props.name}
			</div>
      <div className="item-qty">
        <Counter onChange={props.onChange} qty={props.qty} />
      </div>
		</div>
	);
}

Item.propTypes = {
	name: React.PropTypes.string.isRequired,
	onRemove: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  qty: React.PropTypes.number.isRequired
};

var TextForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string
  },

  getDefaultProps: function() {
      return {
        btnText: 'Submit',
      }
    },

  getInitialState: function() {
    return {
      input: "",
    };
  },
  
  onInputChange: function(e) {
    this.setState({input: e.target.value});
  },
  
  onSubmit: function(e) {
    e.preventDefault();
  
    this.props.onSubmit(this.state.input);
    this.setState({input: ""});
  },

  render: function() {
    return (
      <div className="add-item-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.input} onChange={this.onInputChange} />
          <input type="submit" value={this.props.btnText} />
        </form>
      </div>
    ); 
  }
});

var AddItemForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  
  onSubmit: function(name) {
    this.props.onAdd(name);
  },
  
  render: function() {
    return (
      <TextForm onSubmit={this.onSubmit} btnText="Add Item" />
    ); 
  }
});

function Tile(props) {
  return (
    <div className = "tile">
      <Header title="Tile" />
      <SearchForm onSelect={props.onSelect} />
    </div>);
};

Tile.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
};

var SearchForm = React.createClass({
  propTypes: {
    onSelect: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      results: []
    };
  },

  sendReq: function(search) {
    var url = "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search + "&sort=n&max=25&offset=0&api_key=" + window.apiKeys.gov;
    //var newWindow = window.open(url, "searchJSON");
    var showResults = function(resJSON) {
      this.setState(this.state.results = []);
      try {
        for (var i = resJSON.list.item.length - 1; i >= 0; i--) {
          this.state.results.push({
            name: resJSON.list.item[i].name,
            ndbno: resJSON.list.item[i].ndbno
          });
          console.log(createItemObj(this.state.ndbno));
        }
      } catch(e) {
        this.state.results.push({
          name: "No Items Found",
          ndbno: "failure"
        })
      }
      this.setState(this.state);
    }.bind(this);
    AJAX(url, showResults);    
  },

  onSelect: function(index) {
    this.props.onSelect(this.state.results[index]);
  },

  render: function() {
    return (
      <div>
        <TextForm onSubmit={this.sendReq} btnText="Search" />
        <div className="items">
            {this.state.results.map(function(item, index) {
              return(
                <Item name={item.name} onRemove={function() {this.onSelect(index)}.bind(this)} key={item.ndbno}/>);
            }.bind(this))}
        </div>
      </div>);
  }
});

/*var Recipe = React.createClass({
  propTypes: {
    onFinish: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      food: []
    };
  },

  addItem: function(item) {
    this.state.food.push({
      name: item.name,
      ndbno: item.ndbno,
      qty: item.qty || "You Kno"
    });
    this.setState(this.state);
  },


  // FAIL: COPY AND PASTE FROM APPLICATION, DINGUS
  onItemQtyChange: function(index, delta) {
    if(typeof this.state.food[index].qty === "number") {
      this.state.food[index].qty += delta;
    } else {
      this.state.food[index].qty = delta;
    }
    this.setState(this.state);
  },

  recipeItemRemove: function(index) {
    var item = this.state.food[index];
    console.log(item);
    this.props.onFinish(item.ndbno, t.state.food[index].qty)
    this.state.food.splice(index, 1);
    this.setState(this.state);
  },

  onFinish: function() {
    for (var i = 0; i < this.state.food.length; i++) {
      this.recipeItemRemove(i);
    }
  },

  render: function(props) {
    return (
      <div className = "tile">
      <Header title="Recipe" action={this.onFinish}/>
      <div className="items">
        {this.state.food.map(function(item, index) {
          return(
            // TODO:: as you think about data structures, find better keys
            <Item name={item.name} 
            qty={item.qty}
            onChange ={function(delta) {this.onItemQtyChange(index, delta)}.bind(this)}
            onRemove={function(index) {this.recipeItemRemove(index)}.bind(this)} 
            key={typeof item.ndbno != "undefined" ? item.ndbno : index}/>
            );
        }.bind(this))}
      </div>
      <SearchForm onSelect={this.addItem} />
      </div>
    );
  }
});*/

function Recipe(props) {
  return (
    <div className = "tile">
    <Header title="Recipe" action={props.methods.recipeItemRemove}/>
    <div className="items">
      {props.food.map(function(item, index) {
        return (
          // TODO:: as you think about data structures, find better keys
          <Item name={item.name} 
          qty={item.qty}
          onChange ={function(delta) {props.methods.onItemQtyChange(index, delta)}.bind(this)}
          onRemove={function(index) {props.methods.recipeItemRemove(index)}.bind(this)} 
          key={typeof item.ndbno != "undefined" ? item.ndbno : index} /> );
      }.bind(this))}
    </div>
    <SearchForm onSelect={props.methods.addItem} />
    </div>
  );
}

Recipe.propTypes = {
  food: React.PropTypes.array.isRequired,
  methods: React.PropTypes.object.isRequired,
}

var Cart = React.createClass({
  propTypes: {
    onItemAdd: React.PropTypes.func.isRequired,
    onFinish: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      food: []
    };
  },

  addItem: function(item) {
    this.state.food.push({
      name: item.name,
      ndbno: item.ndbno
    });
    this.setState(this.state);
  },

  changeExpDate: function(index, delta) {
    var d = this.state.food[index].expDate || new Date();
    d.setDate(d.getDate() + delta);
    this.setState(this.state.food[index].expDate = d);
    console.log(this.state.food[index])
  },

  createDateString: function(index) {
    var d = this.state.food[index].expDate || false;
    var months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
    return d ? months[d.getMonth()] + ' ' + d.getDate() : 'who kno'
  },

  onFinish: function() {this.props.onFinish(this.state.food)},

  render: function() {
    return (
      <div className = "tile">
        <Header title="Cart" action={this.onFinish} />
        <div className="items">
            {this.state.food.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} 
                onRemove={function() {this.props.onItemAdd(item)}.bind(this)} 
                onChange={function(delta) {this.changeExpDate(index, delta)}.bind(this)} 
                qty={this.createDateString(index)}
                key={item.ndbno}/>
                );
            }.bind(this))}
          </div>
        <SearchForm onSelect={this.addItem} btnText="Search" />
      </div>
    );
  }
});

var Application = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		initialFood: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
      ndbno: React.PropTypes.string,
      qty: React.PropTypes.number.isRequired
		})).isRequired,
	},

	getDefaultProps: function() {
    return {
      title: 'Pantry',
    }
	},

	getInitialState: function() {
		return {
			food: this.props.initialFood,
      recipes: [{
        name: 'Thai Yellow Curry',
        food: [],
      }]
		};
	},


  onItemAdd: function(item) {
    /**note on why push isn't in setState
     * the state variable is pushed
     * then the setState is updated
     * otherwise there's an error
     * because .push does not return
     * an object of state variablesonon
     */
    console.log(this);
    if(typeof item === 'string') {
      this.state.food.push({
        name: item,
        qty: 13
      });
      this.setState(this.state);
    } else if (typeof item === "object") {
      this.state.food.push({
        name: item.name,
        ndbno: item.ndbno,
        qty: 13
      });
      this.setState(this.state);
    } else {
      console.warn("item passed to OnItemAdd neither string nor object. type is " + typeof item + "\nItem is " + item);
    }
  },

  onItemRemove: function(index) {
    this.state.food.splice(index, 1);
    this.setState(this.state);
  },

  onItemQtyChange: function(index, delta) {
    this.state.food[index].qty += delta;
    this.setState(this.state);
  },

  consumeRecipe: function(food) {
    food.map(function(itemToAdd) {
      var inPantry = false;
      this.state.food.map(function(item, index) {if(item.ndbno == itemToAdd.ndbno){
        item.qty -= itemToAdd.qty;
        this.state.food[index] = item;
        this.setState(this.state);
        inPantry = true;
      }}.bind(this));
      if(inPantry == false) {
        this.onItemAdd(itemToAdd);
      }
    }.bind(this));
  },

  mapItemsToAdd: function(items) {
    items.map(function(item, index) { this.onItemAdd(item)}.bind(this));
  },
  
  recipeMethods: function(recipe) {

    var recipe0 = recipe;
    var app = this;

    function set(newRecipe) {
      for (var i = app.state.recipes.length - 1; i >= 0; i--) {
        if(foodIsEqual(app.state.recipes[i].food, recipe0.food)) {  
          app.setState(app.state.recipes[i] = newRecipe);
        }
      }
      
    }

    set.bind(this);

    return {
      addItem: function(item) {
        recipe.food.push({
          name: item.name,
          ndbno: item.ndbno,
          qty: item.qty || "You Kno"
        });
        set(recipe);
      },

      onItemQtyChange: function(index, delta) {
        if(typeof recipe.food[index].qty === "number") {
          recipe.food[index].qty += delta;
        } else {
          recipe.food[index].qty = delta;
        }
        set(recipe.food);
      },

      recipeItemRemove: function() {
        app.consumeRecipe(recipe);
      } 
    }
  },

  render: function() {
    return(
      <div>
        <div className="tile">
          <Header title={this.props.title} stopwatch={false} />
          <div className="items">
            {this.state.food.map(function(item, index) {
  						return(
  							// TODO:: as you think about data structures, find better keys
  							<Item name={item.name} 
                qty={item.qty}
                onChange ={function(delta) {this.onItemQtyChange(index, delta)}.bind(this)}
                onRemove={function() {this.onItemRemove(index)}.bind(this)} 
                key={typeof item.ndbno != "undefined" ? item.ndbno : index}/>
  							);
  					}.bind(this))}
  				</div>
  				<AddItemForm onAdd={this.onItemAdd} />
          <SearchForm onSelect={this.onItemAdd} />
        </div>
        {this.state.recipes.map(function(recipe, index) {
          return (<Recipe key={recipe.name || this.state.recipes.length + 1} 
                          food={recipe.food} 
                          methods={this.recipeMethods(recipe)} />)
        }.bind(this))}
        <Cart onItemAdd={this.onItemAdd} onFinish={this.mapItemsToAdd} />
      </div>
		);
	}
});

ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));