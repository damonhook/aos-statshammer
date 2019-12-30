import React from 'react';
import { connect } from 'react-redux';
import FloatingButton from 'components/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import Link from 'components/Link';

const AddModifiersFab = () => (
  <Link to="#modifiers">
    <FloatingButton
      href="#modifiers"
      icon={<AddIcon />}
    />
  </Link>
);

const mapStateToProps = (state) => ({ numModifiers: state.target.modifiers.length });

export default connect(mapStateToProps)(AddModifiersFab);
