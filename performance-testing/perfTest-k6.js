/*
* For K6 it was needed to install it locally (on windows at least, is also possible to run it on a docker container)
* Install alloy locally as well, it runs as a service, instructions for installing and configuring are in the Grafana Cloud Guide
* */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    iterations: 10,
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
    // Make a GET request to the target URL
    http.get('https://quickpizza.grafana.com');

    // Sleep for 1 second to simulate real-world usage
    sleep(1);
}

//This is for generating a html report but does require an external github link or some repository that actually handle this
export function handleSummary(data) {
    return {
        'reporte.html': htmlReport(data), // genera HTML
        'reporte.json': JSON.stringify(data, null, 2), // también guarda JSON
    };
}