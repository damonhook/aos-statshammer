import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchModifiers } from 'api';
import { bindActionCreators } from 'redux';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_TIMEOUT } from 'appConstants';

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

const mapStateToProps = (state) => ({ modifiers: state.modifiers });

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchModifiers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModifiersSubscriber);
