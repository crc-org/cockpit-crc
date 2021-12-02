/*
 * This file is part of Cockpit.
 *
 * Copyright (C) 2017 Red Hat, Inc.
 *
 * Cockpit is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import cockpit from 'cockpit';
import React from 'react';
import { Alert, Card, CardTitle, CardBody } from '@patternfly/react-core';
import * as client from './client.js';
import Actions from './CRC/Actions.jsx';
import Settings from './CRC/Settings.jsx';
import LogWindow from './CRC/LogWindow.jsx';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CrcStatus: _("Unknown"),
            log: ""
        };

        this.startInstance = this.startInstance.bind(this);
        this.stopInstance = this.stopInstance.bind(this);
        this.deleteInstance = this.deleteInstance.bind(this);
        this.settingsValueChanged = this.settingsValueChanged.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.settingsSave = this.settingsSave.bind(this);
        this.settingsReset = this.settingsReset.bind(this);

        this.actions = React.createRef();
        this.settings = React.createRef();
        this.logWindow = React.createRef();
    }

    componentDidMount() {
        this.settingsLoad();
        setInterval(this.updateStatus, 1000);
    }

    startInstance() {
        this.log("→ Start clicked");
        client.startInstance()
                .then((result) => {
                    this.showToast(result);
                })
                .catch((error) => {
                    const msg = error.message;
                    this.showToast(msg);
                    this.log("E: " + msg);
                });
    }

    stopInstance() {
        this.log("→ Stop clicked");
        client.stopInstance()
                .then((result) => {
                    this.showToast(result);
                })
                .catch((error) => {
                    const msg = error.message;
                    this.showToast(msg);
                    this.log("E: " + msg);
                });
    }

    deleteInstance() {
        this.log("→ Delete clicked");
        client.deleteInstance()
                .then((result) => {
                    this.showToast(result);
                })
                .catch((error) => {
                    const msg = error.message;
                    this.showToast(msg);
                    this.log("E: " + msg);
                });
    }

    settingsValueChanged(caller, key, value) {
        // perform validation
        caller.updateValue(key, value);
    }

    settingsSave(data) {
        this.log("Save settings");
        const values = Object.entries(data).filter(values => values[1] != "");
        client.setConfig({ properties: Object.fromEntries(values) })
                .then(reply => {
                    console.log(reply);
                })
                .catch(ex => {
                    console.log(_("Failed to set config"));
                    this.log("E: " + ex.message);
                });
    }

    settingsReset() {
        this.log("Reset settings");
        this.settingsLoad();
    }

    settingsLoad() {
        this.log("Load settings");
        client.getConfig()
                .then(reply => {
                    console.log(reply.Configs);
                    this.settings.current.updateValues(reply.Configs);
                })
                .catch(ex => {
                    console.log(_("Failed to get config"));
                    this.log("E: " + ex.message);
                });
    }

    log(message) {
        this.logWindow.current.log(message);
    }

    updateStatus() {
        client.getStatus()
                .then(reply => {
                    console.log(reply.CrcStatus);
                    this.setState({ CrcStatus: reply.CrcStatus });
                })
                .catch(ex => {
                    console.log(_("Failed to get status"));
                    this.log("E: " + ex.message);
                });
    }

    showToast(message) {
        const toast = new Notification('CodeReady Containers', {
            body: message,
            icon: "./ocp-logo.png"
        });
    }

    render() {
        return (
            <div>
                <Card>
                    <CardTitle>CodeReady Containers</CardTitle>
                    <CardBody>
                        <Alert
                            variant="info"
                            title={cockpit.format(_("Status: $0"), this.state.CrcStatus)}
                        />
                    </CardBody>
                </Card>

                <div style={{ marginLeft : "22px" }}>
                    <LogWindow ref={this.logWindow} />

                    <Actions ref={this.actions}
                            onStartClicked={this.startInstance}
                            onStopClicked={this.stopInstance}
                            onDeleteClicked={this.deleteInstance} />

                    <Settings ref={this.settings}
                            onValueChanged={this.settingsValueChanged}
                            onSaveClicked={this.settingsSave}
                            onResetClicked={this.settingsReset} />
                </div>

            </div>
        );
    }
}
