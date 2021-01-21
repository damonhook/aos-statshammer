import { Breadcrumbs, Button, Divider, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import { ImportExport, Save } from '@material-ui/icons'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { PAGE_ROUTES } from 'utils/routes'

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

const UnitToolBar = () => {
  const classes = useStyles()
  const history = useHistory()

  const onHomeClick = (event: React.MouseEvent<{}>) => {
    event.preventDefault()
    history.goBack()
  }

  return (
    <div className={classes.toolbar}>
      <div className={classes.items}>
        <div className={classes.breadcrumbs}>
          <Breadcrumbs>
            <Link color="inherit" href={PAGE_ROUTES.HOME} onClick={onHomeClick}>
              Home
            </Link>
            <Typography color="textPrimary">Edit Unit</Typography>
          </Breadcrumbs>
        </div>
        <Button startIcon={<ImportExport />} size="small">
          Import
        </Button>
        <Button startIcon={<Save />} size="small">
          Export
        </Button>
      </div>
      <Divider />
    </div>
  )
}

export default UnitToolBar
