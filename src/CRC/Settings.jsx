import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Form, FormGroup, FormFieldGroup, FormFieldGroupHeader,
    FormSelect, FormSelectOption,
    Grid,
    Modal, Select, SelectVariant,
    SelectOption, SelectGroup,
    TextInput, Tabs, Tab, TabTitleText,
    ToggleGroup, ToggleGroupItem,
    Checkbox
} from '@patternfly/react-core';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu: 2,
            memory : 9,
            disksize : 30,
            pullsecret: "",
            consentTelemetry: false,
        };

        this.handlePullsecretClick = this.handlePullsecretClick.bind(this);
        this.pullsecretInput = React.createRef();
    }

    updateValue(key, value) {
        const newState = { [key]: value };
        this.setState(newState);
    }

    handlePullsecretClick() {
        const value = this.pullsecretInput.current.value;
        this.props.onValueChanged(this, 'pullsecretContent', value);
    }

    render() {
        return (
            <div>
                <Form>
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
                            value={this.state.disksize}
                            onChange={value => this.props.onValueChanged(this, 'disk-size', value)} />
                    </FormGroup>
                    <FormGroup fieldId='settings-pullsecret' label="Pullsecret">
                        <TextInput id='settings-pullsecret'
                            className="pullsecret"
                            value={this.state.pullsecret}
                            ref={this.pullsecretInput}
                            onChange={value => this.props.onValueChanged(this, 'pull-secret', value)} />
                        <Button onClick={this.handlePullsecretClick} variant="primary">Change</Button>
                    </FormGroup>
                    <FormGroup fieldId='settings-pullsecret' label="Pullsecret">
                        <Checkbox id='settings-consentTelemetry'
                            className="consentTelemetry"
                            value={this.state.consentTelemetry}
                            onChange={value => this.props.onValueChanged(this, 'consent-telemetry', value)}
                            label="Report telemetry to Red Hat" />
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

Button.propTypes = {
    onValueChanged: PropTypes.func
};

export default Settings;
