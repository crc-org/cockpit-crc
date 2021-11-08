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
import { Alert, Button, Card, CardTitle, CardBody } from '@patternfly/react-core';
import * as client from './client.js';

const _ = cockpit.gettext;

export class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CrcStatus: _("Unknown")
        };

        this.updateStatus = this.updateStatus.bind(this);
        this.startInstance = this.startInstance.bind(this);
        this.stopInstance = this.stopInstance.bind(this);
        this.deleteInstance = this.deleteInstance.bind(this);

        this.updateStatus();
    }

    startInstance() {
        client.startInstance();
    }

    stopInstance() {
        client.stopInstance();
    }

    deleteInstance() {
        client.deleteInstance();
    }

    updateStatus() {
        client.getStatus()
                .then(reply => {
                    console.log(reply.CrcStatus);
                    this.setState({ CrcStatus: reply.CrcStatus });
                })
                .catch(ex => {
                    console.log(_("Failed to get status"));
                });
    }

    render() {
        return (
            <fragment>
                <Card>
                    <CardTitle>CodeReady Containers</CardTitle>
                    <CardBody>
                        <Alert
                            variant="info"
                            title={cockpit.format(_("Status: $0"), this.state.CrcStatus)}
                        />
                    </CardBody>
                </Card>

                <Button onClick={this.startIntance}
                    variant="primary">Start</Button>{' '}
                <Button onClick={this.stopInstance}
                    variant="secondary">Stop</Button>{' '}
                <Button onClick={this.deleteInstance}
                    variant="danger">Delete</Button>

            </fragment>
        );
    }
}
