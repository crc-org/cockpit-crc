import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup,
    TextInput,
    ActionGroup, Checkbox
} from '@patternfly/react-core';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu: 2,
            memory : 9,
            "disk-size" : 30,
            pullsecret: "",
            "consent-telemetry": false,
        };

        this.pullsecretChangeClicked = this.pullsecretChangeClicked.bind(this);
        this.pullsecretInput = React.createRef();
    }

    updateValue(key, value) {
        const newState = { [key]: value };
        this.setState(newState);
    }

    pullsecretChangeClicked() {
        const value = this.pullsecretInput.current.value;
        this.props.onValueChanged(this, 'pullsecretContent', value);
    }

    render() {
        return (
            <div>
                <Form isHorizontal isWidthLimited>
                    <FormGroup fieldId='settings-cpu' label="CPU">
                        <TextInput id='settings-cpu'
                            className="cpu"
                            value={this.state.cpu}
                            onChange={value => this.props.onValueChanged(this, 'cpu', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-memory' label="Memory">
                        <TextInput id='settings-memory'
                            className="memory"
                            value={this.state.memory}
                            onChange={value => this.props.onValueChanged(this, 'memory', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-disksize' label="Disk size">
                        <TextInput id='settings-disksize'
                            className="disksize"
                            value={this.state["disk-size"]}
                            onChange={value => this.props.onValueChanged(this, 'disk-size', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-pullsecret' label="Pullsecret">
                        <TextInput id='settings-pullsecret'
                            className="pullsecret"
                            value={this.state.pullsecret}
                            ref={this.pullsecretInput}
                            onChange={value => this.props.onValueChanged(this, 'pull-secret', value)} />
                        <Button onClick={this.pullsecretChangeClicked} variant="primary">Change</Button>
                    </FormGroup>
                    <FormGroup fieldId='settings-pullsecret' label="Telemetry">
                        <Checkbox id='settings-consentTelemetry'
                            className="consentTelemetry"
                            value={this.state["consent-telemetry"]}
                            onChange={value => this.props.onValueChanged(this, 'consent-telemetry', value)}
                            label="Report telemetry to Red Hat"
                            description="Consent to allow basic information about the system and cluster to be collected for development and debugging purposes" />
                    </FormGroup>
                    <ActionGroup>
                        <Button variant="primary" onClick={this.props.onSaveClicked}>Save</Button>
                        <Button variant="link" onClick={this.props.onResetClicked}>Reset</Button>
                    </ActionGroup>
                </Form>
            </div>
        );
    }
}

Button.propTypes = {
    onValueChanged: PropTypes.func,
    onSaveClicked: PropTypes.func,
    onResetClicked: PropTypes.func
};

export default Settings;
