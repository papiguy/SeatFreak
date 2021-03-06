import React from 'react';
import { connect } from 'react-redux';
import {
  requestPerformer
} from '../../actions/performer_actions';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { track, untrack } from '../../actions/tracking_actions';
import EventsListItem from './events_list_item';
import Footer from '../footer';
import { openModal } from '../../actions/modal_actions';

class PerformerEventsIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imageView: false
    };
    this.handleTracking = this.handleTracking.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }


  handleLoad() {
    this.setState({
      imageView: true
    });
  }

  componentDidMount() {
    this.props.requestPerformer(this.props.match.params.performerId);
  }

  componentDidUpdate(prevParams) {
    if (prevParams.match.params.performerId !== this.props.match.params.performerId) {
      this.props.requestPerformer(this.props.match.params.performerId);
    }
  }

  handleTracking() {
    if (this.props.loggedIn) {
      if (this.props.tracked) {
        this.props.untrack({ trackable_type: "Performer", trackable_id: this.props.performer.id });
      } else {
        this.props.track({ trackable_type: "Performer", trackable_id: this.props.performer.id });
      }

    } else {
      this.props.openLoginModal();
    }
  }

  render() {
    if (!this.props.performer) return (
      <div className="loading-div"></div>
    );

    const eventLinks = this.props.events.map(event => {
      let venue = this.props.venues[event.venueId];
      return (
        <li className="performer-event-list-item" key={event.id}>
          <Link to={`/events/${event.id}`} >
            <EventsListItem event={event} venue={venue}/>
          </Link>
        </li>
      );
    });

    return (
      <div className="performers-index-container" >
        <header className="item-show-main-content-splash loading-gif">
          <img src={this.props.performer.photoUrl} onLoad={this.handleLoad} className={this.state.imageView ? "image-shown" : "image-hidden"}/>
          <div className="main-content-splash-overlay"></div>
          <div className="main-content-splash-info">
            <h3 className="main-content-route-info">
              <span>
                <Link to="/" >Home</Link> / <Link to={`/categories/${this.props.performer.category}`} >{this.props.performer.category}</Link> / {this.props.performer.name}
              </span>
            </h3>
            <div className="main-content-splash-name">
              <h1>{this.props.performer.name} Tickets</h1>
              <h2 className="main-content-track-button">
                <i className={`fa-heart fa-sm ${ this.props.tracked ? "fas tracked" : "far"}`} onClick={this.handleTracking.bind(this)}></i>
              </h2>
            </div>
          </div>
        </header>
        <div className="main-content-content" >
          <h1 className="performer-category-title">All Events</h1>
          <ul>
            {eventLinks}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

const mSP = (state, ownProps) => {
  const performerId = Number(ownProps.match.params.performerId);
  const performer = state.entities.performers[performerId];
  const events = Object.values(state.entities.events).filter(event => event.performers.includes(performerId));
  let trackedPerformers = [];

  let loggedIn = Boolean(state.session.id);

  if (loggedIn) {
    trackedPerformers = state.entities.currentUser.trackedItems.trackedPerformers;
  }


  let tracked = false;
  if (performer) {
    tracked = trackedPerformers.includes(performer.id);
  }

  return {
    performer,
    events,
    venues: state.entities.venues,
    tracked,
    loggedIn
  };
};

const mDP = dispatch => {
  return {
    requestPerformer: performerId => dispatch(requestPerformer(performerId)),
    track: performer => dispatch(track(performer)),
    untrack: performer => dispatch(untrack(performer)),
    openLoginModal: () => dispatch(openModal("login"))
  };
};

export default withRouter(connect(mSP, mDP)(PerformerEventsIndex));
