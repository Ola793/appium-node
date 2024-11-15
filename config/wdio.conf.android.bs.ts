import { config as sharedConfig } from "./wdio.conf.js";
import dotenv from "dotenv";
dotenv.config();

export const config = {
    ...sharedConfig,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',

    capabilities: [{
        acceptInsecureCerts: true,
        geoLocation: "PL",
        timezone: "Warsaw",
        'appium:app': process.env.BROWSERSTACK_ANDROID_APP_ID,
        'appium:automationName': 'UiAutomator2',
        'bstack:options': {
            deviceName: 'Samsung Galaxy S22 Ultra',
            osVersion: '12.0',
            deviceOrientation: 'portrait',
            autoGrantPermissions: true,
            // appiumVersion: "2.0.0", // Ensure compatibility
        },
    }],

    services: [
        [
            'browserstack',
            {
                app: process.env.BROWSERSTACK_ANDROID_APP_ID,
                buildIdentifier: "${BUILD_NUMBER}",
                browserstackLocal: true,
                opts: { localIdentifier: "my-pipeline-local" },
                testObservability: true,
                testObservabilityOptions: { 
                    projectName: "BrowserStack Android app testing",
                    buildName: 'browserstack Android build',
                },
                debug: true,
                networkLogs: true,
                consoleLogs: "warn",
            },
        ]
    ],
};
