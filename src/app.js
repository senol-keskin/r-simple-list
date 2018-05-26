import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ListItems from './components/ListItems';

import './styles/main.scss';

const api = {
  fetchData: () => axios.get('/dataset.json').then(res => res.data),
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

  deleteItem = item => {
    this.setState(prevState => ({
      listData: prevState.listData.filter(el => el !== item),
    }));
  };

  collapse = item => {
    this.setState(prevState => ({
      listData: prevState.listData.map(el => {
        const arr = el;
        if (el === item) {
          arr.isCollapsed = !el.isCollapsed;
        }
        return arr;
      }),
    }));
  };

  render() {
    return (
      <ListItems data={this.state.listData} deleteFn={this.deleteItem} collaspeFn={this.collapse} />
    );
  }
}

ReactDOM.render(<List />, document.getElementById('root'));
