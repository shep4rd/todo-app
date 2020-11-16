import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TaskCard } from "./TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, reorderTasks } from "./taskListSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function TaskList() {
  const dispatch = useDispatch();
  const savedTasks = useSelector(selectTasks);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const newTasks = reorder(
      savedTasks,
      result.source.index,
      result.destination.index
    );

    dispatch(reorderTasks(newTasks));
  }

  return (
    <Grid container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={{width: '100%'}}>           
              <Grid item xs={12}>
                {savedTasks.map((task, index) => (
                  <TaskCard
                    index={index}
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    bgColor={task.bgColor}
                    txtColor={task.txtColor}
                  />
                ))}
                {provided.placeholder}
            </Grid>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Grid>
  );
}
