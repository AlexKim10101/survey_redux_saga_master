import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  IPageName,
  ISlideMoveDirection,
  IState,
} from "../../duck/fakeData/surveyData";
import FakeMenu from "../fakeMenu/FakeMenu";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { changeCurrentPage, changeSlideMoveDirection } from "../../duck";

const useStyles = makeStyles((theme) => ({
  root: {},
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

// export type IAppBarTop = {
//   currentPage: IPageName;
//   openMainPage: () => void;
//   openSectionPage: () => void;
//   openCampaningPage: () => void;
//   setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => void;
// };

const AppBarTop: React.FC<IAppBarTopProps> = ({
  currentPage,
  openMainPage,
  openSectionPage,
  setSlideMoveDirection,
  openCampaningPage,
}) => {
  const classes = useStyles();

  // const buttons = {
  //   section: {},
  //   question: {},
  //   answer: {},
  // };

  type ITooltipLeftButton = {
    currentPage: IPageName;
    openMainPage: () => void;
    openSectionPage: () => void;
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => void;
  };

  const TooltipLeftButton: React.FC<ITooltipLeftButton> = ({
    currentPage,
    openMainPage,
    openSectionPage,
    setSlideMoveDirection,
  }) => {
    const buttonsDict = useMemo(() => {
      return {
        section: {
          text: "К разделу",
          handleClick: () => {
            openCampaningPage();
            setSlideMoveDirection("left-to-right");
          },
        },
        question: {
          text: "К списку",
          handleClick: () => {
            openSectionPage();
            setSlideMoveDirection("left-to-right");
          },
        },
        answer: {
          text: "К разделу",
          handleClick: () => {
            openMainPage();
            setSlideMoveDirection("left-to-right");
          },
        },
        surveyCampaning: {
          text: "К списку кампаний",
          handleClick: () => {
            openMainPage();
            setSlideMoveDirection("left-to-right");
          },
        },
        main: {
          text: "что-то пошло не так",
          handleClick: () => {},
        },
        error: {
          text: "что-то пошло не так",
          handleClick: () => {},
        },
      };
    }, []);

    const { text, handleClick } = buttonsDict[currentPage];

    return (
      <>
        <ArrowBackIosIcon onClick={handleClick} />
        <Typography
          onClick={handleClick}
          variant="subtitle1"
          className={classes.title}
        >
          {text}
        </Typography>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.userInfo}>
            {currentPage === "main" ? (
              <>
                <Avatar
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
                <Typography variant="caption" className={classes.name}>
                  Коновалов Илья Александрович
                </Typography>
              </>
            ) : (
              <TooltipLeftButton
                currentPage={currentPage!}
                openMainPage={openMainPage}
                openSectionPage={openSectionPage}
                setSlideMoveDirection={setSlideMoveDirection}
              />
            )}
          </div>
          <FakeMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export type IAppBarTopProps = ConnectedProps<typeof connector>;

const mapStateToProps = (state: IState) => {
  const { currentPage } = state;

  return { currentPage };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openMainPage: () => {
      dispatch(changeCurrentPage({ pageName: "main" }));
    },
    openSectionPage: () => {
      dispatch(changeCurrentPage({ pageName: "section" }));
    },
    openCampaningPage: () => {
      dispatch(changeCurrentPage({ pageName: "surveyCampaning" }));
    },
    setSlideMoveDirection: (slideMoveDirection: ISlideMoveDirection) => {
      dispatch(changeSlideMoveDirection({ slideMoveDirection }));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AppBarTop);
