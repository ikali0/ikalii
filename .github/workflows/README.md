# CI/CD Workflows

## Continuous Integration & Audit Workflow

This workflow runs on pull requests and pushes to main/master branches.

### Optimization Features

#### 🚀 Performance Improvements

1. **Dependency Caching**
   - Bun dependencies cached at `~/.bun/install/cache`
   - npm packages cached via Node.js setup action
   - Playwright browsers cached at `~/.cache/ms-playwright`
   - Cache keys based on lockfile hashes for automatic invalidation

2. **Concurrency Control**
   - Automatic cancellation of outdated workflow runs
   - Prevents resource waste when pushing multiple commits to a PR
   - Group: `workflow-name + PR number (or branch ref)`

3. **Optimized Browser Testing**
   - E2E tests run on 2 browsers: `chromium` and `Mobile Chrome`
   - Covers desktop and mobile viewports
   - To test additional browsers locally: `npx playwright test --project=firefox`
   - Full browser list: chromium, firefox, webkit, Mobile Chrome, Mobile Safari

4. **Parallel Execution**
   - Browser tests run in parallel using matrix strategy
   - `fail-fast: false` ensures all browsers are tested even if one fails

#### 🔍 Debugging Features

1. **Test Artifacts**
   - **Playwright Reports**: HTML reports uploaded for all test runs (7-day retention)
   - **Test Traces**: Detailed traces with screenshots uploaded on failures (7-day retention)
   - Access via "Artifacts" section in GitHub Actions run page

2. **Job Summaries**
   - Visual summaries in GitHub Actions UI
   - Shows test status per browser
   - Easy identification of failures

3. **Clear Error Handling**
   - `continue-on-error: false` explicitly set for all critical steps
   - Makes workflow status clear and actionable

### Jobs

#### 1. `build_test_lint`
Runs linting, type checking, and unit tests.

**Steps:**
- Checkout code
- Setup Node.js 18 with npm caching
- Setup Bun with dependency caching
- Install dependencies
- Run ESLint
- Run TypeScript type check
- Run Vitest unit tests
- Generate job summary

**Duration:** ~2-3 minutes (with cache hit)

#### 2. `e2e_testing`
Runs Playwright E2E tests on multiple browsers in parallel.

**Matrix:**
- chromium (Desktop Chrome)
- Mobile Chrome (Pixel 5)

**Steps:**
- Checkout code
- Setup Node.js 18 with npm caching
- Setup Bun with dependency caching
- Install dependencies
- Cache/Install Playwright browsers
- Run E2E tests for specific browser
- Upload test reports and traces
- Generate job summary

**Duration:** ~3-5 minutes per browser (with cache hit)

### Local Testing

```bash
# Run all checks locally
bun run lint
npx tsc --noEmit
bun test

# Run E2E tests
npx playwright test

# Run E2E tests on specific browser
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"

# Run E2E tests with UI
npx playwright test --ui

# View test report
npx playwright show-report
```

### Troubleshooting

#### Cache Issues
If you suspect cache corruption:
1. Go to repository Settings → Actions → Caches
2. Delete relevant caches
3. Rerun the workflow

#### Slow Runs
Check if caches are being hit:
- Look for "Cache restored from key" in logs
- If cache miss, first run will be slower

#### Test Failures
1. Download artifacts from failed run
2. Extract and open `playwright-report/index.html`
3. View traces for failed tests with screenshots and network logs

#### Adding More Browsers
Edit `.github/workflows/ci.yml` matrix:
```yaml
matrix:
  project: ['chromium', 'Mobile Chrome', 'firefox', 'webkit']
```

### Maintenance

- **Cache Invalidation**: Automatic via lockfile hash
- **Artifact Retention**: 7 days (configurable via `retention-days`)
- **Browser Updates**: Automatic with Playwright updates
- **Node Version**: Update in both jobs if needed

### Best Practices

1. **Local Testing**: Run tests locally before pushing
2. **Commit Frequency**: Use concurrency control effectively by pushing related changes together
3. **Browser Coverage**: Use full browser matrix for pre-release testing
4. **Artifact Review**: Always check artifacts for intermittent failures
5. **Cache Management**: Clear caches if seeing unexplained failures
