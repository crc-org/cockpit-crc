import React from 'react';
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
        // prevent double newlines
        const newline = value.endsWith("\n") ? "" : "\r\n";
        const newState = { log: oldstate + value + newline };
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
