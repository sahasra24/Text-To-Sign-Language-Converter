import React, {useState} from 'react';

function Community(props) {
  const handleClick = () => {
    props.updateIndex(props.index)
  }
  return (
    <React.Fragment>
      <div className={props.active ? 'community active': 'community'} onClick={handleClick}>{props.name} <span className="active"></span></div>
    </React.Fragment>
  )
}

export default Community;
