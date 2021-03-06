import React from 'react';
import { connect } from 'react-redux';
import { track, untrack } from '../../actions/tracking_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

class PerformerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageView: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTracking = this.handleTracking.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

   handleLoad() {
    this.setState({
      imageView: true
    });
  }

  handleTracking (e) {
    if (this.props.loggedIn) {
      if (this.props.tracked) {
        this.props.untrack({ trackable_type: "Performer", trackable_id: this.props.performer.id });
      } else {
        this.props.track({ trackable_type: "Performer", trackable_id: this.props.performer.id });
      }

      e.stopPropagation();
    } else {
      e.stopPropagation();
      this.props.openLoginModal();
    }
  }

  handleClick () {
    this.props.history.push(`/performers/${this.props.performer.id}`);
  }
 
  render() {

    return (
      <div className="item-card" onClick={this.handleClick}>
        <div className="item-card-artwork loading-gif">
          <img src={this.props.performer.photoUrl} onLoad={this.handleLoad} className={this.state.imageView ? "image-shown" : "image-hidden"}/>
          <div className="trackButton" onClick={this.handleTracking}>
            <i className={`fa-heart ${ this.props.tracked ? "fas tracked" : "far"}`}></i>
          </div>
        </div>
        <div className="item-card-info" >
          <h1>{this.props.performer.name}</h1>
          <h3>{this.props.performer.category}</h3>
        </div>
      </div>
    );
  }   
}

const mSP = (state, ownProps) => {
  let trackedPerformers = [];

  if (state.entities.currentUser.trackedItems) {
    trackedPerformers = state.entities.currentUser.trackedItems.trackedPerformers;
  }

  let tracked = trackedPerformers.includes(ownProps.performer.id);

  return {
    loggedIn: Boolean(state.session.id),
    tracked
  };
};

const mDP = dispatch => {
  return {
    track: item => dispatch(track(item)),
    untrack: item => dispatch(untrack(item)),
    openLoginModal: () => dispatch(openModal("login"))
  };
};

export default withRouter(connect(mSP, mDP)(PerformerCard));
