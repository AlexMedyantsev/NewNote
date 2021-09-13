import React from 'react';
import {connect} from 'react-redux';

 function ShowMoreButton({callback, amountToShowOnClick, maxCount, currentCount}) {

  const onShowMoreButtonClick = () => {
    callback(amountToShowOnClick);
  }

  return (
    <button onClick={() => onShowMoreButtonClick()} className={currentCount !== maxCount ? 'show-more' : 'show-more__hidden'}>Показать Больше</button>
  )
}

export default ShowMoreButton;