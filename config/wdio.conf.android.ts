import { config as sharedConfig } from "./wdio.conf.js";
import { join } from "path";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

export const config = {
    ...sharedConfig,
    port: 4723,
    services: ["appium"],
    appium: {
      // For options see
      // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
      args: ["--allow-insecure"],
    },
    capabilities: [{
      // capabilities for local Appium web tests on an Android Emulator or Real device
      platformName: 'Android',
      'appium:deviceName': 'Mi 10T Lite',
      // 'appium:app': join(process.cwd(), './apps/android/app-staging-debug.apk'),
      'appium:appPackage': 'org.chromium.webapk.a0d016e2a13e387b5_v2',
      'appium:appActivity': 'org.chromium.webapk.shell_apk.h2o.H2OOpaqueMainActivity',
      'appium:platformVersion': '12 SKQ1.211006.001',
      'appium:automationName': 'UiAutomator2'
  }],

}
