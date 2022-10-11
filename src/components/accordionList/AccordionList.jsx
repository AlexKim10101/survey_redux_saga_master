import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import ProgressCircular from "../progressCircular/ProgressCircular";

import "./styles/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "&$disabled": {
      backgroundColor: "rgba(214, 213, 213, 0.12)",
    },
  },
  disabled: {},
  heading: {
    marginLeft: "10px",
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordion: {
    background: "#fafafa",
  },
  margin: {
    margin: theme.spacing(1),
  },
  typography: {
    display: "flex",
    msFlexDirection: "row",
    marginTop: "5px",
  },
  questionTypography: {
    fontSize: "1.4em",
    marginLeft: "3px",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    backgroundColor: "#46acaf",
    margin: 0,
  },
}))(Button);

const AccordionList = ({ pages, onClickAccordionItemButton }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {pages.map((item, index) => {
        return (
          <Accordion
            key={index}
            classes={{
              root: classes.root,
              disabled: classes.disabled,
            }}
            defaultExpanded={item.expanded}
            disabled={item.disabled}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={item.id}
              id={item.id}
            >
              <ProgressCircular progress={item.progress} />

              <Typography className={classes.heading}>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div>
                <div className="questionSize">
                  <div className="question">Всего вопросов: </div>
                  <div className="questionNumber">50</div>
                </div>
                <div className="questionSize">
                  <div className="question">Обязательных вопросов: </div>
                  <div className="questionNumber">25</div>
                </div>
              </div>

              <ColorButton
                variant="contained"
                size="small"
                color="primary"
                onClick={() => onClickAccordionItemButton(index, false)}
                className={classes.margin}
              >
                {item.progress === 100 ? "Перейти" : "Перейти"}
              </ColorButton>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default AccordionList;
