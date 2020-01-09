import React, { Component } from 'react'
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
    render() {
        // console.log(this.props)
        const { attendee } = this.props;
        return (
            <List.Item>
                <Image as='a' size='mini' title={attendee.name} circular src={attendee.photoURL} />
            </List.Item>
        )
    }
}

export default EventListAttendee;