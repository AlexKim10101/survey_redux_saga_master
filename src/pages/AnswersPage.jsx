import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import QuestionPage from "../pages/QuestionPage";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
  inline: {
    display: "inline",
  },
  answer: {
    display: "flex",
    marginTop: "10px",
  },
}));

function AnswersPage({
  questionsList,
  questionsName,
  activeQuestionStep,
  onClickListSecondPage,
  openSecondPage,
  setActiveQuetionStep,
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
            />
          ) : (
            <div className={classes.root}>
              <div className={classes.title}>
                <Typography variant="body1" gutterBottom>
                  Ответы на вопросы:
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
                            <DoneIcon style={{ color: "#E0E0E0" }} />
                          </div>
                        )}

                        <ListItemText
                          primary={listItemText(
                            item.question,
                            index,
                            item.questionRequired
                          )}
                          secondary={
                            <React.Fragment>
                              <div className={classes.answer}>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {"Ответ:"}
                                </Typography>
                                <div
                                  style={{
                                    color: "#52C41A",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {item.answers}
                                </div>
                              </div>
                            </React.Fragment>
                          }
                        />

                        <EditIcon
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

export default AnswersPage;
