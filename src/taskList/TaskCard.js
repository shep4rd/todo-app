import React, { useState } from "react";
import styled from "styled-components";
import {
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Fade,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Modal,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { closeTask, editTask } from "./taskListSlice";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  cardActionStyle: {
    display: "inherit",
    width: "100%",
  },

  task: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "5px 0px",
  },

  cardBase: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  cardContent: {
    flexGrow: 1,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid grey",
    borderRadius: "8px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
    height: "400px",
  },

  modalInputTitle: {
    width: "100%",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    padding: "5px",
    marginBottom: "15px",
    backgroundColor: "#eeeeee",
  },

  modalInputDescription: {
    width: "100%",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    padding: "5px",
    marginBottom: "15px",
    backgroundColor: "#eeeeee",
    minHeight: "150px",
  },

  select: {
    minWidth: "50%",
    height: "50px",
  },

  colorBox: {
    width: "20px",
    height: "20px",
    border: "1px solid grey",
    borderRadius: "10px",
    marginRight: "10px",
  },

  colorName: {
    margin: "0px",
  },

  buttonDisabled: {
    display: "none",
  },
}));

const StyledSelect = styled(Select)`
  .MuiFilledInput-input {
    padding: 10px 12px 10px;
  }
`;

const bgColorRange = [
  ["grey", "#bbbbbb"],
  ["red", "#f6685e"],
  ["purple", "#af52bf"],
  ["indigo", "#6573c3"],
  ["blue", "#35baf6"],
  ["teal", "#33ab9f"],
  ["green", "#a2cf6e"],
  ["yellow", "#ffef62"],
  ["orange", "#ffac33"],
];

const txtColorRange = [
  ["black", "#000000"],
  ["red", "#aa2e25"],
  ["purple", "#6d1b7b"],
  ["indigo", "#2c387e"],
  ["blue", "#0276aa"],
  ["teal", "#00695f"],
  ["green", "#618833"],
  ["yellow", "#b2a429"],
  ["orange", "#b26a00"],
];

export function TaskCard(props) {
  const dispatch = useDispatch();
  const classes = useStyles(props);

  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState({
    id: props.id,
    title: props.title,
    description: props.description,
    bgColor: props.bgColor,
    txtColor: props.txtColor,
  });

  const modalBody = (
    <Fade in={modal}>
      <Grid className={classes.paper}>
        <InputLabel>Title</InputLabel>
        <InputBase
          className={classes.modalInputTitle}
          value={taskUpdate.title}
          onChange={(event) =>
            setTaskUpdate({ ...taskUpdate, title: event.target.value })
          }
        />
        <InputLabel>Description</InputLabel>
        <InputBase
          multiline
          rows={7}
          className={classes.modalInputDescription}
          value={taskUpdate.description}
          onChange={(event) =>
            setTaskUpdate({ ...taskUpdate, description: event.target.value })
          }
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InputLabel>Card color</InputLabel>
            <StyledSelect
              variant="filled"
              className={classes.select}
              value={taskUpdate.bgColor}
              onChange={(event) =>
                setTaskUpdate({ ...taskUpdate, bgColor: event.target.value })
              }
              renderValue={() => (
                <div
                  className={classes.colorBox}
                  style={{ backgroundColor: taskUpdate.bgColor }}
                ></div>
              )}
            >
              {bgColorRange.map(([name, code]) => {
                return (
                  <MenuItem value={code}>
                    <div
                      className={classes.colorBox}
                      style={{ backgroundColor: code }}
                    ></div>
                    <p className={classes.colorName}>{name}</p>
                  </MenuItem>
                );
              })}
            </StyledSelect>
          </Grid>

          <Grid item xs={6}>
            <InputLabel>Text color</InputLabel>
            <StyledSelect
              variant="filled"
              className={classes.select}
              value={taskUpdate.txtColor}
              onChange={(event) =>
                setTaskUpdate({ ...taskUpdate, txtColor: event.target.value })
              }
              renderValue={() => (
                <div
                  className={classes.colorBox}
                  style={{ backgroundColor: taskUpdate.txtColor }}
                ></div>
              )}
            >
              {txtColorRange.map(([name, code]) => {
                return (
                  <MenuItem value={code}>
                    <div
                      className={classes.colorBox}
                      style={{ backgroundColor: code }}
                    ></div>
                    <p className={classes.colorName}>{name}</p>
                  </MenuItem>
                );
              })}
            </StyledSelect>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(editTask(taskUpdate));
                setModal(false);
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );

  return (
    <Draggable key={props.id} draggableId={props.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Card
            className={classes.task}
            style={{ "backgroundColor": props.bgColor }}
          >
            <Grid item className={classes.cardBase} xs={12}>
              <CardActions xs={1}>
                <IconButton {...provided.dragHandleProps}>
                  <MenuIcon />
                </IconButton>
              </CardActions>
              <CardActionArea
                className={classes.cardActionStyle}
                disabled={props.description ? false : true}
                onClick={() => setExpanded(!expanded)}
              >
                <CardContent className={classes.cardContent} xs={9}>
                  <Typography variant="h6" style={{ color: props.txtColor }}>
                    {props.title ? props.title : "Add card title"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions xs={3}>
                <IconButton
                  size="small"
                  className={
                    props.description ? classes.buttonActive : classes.buttonDisabled
                  }
                  // disabled={description ? false : true }
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <IconButton size="small" onClick={() => setModal(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => dispatch(closeTask(props.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Grid>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className={classes.cardContent} xs={9}>
                <Typography paragraph style={{ color: props.txtColor }}>
                  {props.description
                    ? props.description
                    : "Add task description text"}
                </Typography>
              </CardContent>
            </Collapse>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={modal}
              onClose={() => setModal(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              {modalBody}
            </Modal>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
