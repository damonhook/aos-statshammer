import { makeStyles, Portal } from '@material-ui/core';
import clsx from 'clsx';
import Unit from 'containers/Unit';
import _ from 'lodash';
import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { IUnit } from 'types/unit';

const useStyles = makeStyles(() => ({
  dragging: {},
}));

interface IDraggableUnitWrapperProps {
  unit: IUnit;
  index: number;
  className?: string;
  setDragging?: (dragging: boolean) => void;
}
const DraggableUnitWrapper = React.memo(
  ({ unit, index, className, setDragging }: IDraggableUnitWrapperProps) => {
    const classes = useStyles();

    return (
      <Draggable index={index} draggableId={unit.uuid}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const { isDragging } = snapshot;
          return (
            <Portal container={null} disablePortal={!isDragging}>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                // {...provided.dragHandleProps}
                className={clsx(className, { [classes.dragging]: isDragging })}
              >
                <Unit
                  unit={unit}
                  id={index}
                  dragHandleProps={provided.dragHandleProps}
                  setDragging={setDragging}
                />
              </div>
            </Portal>
          );
        }}
      </Draggable>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default DraggableUnitWrapper;
