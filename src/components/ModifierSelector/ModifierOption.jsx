import React from 'react';
import Card from 'components/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';


const useStyles = makeStyles({
  modifierOption: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    fontSize: '14px',
    flexDirection: 'column',
    flex: 1,
  },
  modifierDescription: {
    color: 'darkgray',
  },
  icon: {
    flexDirection: 'column',
    margin: 'auto',
  },
});


const ModifierOption = ({ modifier, onClick }) => {
  const classes = useStyles();
  return (
    <Card square className={classes.modifierOption} onClick={() => onClick(modifier)}>
      <Card.Body className={classes.body}>
        <div className={classes.content}>
          <div>
            {modifier.name}
          </div>
          <div className={classes.modifierDescription}>
            {modifier.description}
          </div>
        </div>
        <div className={classes.icon}>
          <Add />
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModifierOption;
