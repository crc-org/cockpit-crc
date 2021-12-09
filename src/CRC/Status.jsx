import React from 'react';

import {
    Card, CardTitle, CardBody, CardFooter,
    Progress, ProgressVariant, ProgressMeasureLocation
} from '@patternfly/react-core';

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CrcStatus: "Unknown"
        };

        this.updateState = this.updateState.bind(this);
    }

    updateStatus(values) {
        const self = this; // make sure 'self' references to this
        Object.entries(values).forEach(function(value) {
            self.updateState(value[0], value[1]);
        });
    }

    formatSize(bytes) {
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (!bytes && '0 Bytes') ||
            (bytes / Math.pow(1024, i)).toFixed(2) + " " + ['Bytes', 'KB', 'MB', 'GB', 'TB'][i];
    }

    updateState(key, value) {
        const newState = { ["" + key]: value };
        this.setState(newState);
    }

    render() {
        const fraction = this.state.DiskUse / this.state.DiskSize;

        return (
            <Card className="crc-status">
                <CardTitle>CodeReady Containers</CardTitle>
                <CardBody>
                    <table className="pf-c-table pf-m-grid-md pf-m-compact">
                        <tbody>
                            <tr>
                                <th id="crc-status-crc" scope="row">Status</th>
                                <td>
                                    {this.state.CrcStatus}
                                </td>
                            </tr>
                            <tr>
                                <th id="crc-status-openshift" scope="row" style={{ paddingRight : "20px" }}>OpenShift</th>
                                <td>
                                    {this.state.OpenshiftStatus}
                                </td>
                            </tr>
                            <tr>
                                <th id="crc-status-openshift" scope="row">Version</th>
                                <td>
                                    {this.state.OpenshiftVersion}
                                </td>
                            </tr>
                            <tr>
                                <th id="crc-status-disksize-progress" scope="row">Disk</th>
                                <td width="200px">
                                    <Progress value={this.state.DiskUse}
                                        className="pf-m-sm"
                                        min={0} max={Number(this.state.DiskSize)}
                                        variant={fraction > 0.9 ? ProgressVariant.danger : ProgressVariant.info}
                                        aria-labelledby="crc-status-disksize-progress"
                                        label={this.formatSize(this.state.DiskUse) / this.formatSize(this.state.DiskSize)}
                                        measureLocation={ProgressMeasureLocation.outside} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter>
                    {
                        /* <a href="#" onClick={ev => { ev.preventDefault() }}>View details and logs</a> */
                    }
                </CardFooter>
            </Card>
        );
    }
}

export default Status;
