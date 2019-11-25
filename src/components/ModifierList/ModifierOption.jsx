import React from 'react';
import Card from 'components/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  modifierOption: {
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  modifierDescription: {
    color: 'darkgray',
  },
  modifierTitle: {},
});


const ModifierOption = ({ modifier, onClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.modifierOption} onClick={() => onClick(modifier)}>
      <Card.Body>
        <div className={classes.modifierTitle}>
          <b>{modifier.name}</b>
        </div>
        <div className={classes.modifierDescription}>
          {modifier.description}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModifierOption;
