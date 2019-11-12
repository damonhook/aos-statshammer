import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { editWeaponProfile } from "actions/unit.action";
import Modifier from "components/Modifier";
import ModifierSelector from "components/ModifierSelector";
import { fetchModifiers } from "api";
import { bindActionCreators } from "redux";

class ProfileModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num_models: 1,
      attacks: 1,
      to_hit: 4,
      to_wound: 4,
      rend: 0,
      damage: 0,
      modifiers: [],
    }
  }

  handleOpen = () => {
    const { profile, fetchModifiers } = this.props;
    this.setState({
      ...profile
    }, () => {
      fetchModifiers()
    })
  }

  handleChange = (_, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { id, editWeaponProfile } = this.props;
    editWeaponProfile(id, this.state)
  }

  addModifier = (modifier) => {
    this.setState({
      ...this.state,
      modifiers: [
        ...this.state.modifiers,
        modifier
      ]
    })
  }

  removeModifier = (index) => {
    this.setState({
      ...this.state,
      modifiers: this.state.modifiers.filter((_, i) => i !== index)
    })
  }

  render() {
    const { trigger, header, profile } = this.props;
    if (profile) {
      return (
        <Modal trigger={trigger} onOpen={this.handleOpen}>
          <Modal.Header>{header}</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input type="number" label="Number of models" name="num_models" value={this.state.num_models} onChange={this.handleChange} />
              <Form.Input type="number" label="Attacks" name="attacks" value={this.state.attacks} onChange={this.handleChange} />
              <Form.Input type="number" label="To Hit" name="to_hit" value={this.state.to_hit} onChange={this.handleChange} />
              <Form.Input type="number" label="To Wound" name="to_wound" value={this.state.to_wound} onChange={this.handleChange} />
              <Form.Input type="number" label="Rend" name="rend" value={this.state.rend} onChange={this.handleChange} />
              <Form.Input label="Damage" name="damage" value={this.state.damage} onChange={this.handleChange} />
              {this.state.modifiers && this.state.modifiers.length ?
                <div className="modifier-list">
                  {this.state.modifiers.map((modifier, index) => (
                    <Modifier {...modifier} removeModifier={this.removeModifier} index={index} />
                  ))}
                </div>
                : null
              }
              <ModifierSelector onClick={this.addModifier} />
              <input type="submit" style={{ display: 'none' }} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button content="Confirm" onClick={this.handleSubmit} />
          </Modal.Actions>
        </Modal>
      )
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchModifiers, editWeaponProfile
}, dispatch)


export default connect(null, mapDispatchToProps)(ProfileModal)
