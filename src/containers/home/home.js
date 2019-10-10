import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  useScrollTrigger,
  Slide,
  Button,
  TextField,
  MenuItem,
  Menu,
} from '@material-ui/core';
import { MoreVert, NavigateBefore, NavigateNext } from '@material-ui/icons';

import { mapDispatch, mapState } from './home.controller';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 50,
    color: 'primary',
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  optionsPage: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: props.currentPage,
      open: false,
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = url => {
    this.setState({ open: false, anchorEl: null }, () => {
      if (url) this.props.history.push(url);
    });
  };

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  componentDidMount = () => {};

  renderTopAppBar = classes => {
    return (
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={e => this.handleClick(e)}
          >
            <MoreVert />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            BPR
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  renderNavOptions = () => {
    const { open, anchorEl } = this.state;
    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: 200,
          },
        }}
        onClose={() => this.handleClose()}
      >
        <MenuItem selected onClick={() => this.handleClose('/')}>
          Home
        </MenuItem>
        <MenuItem onClick={() => this.handleClose('/')}>My Pokemon</MenuItem>
      </Menu>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        {this.renderNavOptions()}
        <Paper square className={classes.paper}></Paper>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Home));
