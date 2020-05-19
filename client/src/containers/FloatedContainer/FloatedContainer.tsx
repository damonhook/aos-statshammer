import { AddTargetModifierFab, AddUnitFab, ExportPdfFab } from 'components/FloatingButton';
import Notification from 'components/Notification';
import { useIsMobile, useRouteFind } from 'hooks';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { IStore } from 'types/store';
import { ROUTES } from 'utils/urls';

/**
 * A component used to display the current notifications
 */
const FloatedContainer = () => {
  const notifications = useSelector((state: IStore) => state.notifications);
  const [, , page] = useRouteFind(Object.values(ROUTES));
  const mobile = useIsMobile();

  const activeNotification = notifications?.length ? notifications[0] : null;

  const FloatingButton = useMemo(() => {
    if (!mobile) return null;
    switch (page) {
      case ROUTES.HOME:
        return <AddUnitFab />;
      case ROUTES.STATS:
        return <ExportPdfFab />;
      case ROUTES.TARGET:
        return <AddTargetModifierFab />;
      default:
        return null;
    }
  }, [mobile, page]);

  return (
    <div>
      {FloatingButton}
      {activeNotification && (
        <Notification
          message={activeNotification.message}
          notificationId={activeNotification.key}
          key={activeNotification.key}
          variant={activeNotification.variant}
          action={activeNotification.action}
          hasActiveFab={FloatingButton != null}
        />
      )}
    </div>
  );
};

export default FloatedContainer;
