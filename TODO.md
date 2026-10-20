# TODO

Отложенные улучшения для повышения качества и практической применимости skill pack.

## Приоритетные улучшения

- [ ] Добавить исполняемые критерии завершения для разных типов изменений:
  - [ ] frontend и UI;
  - [ ] backend и API;
  - [ ] базы данных и миграции;
  - [ ] интеграции и distributed systems;
  - [ ] CLI, workers и batch jobs;
  - [ ] security-sensitive изменений;
  - [ ] deployment и infrastructure.
- [ ] Связать каждое важное правило с доказательством выполнения: команда, тест, ручная проверка или артефакт.
- [ ] Добавить в шаблон `checklist.md` раздел с evidence и обязательными quality gates.
- [ ] Описать матрицу риска для low-, medium- и high-risk изменений и соответствующий уровень проверок.

## Security и production readiness

- [ ] Добавить security workflow: threat modeling, trust boundaries, abuse cases и security tests.
- [ ] Добавить проверки секретов, зависимостей, уязвимостей и unsafe logging.
- [ ] Описать требования к CI/CD: lint, typecheck, tests, build, migration checks и quality gates.
- [ ] Добавить рекомендации по rollout strategy, feature flags, canary release и rollback.
- [ ] Расширить observability-рекомендации: structured logs, metrics, tracing, correlation IDs и health checks.

## Архитектура и поддерживаемость

- [ ] Добавить правила для Architecture Decision Records (ADR): решение, alternatives, trade-offs и последствия.
- [ ] Добавить процесс управления техническим долгом: фиксация, оценка влияния, приоритизация и follow-up.
- [ ] Описать правила code review: блокирующие замечания, проверка scope, compatibility, security и тестов.
- [ ] Добавить рекомендации по non-functional requirements: performance, availability, scalability, privacy и operability.
- [ ] Добавить правила проверки качества требований: testable acceptance criteria, edge cases и failure scenarios.

## Документация и developer experience

- [ ] Синхронизировать рекомендации по комментариям и doc comments с checklist и review gate.
- [ ] Добавить шаблоны для ADR, risk assessment и release/rollback plan.
- [ ] Добавить примеры quality gates для JavaScript/TypeScript, Python, Go, Rust и C#/.NET.
- [ ] Проверить README и installation instructions после следующих изменений структуры skills.

## Принцип внедрения

Новые правила должны быть применимыми к конкретному типу задачи и по возможности проверяемыми. Не следует превращать каждый небольшой change в полный production-readiness audit.
