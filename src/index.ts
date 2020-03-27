/**
 * Imports
 */
import * as core from '@actions/core'
import App from './app'

/**
 * Main function
 */
async function run(): Promise<void> {
  let app = new App()
  await app.run()
            .catch(error => {
              core.setFailed(error.message)
            })
}

/**
 * Main entry point
 */
run()
