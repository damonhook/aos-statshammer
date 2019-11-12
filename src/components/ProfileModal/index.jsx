import React from "react";
import { Modal, Form, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { editWeaponProfile } from "actions/unit.action";
import Modifier from "components/Modifier";

class ProfileModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num_models: 1,
      attacks: 1,
      to_hit: 4,
      to_wound: 4,
      rend: 0,
      damage: 0
    }
  }

  handleOpen = () => {
    const { profile } = this.props;
    this.setState({
      ...profile
    })
  }

  handleChange = (_, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { id, editWeaponProfile } = this.props;
    editWeaponProfile(id, this.state)
  }

  getModifierOptions = () => {
    const { modifiers } = this.props;
    return modifiers.modifiers.map((modifier) => ({
      key: modifier.id,
      value: modifier.id,
      text: modifier.name
    }))
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
              {profile.modifiers && profile.modifiers.length ?
                <div className="modifier-list">
                  {profile.modifiers.map((modifier) => (
                    <Modifier {...modifier} />
                  ))}
                </div>
                : null
              }
              <Dropdown
                clearable
                fluid
                search
                select
                options={this.getModifierOptions()}
              />
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

const mapStateToProps = state => ({
  modifiers: state.modifiers
})

export default connect(mapStateToProps, { editWeaponProfile })(ProfileModal)
