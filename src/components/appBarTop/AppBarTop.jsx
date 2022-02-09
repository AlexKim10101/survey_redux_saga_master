import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    background: "#46ACAF",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 1,
    color: "#ffffff",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    marginLeft: "10px",
  },
}));

export default function AppBarTop({
  openQuestionList,
  openSecondPage,
  openAswersPage,
  onClickAccordionItemButton,
  onClickListSecondPage,
  onClickFirstPage,
  onClickEndQuestion,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickBackButton = () => {
    if (openSecondPage === false) {
      onClickFirstPage(false);
    } else if (openAswersPage === false) {
      onClickListSecondPage(false);
    } else {
      onClickEndQuestion(false);
    }
  };

  const backButton = (openQuestionList, openSecondPage, openAswersPage) => {
    if (openQuestionList === false && openSecondPage === false) {
      return (
        <div className={classes.userInfo}>
          <Avatar
            alt="Remy Sharp"
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Typography variant="caption" className={classes.name}>
            Коновалов Илья Александрович
          </Typography>
        </div>
      );
    } else if (openQuestionList === true && openSecondPage === false) {
      return (
        <div className={classes.userInfo}>
          <ArrowBackIosIcon onClick={onClickBackButton} />
          <Typography
            onClick={onClickBackButton}
            variant="subtitle1"
            className={classes.title}
          >
            К разделу
          </Typography>
        </div>
      );
    } else if (openQuestionList === true && openSecondPage === true) {
      if (openAswersPage === false) {
        return (
          <div className={classes.userInfo}>
            <ArrowBackIosIcon onClick={onClickBackButton} />
            <Typography
              onClick={onClickBackButton}
              variant="subtitle1"
              className={classes.title}
            >
              К списку
            </Typography>
          </div>
        );
      } else {
        return (
          <div className={classes.userInfo}>
            <ArrowBackIosIcon onClick={onClickBackButton} />
            <Typography
              onClick={onClickBackButton}
              variant="subtitle1"
              className={classes.title}
            >
              К вопросам
            </Typography>
          </div>
        );
      }
    }
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          {backButton(openQuestionList, openSecondPage, openAswersPage)}
          <div>
            <Tooltip title="Notifications">
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleClick}
              >
                <Badge badgeContent={1} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Menu">
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
