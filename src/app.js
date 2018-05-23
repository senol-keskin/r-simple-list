import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Parent from './components/Parent';

import './styles/main.scss';

const api = {
  fetchData: () => axios.get('dataset.json').then(res => res.data),
};

class List extends React.Component {
  state = {
    listData: [],
  };

  componentWillMount() {
    api.fetchData().then(data => {
      this.setState(() => ({
        listData: data,
      }));
    });
  }

  deleteItem = index => {
    const newList = this.state.listData.slice();
    newList.splice(index, 1);
    this.setState({
      listData: newList,
    });
  };

  render() {
    return (
      <div className="list-wrapper">
        {this.state.listData.map(
          (value, index, arr) =>
            !Object.prototype.hasOwnProperty.call(value, 'parentID') && (
              <div key={value.ID} className="list-item">
                <Parent data={value} deleteFn={this.deleteItem} index={index} />
                {arr.filter(parent => value.ID === parent.parentID).length > 0 && (
                  <ul className="childs">
                    {arr
                      .filter(parent => value.ID === parent.parentID)
                      .map(child => <li key={child.ID}>{child.Name}</li>)}
                  </ul>
                )}
              </div>
            ),
        )}
      </div>
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));