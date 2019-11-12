import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { editWeaponProfile } from "actions/units.action";
import ModifierList from "components/ModifierList";
import { fetchModifiers } from "api";
import { bindActionCreators } from "redux";
import "./index.scss"

class ProfileModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      num_models: 1,
      attacks: 1,
      to_hit: 4,
      to_wound: 4,
      rend: 0,
      damage: 0,
      modifiers: [],
    }
  }

  openModal = () => {
    const { profile, fetchModifiers } = this.props;
    this.setState({
      open: true,
      ...profile
    }, () => {
      fetchModifiers()
    })
  }

  handleChange = (_, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { id, editWeaponProfile, unit_id } = this.props;
    const { open, ...profile } = this.state;
    editWeaponProfile(id, profile, unit_id)
    this.setState({ open: false })
  }

  setModifiers = (newModifiers) => {
    this.setState({
      ...this.state,
      modifiers: newModifiers
    })
  }

  render() {
    const { header, profile } = this.props;
    if (profile) {
      return (
        <span>
          <Button size="tiny" icon="edit" className="edit" onClick={this.openModal} />
          <Modal
            open={this.state.open}
            className="profile-modal"
            onClose={() => this.setState({ open: false })}
          >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input type="number" label="Number of models" name="num_models" value={this.state.num_models} onChange={this.handleChange} />
                <Form.Input type="number" label="Attacks" name="attacks" value={this.state.attacks} onChange={this.handleChange} />
                <Form.Input type="number" label="To Hit" name="to_hit" value={this.state.to_hit} onChange={this.handleChange} />
                <Form.Input type="number" label="To Wound" name="to_wound" value={this.state.to_wound} onChange={this.handleChange} />
                <Form.Input type="number" label="Rend" name="rend" value={this.state.rend} onChange={this.handleChange} />
                <Form.Input label="Damage" name="damage" value={this.state.damage} onChange={this.handleChange} />
                <ModifierList modifiers={this.state.modifiers} setModifiers={this.setModifiers} />
                <input type="submit" style={{ display: 'none' }} />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button content="Cancel" negative onClick={() => this.setState({ open: false })} />
              <Button content="Confirm" positive onClick={this.handleSubmit} />
            </Modal.Actions>
          </Modal>
        </span>
      )
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchModifiers, editWeaponProfile
}, dispatch)


export default connect(null, mapDispatchToProps)(ProfileModal)
