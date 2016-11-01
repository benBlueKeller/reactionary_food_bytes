var FOOD = [
	{
		name: "coconut milk",
    qty: 42
	},
	{
		name: "Mae Ploy Yellow Curry Paste",
    ndbno: "45103142",
    qty: 402
	}
];

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

/*var SearchUSDA = React.createClass({
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
      for (var i = resJSON.list.item.length - 1; i >= 0; i--) {
        this.state.results.push({
          name: resJSON.list.item[i].name,
          ndbno: resJSON.list.item[i].ndbno
        });
      }
      this.setState(this.state);
    }.bind(this);
    //onload is unbound to be response object: passes JSON to bound object
    var onLoad = function() {
      showResults(JSON.parse(this.responseText));
    };
    var req = new XMLHttpRequest();
    req.addEventListener("load", onLoad);
    req.open("GET", url);
    req.send();
  },

  onSelect: function(index) {
    this.props.onSelect(this.state.results[index]);
  },

  render: function(props) {
    return (
      <div className = "tile">
        <Header title="Search USDA" />
        <TextForm onSubmit={this.sendReq} btnText="Search" />
        <div className="items">
            {this.state.results.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} onRemove={function() {this.onSelect(index)}.bind(this)} key={item.ndbno}/>
                );
            }.bind(this))}
        </div>
      </div>);
  }
});*/

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
        }
      } catch(e) {
        this.state.results.push({
          name: "No Items Found",
          ndbno: "failure"
        })
      }
      this.setState(this.state);
    }.bind(this);
    //onload is unbound to be response object: passes JSON to bound object
    var onLoad = function() {
      showResults(JSON.parse(this.responseText));
    };
    var req = new XMLHttpRequest();
    req.addEventListener("load", onLoad);
    req.open("GET", url);
    req.send();
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
  render: function() {
    return (
      <div className = "tile">
        <Header title="Search USDA" />
        <TextForm onSubmit={this.sendReq} btnText="Search" />
        <div className="items">
            {this.state.results.map(function(item, index) {
              return(
                // TODO:: as you think about data structures, find better keys
                <Item name={item.name} onRemove={function() {this.onSelect(index)}.bind(this)} key={item.ndbno}/>
                );
            }.bind(this))}
          </div>
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
      this.state.food.push({
        name: item.name,
        ndbno: item.ndbno,
        qty: 13
      });
      this.setState(this.state);
    } else {
      console.warn("item passed to OnItemAdd neither string nor object");
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
      </div>
		);
	}
});

ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));