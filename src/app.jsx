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
import * as client from './client.js';
import {
    Card,
    Page,
    PageSection
} from '@patternfly/react-core';
import {
    ControlCard,
    Configuration,
    LogWindow
} from '@code-ready/crc-react-components';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            log: ""
        };

        this.startInstance = this.startInstance.bind(this);
        this.stopInstance = this.stopInstance.bind(this);
        this.deleteInstance = this.deleteInstance.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.configurationValueChanged = this.configurationValueChanged.bind(this);
        this.configurationSave = this.configurationSave.bind(this);
        this.configurationReset = this.configurationReset.bind(this);

        this.control = React.createRef();
        this.config = React.createRef();
        this.logWindow = React.createRef();
    }

    componentDidMount() {
        this.configurationLoad();
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

    configurationValueChanged(caller, key, value) {
        // perform validation
        caller.updateValue(key, value);
    }

    configurationSave(data) {
        this.log("Save configuration");
        const values = Object.entries(data).filter(values => values[1] != "");
        client.setConfig({ properties: Object.fromEntries(values) })
                .then(reply => {
                    console.log(reply);
                })
                .catch(ex => {
                    console.log(_("Failed to set configuration"));
                    this.log("E: " + ex.message);
                });
    }

    configurationReset() {
        this.log("Reset configuration");
        this.settingsLoad();
    }

    configurationLoad() {
        this.log("Load configuration");
        client.getConfig()
                .then(reply => {
                    console.log(reply.Configs);
                    this.config.current.updateValues(reply.Configs);
                })
                .catch(ex => {
                    console.log(_("Failed to get configuration"));
                    this.log("E: " + ex.message);
                });
    }

    log(message) {
        this.logWindow.current.log(message);
    }

    updateStatus() {
        client.getStatus()
                .then(reply => {
                    this.control.current.updateStatus(reply);
                })
                .catch(ex => {
                    console.log(_("Failed to get status"));
                    this.log("E: " + ex.message);
                });
    }

    showToast(message) {
        const _ = new Notification('CodeReady Containers', {
            body: message,
            icon: "./ocp-logo.png"
        });
    }

    render() {
        return (
            <Page>
                <PageSection>
                    <ControlCard ref={this.control}
                        onStartClicked={this.startInstance}
                        onStopClicked={this.stopInstance}
                        onDeleteClicked={this.deleteInstance} />
                </PageSection>
                <PageSection>
                    <Card>
                        <LogWindow ref={this.logWindow} />
                    </Card>
                    <Card>
                        <Configuration ref={this.config}
                                onValueChanged={this.configurationValueChanged}
                                onSaveClicked={this.configurationSave}
                                onResetClicked={this.configurationReset} />
                    </Card>
                </PageSection>
            </Page>
        );
    }
}
