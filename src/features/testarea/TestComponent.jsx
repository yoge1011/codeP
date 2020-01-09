import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "./testAction";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import { openModal } from "../modals/modalActions";

class TestComponent extends Component {
  render() {
    const {
      data,
      loading,
      openModal,
      incrementAsync,
      decrementAsync,
      elementName
    } = this.props;
    return (
      <div>
        <h1>The answer is : {data}</h1>
        <Button
          name="increment"
          loading={ elementName === "increment" && loading }
          onClick={ (e) => incrementAsync(e.target.name) }
          positive
          content="increment"
        />
        <Button
          name="decrement"
          loading={ elementName === "decrement" && loading}
          onClick={(e)=>decrementAsync(e.target.name)}
          positive
          content="decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />
        <TestPlaceInput />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.test.data,
  loading: state.async.loading,
  elementName: state.async.elementName
});

const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
  openModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
