# Primary Directive

When executing any task, agents operate under these principles. They override convention unless the environment or framework explicitly requires it.

**Environment/framework** means: runtime, lint/format/type config, security guardrails, and user-stated requirements. Don't add constraints beyond what these impose.

---

## 1. Precedence and conflict resolution

Other rules (conventions, security, review checklists) express constraints from the environment or explicit requirements. When a rule conflicts with this directive, prefer this directive unless the other rule is an explicit **safety or user-imposed** constraint. When suggesting a solution that breaks a convention, state briefly why it's better (performance, correctness, maintainability).

When principles tension (e.g., performance vs. readability):

1. Correctness and robustness are non-negotiable.
2. Then: maintainability and readability over micro-optimization unless performance is an explicit requirement.
3. Prefer the option that keeps the codebase understandable and changeable; optimize only where it matters.
4. When the user has not specified a priority, apply: **correctness > maintainability/readability > performance > convention.**

**Documentation vs. brevity:** Document code and specs fully (technical + business logic). Keep chat and comment output concise where appropriate; don't duplicate the full directive in every response.

---

## 2. Freedom and constraints

- **Minimize invented constraints.** Prefer first-principles solutions over "how it's usually done." Constraints apply only where the runtime, framework, tooling, or explicit user requirement imposes them. Do not add constraints beyond those.
- When in doubt, choose the approach that best satisfies the directive; do not default to local convention without reason.

## 3. Challenge the status quo

- Do not assume existing code or patterns are optimal. When the current approach is weaker on performance, correctness, readability, or maintainability, question it.
- **Suggest better solutions** proactively. Don't only implement what was literally asked if a better approach is available.
- **Propose and default to the better solution; defer to the user on final call.** If the user asked for a specific method, suggest the improvement and implement it, but the user decides if the original approach stands.
- **Trade-off transparency:** When proposing a better solution, briefly state the impact on **cognitive load** (is it harder for a human to read or reason about?) vs. the **technical gain** (performance, correctness, maintainability). This keeps the agent grounded and prevents over-engineering simple tasks.

## 4. Explicitness over inference

- When you make a **non-obvious choice** (algorithm, structure, tradeoff), surface it briefly rather than silently implementing it. One line or a short note is enough. This pairs with "state briefly why" when breaking convention and gives the user a chance to correct or accept.
- First-class principle: explicitness over inference. Don't hide material decisions in the implementation.

## 5. Performance

- Implement in the **most performant way** that still meets the rest of this directive.
- **Resource awareness:** Prefer algorithms and data structures that match the problem scale and access patterns. Avoid unnecessary allocations, passes, or network calls unless required for correctness or resilience.

## 6. Readability

- The implementation **must be readable**. A future reader (human or agent) should understand intent and flow without reverse-engineering.
- **Intent-based naming:** Name things for what they represent in the business domain, not just their data type (e.g. `pendingApprovers` over `userList`). Structure code so that reading order matches execution and business logic.
- Prefer clarity over cleverness. When clarity and brevity conflict, choose clarity.

## 7. Composition and separation of concerns

**Modular architecture:** Break work into focused units (functions, modules, components) that each do one thing well. Compose the solution from these parts. Avoid monoliths and "do everything" blocks. If a unit grows too large or gains too many responsibilities, split it.

**Logic isolation (MVC-style):** Views receive data and emit actions (events/callbacks); they do not host business rules, branching logic, or orchestration. Controllers or hubs of logic hold decision-making and orchestration; they pass data down and receive actions from views. If a view contains non-trivial logic, move it to a controller (or hook, container, service) and pass down only props/callbacks and data.

**De-duplication:** Consolidate repeated patterns into shared workflows, utilities, hooks, or modules. One canonical implementation beats repeated copies. Applies to: UI flows, API usage, validation, state transitions, and repeated decision or orchestration logic.

## 8. Correctness and robustness

- The **outcome must be bug-free**. Verify behavior against the stated task and expected edge cases.
- Account for **one-off situations and human error**: invalid input, empty state, race conditions, partial failure, misuse.
- **Define against non-accepted inputs**: validate at boundaries, fail fast with clear errors, and do not allow invalid state to propagate.
- **Idempotency and side effects:** For API calls, file manipulations, or any operation that mutates state, ensure that running the task twice does not cause double-data entry, duplicate side effects, or corruption. Design for safe retries and re-runs where applicable.
- Protect implementations with types, guards, and tests that catch real failure modes.
- Implementations should be **testable**; prefer seams and pure logic for critical paths.
- **Observability—no silent failure:** Background or async failures must be surfaced. Use structured logging or error propagation so that when something fails, it is visible and actionable. Do not try-catch errors into a void; ensure failures are reported, logged, or propagated to a boundary that can act on them.

## 9. Maintainability

- Solutions must be **easily maintainable**. Others should be able to change behavior or fix bugs without unraveling the whole.
- Prefer stable interfaces and minimal coupling. When the task or environment changes, the change set should be localized.
- Code is the primary source of truth for *behavior*; documentation is the source of truth for *intent*—why decisions were made and what the business rules are.

## 10. Reversibility

- Prefer decisions that **can be undone**. When two approaches are close, favor the one that's easier to walk back (e.g. feature flags, incremental rollout, or leaving a clear rollback path).
- Reversibility reduces the cost of being wrong and supports iteration.

## 11. Minimal footprint

- Don't add dependencies, abstractions, or files unless they **earn their place**. Counterweight to proactive improvement: avoid over-engineering. When in doubt, add less; you can add more when the need is clear.
- Applies to: new packages, new layers of indirection, new config files, and "just in case" code.

## 12. Documentation

- **Document both dimensions.** Technical: how the code works (APIs, data flow, algorithms, integration points). Business logic: why decisions were made, what rules and domain constraints apply, how behavior aligns with product/domain intent. Documentation is the truth for *intent*; code is the truth for *behavior*.
- **Context density:** Comments and docs should explain **intent** (the "why") rather than **mechanics** (the "how"). Avoid over-commenting obvious code. If the code is clear, prefer fewer, higher-signal comments that capture rationale, constraints, or non-obvious behavior.
- Document in code (comments, JSDoc/TSDoc, README), in specs or ADRs when the change is significant, and at module/component boundaries so contracts and domain rules are explicit.

## 13. Accessibility (UI)

- For UI work: implementations should be accessible (semantics, keyboard, screen readers) unless explicitly out of scope.

---

# Project Context: @hyperbitjs/rpc

## Purpose
- Keep this library a minimal, typed JSON-RPC client.
- Prioritize backward compatibility for `Client` and `createClient`.
- Keep helper constructors (for example `createClientFromConfig`) lightweight and optional.

## Architecture Rules
- Core transport remains in `src/index.ts`.
- Shared public types remain in `src/types.ts`.
- Favor explicit typed errors over throwing in `request()`.
- Avoid adding framework-specific abstractions.

## Coding Rules
- Keep dependencies minimal.
- Prefer small focused functions over large class changes.
- Do not add runtime side effects on import.
- Preserve ESM + CJS distribution compatibility.

## Test Rules
- Add tests only for behavior changes in `test/index.test.ts`.
- Validate with `npm run type-check`, `npm test`, and `npm run build`.
