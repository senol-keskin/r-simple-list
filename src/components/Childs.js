import React from 'react';

export default props => {
  const { data: arr, parentid } = props;

  const childs = arr.filter(parent => parentid === parent.parentID);
  const hasChild = childs.length > 0;

  return (
    hasChild && (
      <ul className="childs">{childs.map(child => <li key={child.ID}>{child.Name}</li>)}</ul>
    )
  );
};
