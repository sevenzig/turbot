# Testing Guide

This document provides a guide for writing and running tests in this project. We use
[Vitest](https://vitest.dev/) as our testing framework, along with
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing
React components.

## Table of Contents

- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
  - [File Naming Convention](#file-naming-convention)
  - [Component Tests](#component-tests)
  - [Hook Tests](#hook-tests)
  - [Utility Tests](#utility-tests)
- [Mocking API Requests](#mocking-api-requests)
- [Coverage Reporting](#coverage-reporting)

## Running Tests

We have several scripts available for running tests:

- **Run all tests once:**

  ```bash
  npm test
  ```

- **Run tests in watch mode:**

  ```bash
  npm run test:watch
  ```

- **Run tests and generate a coverage report:**
  ```bash
  npm run test:coverage
  ```
  After running, a detailed coverage report will be available in the `coverage/` directory.

## Writing Tests

### File Naming Convention

Test files should be co-located with the source files they are testing and follow the `.test.ts` or
`.test.tsx` naming convention.

- For a component `src/components/MyComponent/MyComponent.tsx`, the test file should be
  `src/components/MyComponent/MyComponent.test.tsx`.
- For a hook `src/hooks/useMyHook.ts`, the test file should be `src/hooks/useMyHook.test.ts`.

### Component Tests

We use React Testing Library to test components. The goal is to test components in a way that
resembles how a user would interact with them.

Here is an example of a basic component test:

```tsx
import { render, screen } from "@/test/test-utils";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders a heading", () => {
    render(<MyComponent title='Test Title' />);
    expect(screen.getByRole("heading", { name: /test title/i })).toBeInTheDocument();
  });
});
```

### Hook Tests

For testing custom hooks, we use the `renderHook` function from React Testing Library.

```ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("should increment the counter", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

### Utility Tests

Utility functions can be tested as plain JavaScript/TypeScript functions.

```ts
import { myUtilityFunction } from "./myUtility";

describe("myUtilityFunction", () => {
  it("should do something correctly", () => {
    expect(myUtilityFunction(2, 2)).toBe(4);
  });
});
```

## Mocking API Requests

We use [Mock Service Worker (MSW)](https://mswjs.io/) to mock API requests in our tests. This allows
us to test components that fetch data without making actual network requests.

Handler definitions can be found in `src/mocks/handlers.ts`. The server setup is in
`src/mocks/server.ts`.

You can override mock responses within a specific test using `server.use()`:

```tsx
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";

it("handles server error", async () => {
  server.use(
    http.get("/api/data", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
  // ... rest of the test
});
```

## Coverage Reporting

To generate a coverage report, run:

```bash
npm run test:coverage
```

This will create an `html` report in the `coverage/` directory. Open the `index.html` file in that
directory to view the detailed report. We have set a coverage threshold in the `vite.config.ts`
file. All new code should aim to meet these thresholds.
