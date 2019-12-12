import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';

/**
 * A component that is subscribed to the redux store and will fetch the modifier definitions
 * if they do not exist
 */
const ModifiersSubscriber = ({ modifiers, fetchModifiers }) => {
  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers.pending && (!modifiers.modifiers || !modifiers.modifiers.length)) {
        fetchModifiers();
      }
    },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => { debouncedUseEffect(); });

  return <span style={{ display: 'none' }} />;
};

ModifiersSubscriber.propTypes = {
  /** The current modifiers state in the store */
  modifiers: PropTypes.shape({
    modifiers: PropTypes.array,
    pending: PropTypes.bool,
  }).isRequired,
  /** A function used to fetch the modifiers from the API */
  fetchModifiers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ modifiers: state.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModifiersSubscriber);
