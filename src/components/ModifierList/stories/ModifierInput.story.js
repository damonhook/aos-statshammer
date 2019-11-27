import React from 'react';
import { storiesOf } from '@storybook/react';
import ModifierInput from 'components/ModifierList/ModifierInput';

storiesOf('Components/ModifierList/ModiferInput', module)
  .add('Number', (state, setState) => {
    const onChange = (index, name, newVal) => { setState({ val: newVal }); };
    return (
      <ModifierInput
        index={0}
        name="input_name"
        option={{
          type: 'number',
        }}
        val={state.val}
        onOptionChange={onChange}
      />
    );
  })
  .add('Choice', (state, setState) => {
    const onChange = (index, name, newVal) => { setState({ val: newVal }); };
    return (
      <ModifierInput
        index={0}
        name="input_name"
        option={{
          type: 'choice',
          items: ['Option 1', 'Option 2', 'Option 3'],
        }}
        val={state.val}
        onOptionChange={onChange}
      />
    );
  })
  .add('Boolean', (state, setState) => {
    const onChange = (index, name, newVal) => { setState({ val: newVal }); };
    return (
      <ModifierInput
        index={0}
        name="input_name"
        option={{
          type: 'boolean',
        }}
        val={state.val}
        onOptionChange={onChange}
      />
    );
  });
