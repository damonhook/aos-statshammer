import { Breadcrumbs, Divider, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { DIALOG_ROUTES, getDialogRoute, PAGE_ROUTES } from 'utils/routes'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    marginBottom: theme.spacing(3),
  },
  items: {
    display: 'flex',
    marginBottom: theme.spacing(1),
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& > *': {
      marginRight: theme.spacing(1),
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  breadcrumbs: {
    flex: 1,
    [theme.breakpoints.down(350)]: {
      display: 'none',
    },
  },
}))

interface ProfileToolBarProps {
  unitId: string
}

const ProfileToolBar = ({ unitId }: ProfileToolBarProps) => {
  const classes = useStyles()
  const history = useHistory()

  const onUnitClick = (event: React.MouseEvent<any>) => {
    event.preventDefault()
    history.goBack()
  }

  const onHomeClick = (event: React.MouseEvent<any>) => {
    event.preventDefault()
    history.goBack()
    history.goBack()
  }

  const unitHref = useMemo(() => getDialogRoute(DIALOG_ROUTES.EDIT_UNIT, { unitId }), [unitId])

  return (
    <div className={classes.toolbar}>
      <div className={classes.items}>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs>
            <Link color="inherit" href={PAGE_ROUTES.HOME} onClick={onHomeClick}>
              Home
            </Link>
            <Link color="inherit" href={unitHref} onClick={onUnitClick}>
              Edit Unit
            </Link>
            <Typography color="textPrimary">Edit Profile</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default React.memo(ProfileToolBar)
