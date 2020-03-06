import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import React, { useState } from "react";
import { connect } from "react-redux";
import "../App.css";

const Header = props => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    props.search(searchValue);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
        color: "#fafafa"
      }
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200
        }
      }
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap>
            <Button href="../App.js"><h2>Discover Anime</h2></Button>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Anime…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchValue}
              onChange={handleSearchInputChanges}
            />
          </div>
          <input onClick={callSearchFunction} type="submit" value="search" />
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    search: searchString =>
      dispatch({ type: "SELECT_INPUT_VALUE", search: searchString })
  };
};

export default connect(null, mapDispatchToProps)(Header);
