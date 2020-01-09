import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { updateEvent, createEvent } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];

const validate = combineValidators({
  title: isRequired({message: 'The event title is is required.'}),
  category: isRequired({message: 'The category is required'}),
  description: composeValidators(
    isRequired({message: 'Description is required.'}),
    hasLengthGreaterThan(4)({message: 'Descrption needs to be atleast 5 characters'})
  )(),
  city: isRequired({message: 'city is required'}),
  venue: isRequired({message: 'Venue is required.'}),
  date: isRequired('date')
})

class EventForm extends Component {
  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  render() {
    const { history, initialValues, invalid, submitting,  pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name="title"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                component={SelectInput}
                options={category}
                placeholder="What is your event about?"
              />
              <Field
                name="description"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event Location Detail" />
              <Field
                name="city"
                component={PlaceInput}
                placeholder="Event City"
              />
              <Field
                name="venue"
                component={PlaceInput}
                placeholder="Event venue"
              />
              <Field
                name="date"
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='HH:mm'
                placeholder="Event date"
              />
              <Button disabled={ invalid || submitting || pristine } positive type="submit">
                Submit
              </Button>
              <Button
                type="button"
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push(`/events`)
                }
              >
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  };
};

const mapDispatchToProps = {
  updateEvent,
  createEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
