import React from 'react';
// import PropTypes from 'prop-types';

export default props => {
  const { Name, ID } = props.data;

  return (
    <div className="parent">
      <div className="column">
        {Name} {ID}
      </div>
      <div className="column">
        <button
          className="btn-delete"
          type="button"
          onClick={() => props.deleteFn(props.index)}
          onKeyPress={() => props.deleteFn(props.index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
