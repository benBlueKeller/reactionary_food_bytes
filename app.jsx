var FOOD = [
	{
		name: "coconut milk"
	},
	{
		name: "curry paste"
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

function Item(props) {
	return (
		<div className="item">
			<div className="item-name">
				<a className="remove-item" onClick={props.onRemove}>✖</a>
				{props.name}
			</div>
		</div>
	);
}

Item.propTypes = {
	name: React.PropTypes.string.isRequired,
	onRemove: React.PropTypes.func.isRequired
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

function SearchedItem(props) {
  return (
    <div className="item">
      <div className="item-name">
        {props.name}
        <a className="remove-item" onClick={props.onSelect}>&#9757</a>
      </div>
    </div>
    );
}

SearchedItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func.isRequired
};

var SearchUSDA = React.createClass({
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
    var newWindow = window.open(url, "searchJSON");
    var onLoad = function() {
      var resJSON = JSON.parse(this.responseText);
      for (var i = resJSON.list.item.length - 1; i >= 0; i--) {
        this.state.results.push({
          name: resJSON.list.item[i].name,
          nbdno: resJSON.list.item[i].nbdno
        });
      }
      this.setState(this.state);
    }.bind(this);
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
                <SeachedItem name={item.name} onSelect={function() {this.onSelect(index)}.bind(this)} key={index}/>
                );
            }.bind(this))}
          </div>
      </div>);
  }
});

var Application = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		initialFood: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
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

  	onItemAdd: function(name) {
  		/**note on why push isn't in setState
  		 * the state variable is pushed
  		 * then the setState is updated
  		 * otherwise there's an error
  		 * because .push does not return
  		 * an object of state variablesonon
  		 */
  		this.state.food.push({
  			name: name,
  		});
  		this.setState(this.state);
  	},

  	onItemRemove: function(index) {
  		this.state.food.splice(index, 1);
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
  							<Item name={item.name} onRemove={function() {this.onItemRemove(index)}.bind(this)} key={index}/>
  							);
  					}.bind(this))}
  				</div>
  				<AddItemForm onAdd={this.onItemAdd} />
  			</div>
        <SearchUSDA onSelect={this.onItemAdd} />
      </div>
		);
	}
});

ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));