import React from 'react';
import { connect } from "react-redux";
import { Accordion, Button } from "semantic-ui-react";
import ModifierOption from "./ModifierOption";
import "./index.scss";

class ModifierSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  addModifier = (modifier) => {
    this.props.onClick(modifier)
    this.setState({ open: false })
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
        {this.state.open ?
          <div>
            <Button icon="cancel" content="Cancel" fluid negative onClick={() => this.setState({ open: false })} />
            <div className="modifier-options">
              {modifiers.map((modifier) => (
                <ModifierOption modifier={modifier} onClick={this.addModifier} />
              ))}
            </div>
          </div>
          :
          <Button icon="add" content="Add Modifier" fluid positive onClick={() => this.setState({ open: true })} />
        }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  ...state.modifiers
});

export default connect(mapStateToProps)(ModifierSelector);
