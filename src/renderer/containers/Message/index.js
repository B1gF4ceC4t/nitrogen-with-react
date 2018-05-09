import React from "react";
import { Route, connect } from "mirrorx";
import PrivateRoute from "routes/privateRoute";
import MessageList from "components/MessageList";
import MessagePage from "components/MessagePage";
import "./index.less";

const Message = ({ location, match, login }) => (
  <div className="message">
    <Route exact path={match.url} component={MessageList} />
    <PrivateRoute
      path={`${match.url}/mention/statuse`}
      component={MessagePage}
      login={login}
    />
    <PrivateRoute
      path={`${match.url}/mention/comment`}
      component={MessagePage}
      login={login}
    />
    <PrivateRoute
      path={`${match.url}/comment`}
      component={MessagePage}
      login={login}
    />
    {/*<Route component={NoMatch}/>*/}
  </div>
);

export default connect(state => state.auth)(Message);
