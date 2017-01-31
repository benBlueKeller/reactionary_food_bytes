import React, { Component, PropTypes } from 'react';

import { getJSON } from '../methods/cors.js';
import { getKeys } from '../methods/get-api.js';
import TextForm from './text-form.js';
import Item from './item.js';

var AJAX = (url, callback) => {
  var onLoad = function() {
    return callback(JSON.parse(this.responseText));
  };
  var req = new XMLHttpRequest();
  req.addEventListener("load", onLoad);
  req.open("GET", url);
  req.send();
}

var createItemObj = (ndbno) => {
  return getJSON('http://api.nal.usda.gov/ndb/reports/?ndbno=' + ndbno + '&type=f&format=json&api_key=' + window.apiKeys.gov, function(json) {
    //console.log(json);
    var item = json.report.food;
    return {
    name: item.name,
    ndbno: ndbno,
    serving: item.nutrients[0].qty,
    label: item.nutrients[0].label
    }
  });
};

export default class SearchForm extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  state = {
    results: []
  };

  sendReq = (search) => {
    var url = "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search + "&sort=n&max=25&offset=0&api_key=" + window.apiKeys.gov;
    //var newWindow = window.open(url, "searchJSON");
    var showResults = function(resJSON) {
      this.setState(this.state.results = []);
      console.log(resJSON);
      try {
        for (var i = resJSON.list.item.length - 1; i >= 0; i--) {
          this.state.results.push({
            name: resJSON.list.item[i].name,
            ndbno: resJSON.list.item[i].ndbno
          });
          //console.log(createItemObj(this.state.ndbno));
        }
      } catch(e) {
        this.state.results.push({
          name: "No Items Found",
          ndbno: "failure"
        })
      }
      this.setState(this.state);
    }.bind(this);
    //AJAX(url, showResults);    
    getJSON(url, showResults);
  };

  onSelect = (index) => {
    this.props.onSelect(this.state.results[index]);
  };

  render() {
    if(!window.apiKeys) {
      getKeys((keys) => {window.apiKeys = keys})
    }

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
};