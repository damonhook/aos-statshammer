import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Unit from 'containers/Unit';
import _ from 'lodash';
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { IUnit } from 'types/unit';

const useStyles = makeStyles({
  dragging: {
    border: '2px solid green',
    marginLeft: -220,
    marginTop: -86,
    position: 'absolute',
  },
});

interface IDraggableUnitWrapperProps {
  unit: IUnit;
  index: number;
  className?: string;
}
const DraggableUnitWrapper = React.memo(
  ({ unit, index, className }: IDraggableUnitWrapperProps) => {
    const classes = useStyles();
    return (
      <Draggable index={index} draggableId={unit.uuid}>
        {(provided: DraggableProvided, snapshot) => {
          const { isDragging } = snapshot;
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              // {...provided.dragHandleProps}
              className={clsx(className, { [classes.dragging]: isDragging })}
            >
              <Unit unit={unit} id={index} dragHandleProps={provided.dragHandleProps} />
            </div>
          );
        }}
      </Draggable>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps),
);

export default DraggableUnitWrapper;
