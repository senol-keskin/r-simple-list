import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from '../styles/main.scss';

const rootElement = document.getElementById('root');

const api = {
  fetchData: function() {
    var dataSource = 'dataset.json';

    return axios.get(dataSource).then(function(res) {
      return res.data;
    });
  },
};

class List extends React.Component {
  constructor(props) {
    super();
    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    api.fetchData().then(
      function(data) {
        this.setState(function() {
          return {
            listData: data,
          };
        });
      }.bind(this),
    );
  }

  setItems(index) {
    console.log(index);
    var newList = this.state.listData.slice();
    newList.splice(index, 1);
    this.setState({
      listData: newList,
    });
  }

  render() {
    return (
      <div className="list-wrapper">
        {this.state.listData.map(
          function(value, index, arr) {
            return !value.hasOwnProperty('parentID') ? (
              <div key={value.ID} className="list-item">
                <div className="parent" onClick={this.setItems.bind(this, index)}>
                  {value.Name} {value.parentID}
                </div>
                {arr
                  .filter(function(parent) {
                    return value.ID === parent.parentID;
                  })
                  .map(function(parse) {
                    return (
                      <div key={parse.Name} className="child">
                        {parse.Name}
                      </div>
                    );
                  })}
              </div>
            ) : null;
          }.bind(this),
        )}
      </div>
    );
  }
}

ReactDOM.render(<List />, rootElement);
