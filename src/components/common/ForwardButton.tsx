import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
    background: "#46ACAF",
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    "& :last-child": {
      marginLeft: "auto",
    },
  },
  toolbarSecondScreen: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toolbarThirdScreen: {
    display: "flex",
    justifyContent: "flex-end",
  },
  marginLeftButton: {
    marginLeft: "35px",
  },
  marginRightButton: {
    marginRight: "35px",
  },
  title: {
    color: "#ffffff",
  },
  titleQuestionEndPage: {
    color: "#ffffff",
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
  arrow: {
    marginLeft: "5px",
    color: "#ffffff",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    color: "#ffffff",
  },
}))(Button);

type IForwardButton = {
  disable: boolean;
  handleClick: () => void;
  text: string;
};
const ForwardButton: React.FC<IForwardButton> = ({
  disable,
  handleClick,
  text,
}) => {
  const classes = useStyles();

  return (
    <ColorButton disabled={disable} onClick={handleClick}>
      <Typography variant="subtitle1" className={classes.title}>
        {text}
      </Typography>
      <ArrowForwardIosIcon className={classes.arrow} />
    </ColorButton>
  );
};

export default ForwardButton;
