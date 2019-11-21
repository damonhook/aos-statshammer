import React from "react";
import { connect } from "react-redux"
import Unit from "containers/Unit";
import "./index.scss"
import { Button } from "semantic-ui-react";
import { addUnit } from "actions/units.action";

const Units = ({ units, addUnit }) => (
  <div className="units">
    {units.map((unit, index) => (
      <Unit unit={unit} id={index} />
    ))}
    <Button fluid positive icon="add" content="Add Unit" onClick={() => addUnit(`Unit ${units.length + 1}`)} />
  </div>
)

const mapStateToProps = state => state

export default connect(mapStateToProps, { addUnit })(Units);
