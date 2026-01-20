// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false, // Set to true to run without opening the browser
    screenshot: 'on',
    trace: 'on-first-retry',
  },
});