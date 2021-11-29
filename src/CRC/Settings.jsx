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
} from '@patternfly/react-core';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu: 2,
            memory : 9,
            disksize : 30,
            consentTelemetry: false,
        };
    }

    updateValue(key, value) {
        const newState = { [key]: value };
        this.setState(newState);
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
                            onChange={value => this.props.onValueChanged(this, 'disksize', value)} />
                    </FormGroup>
                </Form>

                <li>Pull secret <button id="pullsecret">Change</button></li>
                <li><input id="consentTelemetry" type="checkbox" /> Report telemetry to Red Hat</li>
            </div>
        );
    }
}

Button.propTypes = {
    onValueChanged: PropTypes.func
};

export default Settings;
