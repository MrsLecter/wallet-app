# AGENT.md

## Project Overview

This project is a **mobile-first Wallet App** built with:

- **React**
- **TypeScript**
- **Vite**
- **react-router-dom**

The application has two main screens:

- `TransactionsList`
- `TransactionDetail`

All test data is stored locally in JSON files under `/data`.

The goal is to produce a clean, maintainable implementation with clear separation of concerns, predictable data flow, and a small but scalable architecture.

---

## Core Product Requirements

### Tech Constraints

- Use **React web**, not React Native.
- Use **TypeScript** everywhere.
- Use **react-router-dom** with the latest declarative API.
- Use **FontAwesome** for icons.
- Use local **JSON** files as the source of truth for wallet and transaction data.
- The UI only needs a **mobile layout**.

### Routes

- `/` → `TransactionsList`
- `/transaction/:transactionId` → `TransactionDetail`

### Wallet Data

Wallet data is loaded from `/data/wallet.json`.

Example:

```json
{
  "limit": 1500,
  "balance": 17.3
}
```

### Transaction Data

Transactions are loaded from a JSON file in `/data`.

Example:

```json
{
  "id": "txn_001",
  "type": "credit",
  "amount": 14.06,
  "transactionName": "Apple",
  "transactionDescription": "Card Number Used",
  "date": "2026-04-08T10:24:00.000Z",
  "pending": true,
  "authorizedUser": "Diana",
  "icon": "apple"
}
```

```json
{
  "id": "txn_002",
  "type": "payment",
  "amount": 174.0,
  "transactionName": "Payment",
  "transactionDescription": "From JPMorgan Chase Bank National Association",
  "date": "2026-04-07T08:15:00.000Z",
  "pending": false,
  "icon": "bank"
}
```

### Business Rules Already Confirmed

- `available = limit - balance`
- Payment amounts are displayed with a leading `+`.
- Credit amounts are displayed without a minus sign.
- Wallet balance comes from `/data/wallet.json`.
- Data already exists in the project under `/data`.

## Engineering Principles

### Architecture

Keep the project modular and easy to scale.

Preferred structure:

```text
src/
  app/
    router/
      index.tsx
      routes.tsx

  layouts/
    AppLayout.tsx

  pages/
    transactions-list/
      TransactionsListPage.tsx
    transaction-detail/
      TransactionDetailPage.tsx

  components/
    wallet/
    transaction/
    common/

  lib/
    format/
    points/
    transactions/

  types/

  data/

  styles/
```

### Separation of Concerns

- Pages compose screens.
- Components render reusable UI.
- `lib` contains pure helpers and business logic.
- `types` contain shared interfaces and type aliases.
- `data` contains mock JSON data.
- `layouts` contain shared screen shells.

### Rules

- Keep business logic out of presentational components.
- Avoid hardcoding display transformations inside JSX when a helper can express the rule better.
- Prefer small, focused components.
- Prefer explicit typing over implicit assumptions.
- Prefer derived display values through utility functions.
- Avoid premature abstraction, but do not duplicate logic unnecessarily.

## UI and Layout Standards

### Mobile-First

The app should be implemented for mobile viewport first.

Recommended layout approach:

- Centered app shell.
- `max-width` around `390px`.
- Full-height page background.
- Safe inner padding.
- Clean spacing between sections.
- No desktop-specific layout complexity unless explicitly needed.

### Visual Implementation

- Aim for a close match to the provided test screenshots.
- Keep the UI simple, clean, and consistent.
- Prioritize spacing, hierarchy, and readable typography.
- Avoid overengineering styles at the start.

### Styling Approach

Use a simple, maintainable styling strategy consistent with the current project setup:

- CSS modules, or
- Scoped CSS files near components, or
- A single clear global stylesheet if the project is still small.

Do not introduce a large styling framework unless the project already uses one.

## Routing Guidelines

Use `react-router-dom` declarative routing.

Expected structure:

- Shared `AppLayout`
- Index route for `TransactionsListPage`
- `/transaction/:transactionId` for `TransactionDetailPage`

Recommendations:

- `App.tsx` should only mount the router.
- Route definitions should live in `src/app/router/routes.tsx`.
- Router instance should live in `src/app/router/index.tsx`.
- Use `Outlet` in `AppLayout`.

## Data Handling Guidelines

### Source of Truth

Treat JSON files in `/data` as the source of truth.

### Do

- Import JSON cleanly.
- Keep type definitions aligned with data shape.
- Create mapping helpers if the raw JSON shape needs adaptation for UI.

### Do Not

- Mutate imported JSON.
- Scatter data access across many components.
- Mix parsing, formatting, and rendering in one place.

## TypeScript Standards

- Define explicit domain types for wallet and transactions.
- Prefer narrow unions where possible.

Example direction:

```ts
type TransactionType = 'payment' | 'credit';
```

- Keep optional fields truly optional.
- Type route params and derived helpers carefully.
- Avoid `any`.
- Avoid broad type assertions unless unavoidable.

## Business Logic Guidelines

### Amount Formatting

- `payment` → show `+`
- `credit` → no minus sign
- Display as currency

### Available Limit

Derived as:

```text
available = limit - balance
```

### Date Formatting

Implement date display rules in a dedicated utility module, not inline in components.

### Daily Points

Implement the calculation in an isolated pure function under `lib/points`.

Since some details may still evolve, keep the implementation:

- Explicit
- Testable
- Easy to adjust

## Component Strategy

### TransactionsList Screen

Expected main blocks:

- Card Balance Block
- No Payment Due Block
- Daily Points Block
- Latest Transactions Block

Suggested decomposition:

- `BalanceCard`
- `NoPaymentDueCard`
- `DailyPointsCard`
- `TransactionList`
- `TransactionListItem`

### TransactionDetail Screen

Suggested decomposition:

- Page shell
- Back navigation
- Amount section
- Details card

Keep detail rendering driven by transaction data rather than hardcoded labels where possible.

## Development Workflow

When implementing a task:

1. Understand the exact requirement.
2. Identify whether it belongs to:
   - routing
   - layout
   - data
   - business logic
   - presentational UI
3. Make the smallest clean change that fits the architecture.
4. Keep files focused.
5. Avoid mixing unrelated refactors into the same step.

### Preferred Order of Work

1. Routing and app shell
2. Project structure
3. Page layouts
4. Types
5. JSON integration
6. Formatting utilities
7. Business rules
8. Final UI polish

## Code Quality Expectations

### Priorities

- Readability
- Predictable structure
- Low coupling
- Minimal duplication
- Clear naming
- Practical maintainability

### Naming

Use descriptive names:

- `TransactionsListPage`
- `TransactionDetailPage`
- `calculateDailyPoints`
- `formatTransactionAmount`
- `getTransactionDateLabel`

Avoid vague names like:

- `dataHelper`
- `utilThing`
- `tempFn`

### Components

- One responsibility per component.
- Keep page files mostly compositional.
- Move repeated rendering patterns into reusable UI components.

### Functions

Prefer pure functions for:

- Formatting
- Derived labels
- Calculations
- Data adaptation

## Non-Goals

Unless explicitly requested, do not:

- Add global state libraries.
- Add server state libraries.
- Add form libraries.
- Add animation libraries.
- Add design systems.
- Introduce heavy abstractions.
- Implement backend behavior.
- Switch to React Native.

## Expected Behavior for an Agent

When working on this repository, the agent should:

- Preserve the agreed architecture.
- Implement only the requested step unless asked otherwise.
- Avoid broad refactors without a clear need.
- Keep code production-minded even for test tasks.
- Leave the project in a runnable state after each step.
- Prefer incremental, reviewable changes.

When details are still undecided:

- Make a reasonable minimal assumption.
- Isolate the assumption in code so it can be changed later.
- Avoid spreading uncertain logic across multiple files.

## Definition of Done for Each Step

A step is complete when:

- The requested functionality works.
- The app still runs.
- The code follows the project structure.
- No unnecessary complexity was introduced.
- The implementation is ready for the next step.

## Initial Implementation Baseline

At the current stage, the following assumptions are valid:

- Project is already created with Vite.
- Routing must be added using `react-router-dom`.
- App shell should support mobile-first layout.
- Data will come from `/data`.
- List and detail screens are the primary navigation targets.

## Output Style for Future Changes

When making changes:

- Describe what files were added or updated.
- Keep code cohesive.
- Avoid hidden side effects.
- Make verification easy.

If a step introduces a new assumption, document it briefly in code comments or in the task summary.
