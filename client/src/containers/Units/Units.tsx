import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import NoItemsCard from 'components/NoItemsCard';
import ProfileDialog from 'containers/ProfileDialog';
import React from 'react';
import { DragDropContext, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { unitsSelector } from 'store/selectors';
import { unitsStore } from 'store/slices';

import AddUnitButton from './AddUnitButton';
import DraggableUnitWrapper from './DraggableUnitWrapper';

const useStyles = makeStyles(() => ({
  units: {
    overflowX: 'hidden',
  },
}));

interface IUnitsProps {
  className?: string;
}

const Units = ({ className }: IUnitsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const units = useSelector(unitsSelector);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch(unitsStore.actions.moveUnit({ index: source.index, newIndex: destination.index }));
  };

  return (
    <div className={clsx(classes.units, className)}>
      {!units?.length ? (
        <NoItemsCard header="It's lonely here" body="There are no units here, try adding some" />
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="units">
            {(provided: DroppableProvided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {units.map((unit, index) => (
                  <DraggableUnitWrapper key={unit.uuid} index={index} unit={unit} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      {!mobile && <AddUnitButton units={units} />}
      <Route path="/units/:unitUuid/:profileIndex">
        <ProfileDialog open />
      </Route>
    </div>
  );
};

export default Units;
