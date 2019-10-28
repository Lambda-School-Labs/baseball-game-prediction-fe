import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { axiosWithAuth } from "../../utils/axiosAuth.js";
import axios from "axios";
import { connect } from "react-redux"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 70
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const TeamList = props => {
  const classes = useStyles();
  console.log("props", props.division);
  const [favorite, setFavorite] = useState({});

  const submit = team => {    
    console.log("team", team)
    const teams = {
      profile_id: props.profile_id,
      team_id: team.team_id
    }    
    axiosWithAuth()
      .post(`/api/favoriteTeams`, teams)
      .then(res => {
        //localStorage.setItem('token', res.data.payload)
        //console.log("this token", res.data.payload);
        console.log('res', res)
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    console.log("props2", props);
  }, []);

  console.log(props.division);

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="list"
        className="division-list"
        subheader={
          <ListSubheader component="div" id="list-subheader">
            {`${props.division[0].league} ${props.division[0].division}`}
          </ListSubheader>
        }
      >
        {props.division.map(team => {
          return (
            <ListItem onClick={() => submit(team)} button key={`${team.team_id}`}>
              <ListItemText primary={`${team.team_name}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    profile_id: state.profile_id
  };
};

export default connect(
  mapStateToProps,
  {}
)(TeamList);