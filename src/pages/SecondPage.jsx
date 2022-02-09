import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import DoneIcon from "@material-ui/icons/Done";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import QuestionPage from "./QuestionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "6px",
    backgroundColor: theme.palette.background.paper,
  },
  index: {
    marginRight: "20px",
  },
  title: {
    fontSize: "1.4em",
    margin: "0",
    padding: "20px 20px 0px 20px",
  },
  requiredQuestion: {
    color: "red",
  },
  doneIcon: {
    display: "flex",
    marginRight: "15px",
  },
  doneIconColorGrey: {
    color: "#F5F5F5",
  },
}));

function SecondPage({
  questionsList,
  questionsName,
  activeQuestionStep,
  onClickListSecondPage,
  openSecondPage,
  setActiveQuetionStep,
  openAswersPage,
}) {
  const classes = useStyles();

  const onListItemClick = () => {
    onClickListSecondPage(true);
    setActiveQuetionStep(0);
  };

  const listItemText = (question, index, questionRequired) => {
    return (
      <div>
        {" "}
        {index + 1}. {question}{" "}
        {questionRequired ? (
          <span className={classes.requiredQuestion}>*</span>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <TransitionGroup>
        <CSSTransition
          key={openSecondPage}
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
          classNames="fade"
          // classNames={{
          //   enter: "animate__animated",
          //   enterActive: "animate__slideInRight animate__slower",
          //   enterDone: "animate__animated",
          //   exit: "animate__animated",
          //   exitActive: "animate__slideOutLeft animate__slower",
          //   exitDone: "animate__animated",
          // }}
        >
          {openSecondPage ? (
            <QuestionPage
              questionsList={questionsList}
              questionsName={questionsName}
              activeQuestionStep={activeQuestionStep}
              openAswersPage={openAswersPage}
            />
          ) : (
            <div className={classes.root}>
              <div className={classes.title}>
                <Typography variant="body1" gutterBottom>
                  Первый список вопросов:
                </Typography>
              </div>
              <List component="nav" aria-label="secondary mailbox folders">
                {questionsList.map((item, index) => {
                  return (
                    <div>
                      <ListItem onClick={onListItemClick} button>
                        {item.questionDone ? (
                          <DoneIcon
                            style={{ color: "#52C41A" }}
                            className={classes.index}
                          />
                        ) : (
                          <div className={classes.doneIcon}>
                            <DoneIcon style={{ color: "#F5F5F5" }} />
                          </div>
                        )}

                        <ListItemText
                          primary={listItemText(
                            item.question,
                            index,
                            item.questionRequired
                          )}
                        />
                        <ArrowForwardIosIcon
                          style={{
                            fontSize: 15,
                            marginLeft: 10,
                            color: "#757575",
                          }}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default SecondPage;
