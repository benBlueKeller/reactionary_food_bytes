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

var Application = React.createClass({
	propTypes: {
		title: React.PropTypes.string
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

ReactDOM.render(<Application />, document.getElementById('container'));