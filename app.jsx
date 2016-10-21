var food = [
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

function Player(props) {
	return (
		<div className="item">
			<div className="item-name">
				{props.name}
			</div>
		</div>
	);
}

var Application = React.createClass({
	propTypes: {
		title: React.PropTypes.string,
		food: React.PropTypes.arrayOf(React.PropTypes.shape({
			name: React.PropTypes.string.isRequired,
		})).isRequired,
	},

	getDefaultProps: function() {
	    return {
	      title: 'Pantry',
	    }
  	},

	render: function() {
		return(
			<div className="tile">
			<Header title={this.props.title} />
			</div>
		);
	}
});
/*
function Application(props) {
	return(
			<div className="tile">
			</div>
		);
}*/

ReactDOM.render(<Application food={food}/>, document.getElementById('container'));