import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import { ListItem, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    flex: 1,
  },
  description: {
    color: theme.palette.text.secondary,
  },
  icon: {
    flexDirection: 'column',
    margin: 'auto',
  },
}));


const ModifierOption = ({ modifier, onClick }) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.modifierOption} onClick={() => onClick(modifier)} button>
      <div className={classes.body}>
        <div className={classes.content}>
          <Typography variant="body1" className={classes.name}>
            {modifier.name}
          </Typography>
          <Typography variant="body2" className={classes.description}>
            {modifier.description}
          </Typography>
        </div>
        <div className={classes.icon}>
          <Add />
        </div>
      </div>
    </ListItem>
  );
};

export default ModifierOption;
