import React from 'react';
import { connect } from "react-redux";
import { Accordion, Button } from "semantic-ui-react";
import Option from "./Option";
import "./index.scss";

class ModifierSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  render() {
    const { modifiers, pending, error, onClick } = this.props
    if (pending) {
      return (
        <div className="modifier-selector">
          <Button content="Add Modifier" fluid disabled loading />
        </div>
      )
    }
    if (error || !modifiers || !modifiers.length) {
      return null
    }
    return (
      <div className="modifier-selector">
        <Button content="Add Modifier" fluid onClick={() => this.setState({ open: !this.state.open })} />
        {this.state.open ?
          <div className="modifier-options">
            {modifiers.map((modifier) => (
              <Option modifier={modifier} onClick={onClick} />
            ))}
          </div>
          : null}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  ...state.modifiers
});

export default connect(mapStateToProps)(ModifierSelector);
