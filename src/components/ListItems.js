import React from 'react';
import Child from './Childs';
// import PropTypes from 'prop-types';

export default props => {
  const { data } = props;
  const parentItems = data.filter(item => typeof item.parentID === 'undefined');

  return parentItems.map(item => {
    const childItems = data.filter(child => child.parentID === item.ID);
    const hasChild = childItems.length > 0;
    const isVisible = item.isVisible ? 'collapsed' : '';

    return (
      <div className={`list-item ${isVisible}`} key={item.ID}>
        <div className="parent">
          <div className="column">{item.Name}</div>

          {hasChild && (
            <div className="column">
              <button
                className={`btn-collapse ${isVisible}`}
                type="button"
                onClick={() => props.collaspeFn(item)}
              />
            </div>
          )}

          <div className="column">
            <button
              className="btn-delete"
              type="button"
              onClick={() => props.deleteFn(item)}
              onKeyPress={() => props.deleteFn(item)}
            >
              Delete
            </button>
          </div>
        </div>

        {hasChild && (
          <div className="childs">
            {childItems.map(child => <Child key={child.ID} data={child} />)}
          </div>
        )}
      </div>
    );
  });
};
