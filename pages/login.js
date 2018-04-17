// pages/login
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI imports
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { FormControl } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';

import Nav from '../components/nav';
import withRoot from '../src/withRoot';
import redirect from '../src/redirect';
import { redirectIfAuthenticated } from '../src/authenticate';
import { withReduxSaga } from '../lib/withReduxSaga';

import { changeEmail, changePassword, login } from '../lib/auth/actions';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 450,
    padding: 20,
  },
  input: {
    width: 280,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
    height: 500,
  },
});

class Login extends React.Component {
  static async getInitialProps(context) {
    redirectIfAuthenticated(context);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.auth.isLoggedIn === true) {
      redirect('/');
    }
  }

  handleChange = name => (event) => {
    if (name === 'email') {
      this.props.dispatch(changeEmail({
        [name]: event.target.value,
      }));
    } else if (name === 'password') {
      this.props.dispatch(changePassword({
        [name]: event.target.value,
      }));
    }
  };

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(login());
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Nav />
        </div>
        <Grid container className={classes.root} align="center" justify="center" spacing={40} direction="column">

          {/* Begin Card */}
          <Grid item>
            <Card className={classes.card}>
              <form onSubmit={this.submitForm}>
                <CardContent>
                  <FormControl className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="email"
                          label="Email"
                          className={classes.input}
                          value={this.props.auth.email}
                          onChange={this.handleChange('email')}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                      <Grid item>
                        <Lock />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="password"
                          type="password"
                          label="Password"
                          className={classes.input}
                          value={this.props.auth.password}
                          onChange={this.handleChange('password')}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </CardContent>
                <CardActions>
                  <Button type="submit" color="secondary" style={{ marginLeft: 'auto' }}>Submit</Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
          {/* End Card */}

        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });
export default withRoot(withStyles(styles)(withReduxSaga(connect(mapStateToProps)(Login))));
