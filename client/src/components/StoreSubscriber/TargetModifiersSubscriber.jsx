import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTargetModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';

/**
 * A component that is subscribed to the redux store and will fetch the target modifier
 * definitions if they do not exist
 */
const TargetModifiersSubscriber = ({ modifiers, fetchTargetModifiers }) => {
  const [debouncedUseEffect] = useDebouncedCallback(
    () => {
      if (!modifiers.pending && (!modifiers.modifiers || !modifiers.modifiers.length)) {
        fetchTargetModifiers();
      }
    },
    DEBOUNCE_TIMEOUT,
  );

  useEffect(() => { debouncedUseEffect(); });

  return <span style={{ display: 'none' }} />;
};

TargetModifiersSubscriber.propTypes = {
  /** The current modifiers state in the store */
  modifiers: PropTypes.shape({
    modifiers: PropTypes.array,
    pending: PropTypes.bool,
  }).isRequired,
  /** A function used to fetch the modifiers from the API */
  fetchTargetModifiers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ modifiers: state.targetModifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchTargetModifiers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TargetModifiersSubscriber);
