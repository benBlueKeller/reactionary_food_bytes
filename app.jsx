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
    callback(JSON.parse(this.responseText));
  };
  var req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.open("GET", url);
  req.send();
}

var createItemObj = function(ndbno) {
  var item = {};
  return AJAX(window.url.food(ndbno), function(json) {
    console.log(json);
    item = json.report.food;
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
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

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

function SearchUSDA(props) {
  return (
    <div className = "tile">
      <Header title="Search USDA" />
      <SearchForm onSelect={props.onSelect} />
    </div>);
};

SearchUSDA.propTypes = {
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
          console.log(createItemObj(this.state.ndbno))
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

var Cart = React.createClass({
  propTypes: {
    onItemAdd: React.PropTypes.func.isRequired,
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

  changeExpDate: function(item) {
    
  },

  render: function() {
    return (
      <div className = "tile">
        <Header title="Cart" />
        <div className="items">
            {this.state.food.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} onRemove={function() {this.props.onItemAdd(item)}.bind(this)} key={item.ndbno}/>
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
			food: this.props.initialFood
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
		if(typeof item === 'string') {
      this.state.food.push({
  			name: item,
        qty: 13
  		});
  		this.setState(this.state);
    } else if (typeof item === "object") {
      console.warn(item);
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

	render: function() {
		return(
      <div>
  			<div className="tile">
  				<Header title={this.props.title} />
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
        <Cart onItemAdd={this.onItemAdd} />
      </div>
		);
	}
});

ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));