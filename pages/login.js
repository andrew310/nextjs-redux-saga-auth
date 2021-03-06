// pages/login
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MUI imports
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { CircularProgress } from 'material-ui/Progress';

import Nav from '../components/nav';
import withRoot from '../src/withRoot';
import redirect from '../src/redirect';
import { redirectIfAuthenticated } from '../src/authenticate';
import { withReduxSaga } from '../lib/withReduxSaga';

import { changeEmail, changePassword, login } from '../lib/auth/actions';

const styles = theme => ({
  buttonProgress: {
    // color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonWrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
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
    const { auth, classes } = this.props;
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
                  <FormControl className={classes.margin} aria-describedby="login-helper-text">
                    <FormHelperText error id="login-helper-text">{auth.error}</FormHelperText>
                    <br />
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
                  <Grid container spacing={8} justify="flex-end">
                    <Grid item>
                      <div className={classes.buttonRoot}>
                        <div className={classes.buttonWrapper}>
                          <Button color="secondary" disabled={auth.loggingIn} type="submit">Submit</Button>
                          {auth.loggingIn &&
                            <CircularProgress size={24} className={classes.buttonProgress} />
                          }
                        </div>
                      </div>
                    </Grid>
                  </Grid>
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
