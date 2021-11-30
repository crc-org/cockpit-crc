import React, { useState } from 'react';
import {
    Button,
} from '@patternfly/react-core';

class LogWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: ""
        };

        this.log = this.log.bind(this);
    }

    log(value) {
        const oldstate = this.state.log;
        const newState = { log: oldstate + value + "\r\n" };
        this.setState(newState);
    }

    render() {
        const style = {
            backgroundColor: "black",
            color: "white"
        };

        return (
            <div>
                <textarea style={style} rows="20" cols="80" name="crc-log" readOnly value={this.state.log} />
            </div>
        );
    }
}

export default LogWindow;
