import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import '../styles/main.scss';

const api = {
  fetchData: () => axios.get('dataset.json').then(res => res.data),
};

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [],
    };
  }

  componentWillMount() {
    api.fetchData().then(data => {
      this.setState(() => ({
        listData: data,
      }));
    });
  }

  setItems(index) {
    const newList = this.state.listData.slice();
    newList.splice(index, 1);
    this.setState({
      listData: newList,
    });
  }

  render() {
    return (
      <div className="list-wrapper">
        {this.state.listData.map(
          (value, index, arr) =>
            !Object.prototype.hasOwnProperty.call(value, 'parentID') && (
              <div key={value.ID} className="list-item">
                <div className="parent">
                  <div>
                    {value.Name} {value.parentID}
                  </div>
                  <button
                    className="btn-delete"
                    type="button"
                    onClick={() => this.setItems(index)}
                    onKeyPress={() => this.setItems(index)}
                  >
                    Delete
                  </button>
                </div>
                {arr.filter(parent => value.ID === parent.parentID).map(parse => (
                  <div key={parse.ID} className="child">
                    {parse.Name}
                  </div>
                ))}
              </div>
            ),
        )}
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
