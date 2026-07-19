// test-runner.js
import { existsSync, mkdirSync, rmSync } from 'fs';

const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    gray: "\x1b[90m"
};

export default class TestRunner {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            total: 0,
            skipped: 0,
            details: []
        };
        this.pendingPromises = [];
    }

    describe(name, fn) {
        console.log(`\n${colors.blue}[${name}]${colors.reset}`);
        fn(this);
    }

    it(name, fn) {
        this.results.total++;
        const start = new Date();
        try {
            const result = fn();
            
            // Handle Async Tests
            if (result && typeof result.then === 'function') {
                const promise = result
                    .then(() => {
                        const end = new Date();
                        console.log(`  ${colors.green}✓${colors.reset} ${name}`);
                        this.results.passed++;
                        this.results.details.push({ name, status: 'pass', duration: end - start });
                    })
                    .catch((err) => {
                        const end = new Date();
                        console.log(`  ${colors.red}✗${colors.reset} ${name}`);
                        console.log(`      Error: ${err.message}`);
                        this.results.failed++;
                        this.results.details.push({ name, status: 'fail', error: err.message, duration: end - start });
                    });
                
                this.pendingPromises.push(promise);
                return;
            }

            // Handle Synchronous Tests
            const end = new Date();
            console.log(`  ${colors.green}✓${colors.reset} ${name}`);
            this.results.passed++;
            this.results.details.push({ name, status: 'pass', duration: end - start });

        } catch (err) {
            // Handle Sync Errors
            const end = new Date();
            console.log(`  ${colors.red}✗${colors.reset} ${name}`);
            console.log(`      Error: ${err.message}`);
            this.results.failed++;
            this.results.details.push({ name, status: 'fail', error: err.message, duration: end - start });
        }
    }

    async end() {
        // Wait for all pending async tests to resolve
        if (this.pendingPromises.length > 0) {
            await Promise.all(this.pendingPromises);
        }

        console.log(`\n${colors.blue}================================${colors.reset}`);
        console.log(`${colors.blue}Test Summary${colors.reset}`);
        console.log(`Total:    ${this.results.total}`);
        console.log(`Passed:   ${colors.green}${this.results.passed}${colors.reset}`);
        console.log(`Failed:   ${colors.red}${this.results.failed}${colors.reset}`);
        
        if (this.results.failed > 0) {
            process.exit(1);
        } else {
            console.log(`${colors.green}All tests passed!${colors.reset}`);
            process.exit(0);
        }
    }
    
    skip(name, fn) {
        this.results.skipped++;
        console.log(`  ${colors.yellow}⊘${colors.reset} ${name} (Skipped)`);
    }
}
