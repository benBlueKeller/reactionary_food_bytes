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
				{props.name}
			</div>
		</div>
	);
}

Item.propTypes = {
	name: React.PropTypes.string.isRequired,
};

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

	render: function() {
		return(
			<div className="tile">
			<Header title={this.props.title} />
			<div className="items">
				{this.state.food.map(function(item) {
					return(
						<Item name={item.name}/>
						);
				}.bind(this))}
			</div>
			</div>
		);
	}
});

ReactDOM.render(<Application initialFood={FOOD}/>, document.getElementById('container'));