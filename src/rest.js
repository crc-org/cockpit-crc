import cockpit from "cockpit";

function manage_error(reject, error, content) {
    let content_o = {};
    if (content) {
        try {
            content_o = JSON.parse(content);
        } catch {
            content_o.message = content;
        }
    }
    const c = { ...error, ...content_o };
    reject(c);
}

function connect(address) {
    /* This doesn't create a channel until a request */
    const http = cockpit.http(address, { superuser: "try" });
    const connection = {};

    connection.monitor = function(options, callback, return_raw) {
        return new Promise((resolve, reject) => {
            http.request(options)
                    .stream(data => {
                        if (return_raw)
                            callback(data);
                        else
                            callback(JSON.parse(data));
                    })
                    .catch((error, content) => {
                        manage_error(reject, error, content);
                    })
                    .then(resolve);
        });
    };

    connection.call = function (options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            http.request(options)
                    .then(resolve)
                    .catch((error, content) => {
                        manage_error(reject, error, content);
                    });
        });
    };

    connection.close = function () {
        http.close();
    };

    return connection;
}

/*
 * Connects to the crc-http service, performs a single call, and closes the
 * connection.
 */
async function call (address, parameters) {
    const connection = connect(address);
    const result = await connection.call(parameters);
    connection.close();
    return result;
}

export default {
    connect,
    call
};
