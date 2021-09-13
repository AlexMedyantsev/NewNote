import React, {PureComponent} from 'react';
import connect from 'react-redux';

class Shop extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isFlipped: getIsFlippedState(state),
  }
};

const mapDispatchToProps = (dispatch) => ({
  resetActiveCard: () => dispatch(ActionCreatorCondition.resetActiveCard(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop);