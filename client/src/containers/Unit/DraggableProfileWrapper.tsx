import { Portal } from '@material-ui/core';
import WeaponProfile from 'containers/WeaponProfile';
import _ from 'lodash';
import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { IWeaponProfile } from 'types/unit';

interface IDraggableUnitWrapperProps {
  profile: IWeaponProfile;
  unitId: number;
  addProfileEnabled: boolean;
  numProfiles: number;
  index: number;
  className?: string;
}
const DraggableUnitWrapper = React.memo(
  ({ profile, unitId, addProfileEnabled, numProfiles, index, className }: IDraggableUnitWrapperProps) => {
    return (
      <Draggable index={index} draggableId={profile.uuid}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
          const { isDragging } = snapshot;
          return (
            <Portal container={null} disablePortal={!isDragging}>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                // {...provided.dragHandleProps}
                className={className}
              >
                <WeaponProfile
                  unitId={unitId}
                  id={index}
                  profile={profile}
                  key={profile.uuid}
                  addProfileEnabled={addProfileEnabled}
                  numProfiles={numProfiles}
                  dragHandleProps={provided.dragHandleProps}
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
