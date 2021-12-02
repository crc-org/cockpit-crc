import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from '@patternfly/react-core';

class Actions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.onStartClicked}
                    variant="primary">Start</Button>{' '}
                <Button onClick={this.props.onStopClicked}
                    variant="secondary">Stop</Button>{' '}
                <Button onClick={this.props.onDeleteClicked}
                    variant="danger">Delete</Button>
            </div>
        );
    }
}

Button.propTypes = {
    onStartClicked: PropTypes.func,
    onStopClicked: PropTypes.func,
    onDeleteClicked: PropTypes.func
};

export default Actions;
