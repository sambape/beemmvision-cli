---
name: "cli-workflow"
description: "Use when an agent needs to export, import, or generate BEEMM-JAM portable workflows through the visionboard CLI. Always use --json."
---

# visionboard workflow

Use this skill when you need to operate BEEMM-JAM workflows from the command line instead of the GUI.

This CLI is designed for **agents first**.

## Hard rules

1. **Always pass `--json`.**
2. Parse stdout as JSON.
3. Trust exit codes:
   - `0` success
   - `1` validation error
   - `2` auth error
   - `3` api/backend error
4. Never rely on human prose for control flow.
5. Prefer explicit flags such as `--project-id`, `--workflow-id`, `--input`, `--output`, `--prompt`.

## Command group

```bash
visionboard --json workflow <subcommand> [options]
```

Subcommands covered by this skill:

- `export`
- `import`
- `samy-generate`

## Response contract

Every successful call returns JSON like:

```json
{
  "ok": true,
  "command": "workflow.export",
  "data": {},
  "meta": {
    "timestamp": "2026-03-04T11:20:00.000Z",
    "logs": []
  }
}
```

Every failed call returns JSON like:

```json
{
  "ok": false,
  "command": "workflow.export",
  "error": {
    "type": "validation_error",
    "message": "Missing required option --workflow-id"
  },
  "meta": {
    "timestamp": "2026-03-04T11:20:00.000Z",
    "logs": []
  }
}
```

## Workflow export

Use `workflow export` to retrieve a BEEMM-JAM portable workflow document.

### Typical usage

```bash
visionboard --json workflow export \
  --project-id proj_demo_001 \
  --workflow-id default
```

### Export to a file

```bash
visionboard --json workflow export \
  --project-id proj_demo_001 \
  --workflow-id default \
  --output ./artifacts/default.workflow.json
```

### Export through Cloud Functions

```bash
visionboard --json \
  --transport callable \
  --functions-base-url http://127.0.0.1:5001/beemm-vision/us-central1 \
  --firebase-id-token "$VISIONBOARD_FIREBASE_ID_TOKEN" \
  workflow export \
  --project-id proj_demo_001 \
  --workflow-id default
```

### What to expect

- `data.portableWorkflow` contains the portable workflow payload
- `data.outputPath` is either an absolute file path or `null`
- `data.transport` tells you which backend was used

If `data.transport === "callable"`, the result came from the real backend through Cloud Functions.
If `data.transport === "mock"`, the command used the local bootstrap transport.

### Recommended agent behavior

1. Call export with `--json`
2. Parse stdout
3. Check `ok === true`
4. Read `data.portableWorkflow`
5. If `data.outputPath` is not null, prefer the file for downstream tooling

## Workflow import

Use `workflow import` to push a portable workflow document into a target workflow.

### Usage pattern

```bash
visionboard --json workflow import \
  --project-id proj_demo_001 \
  --workflow-id default \
  --input ./artifacts/default.workflow.json \
  --mode replace
```

### Append mode

```bash
visionboard --json workflow import \
  --project-id proj_demo_001 \
  --workflow-id default \
  --input ./artifacts/default.workflow.json \
  --mode append
```

### Import through Cloud Functions

```bash
visionboard --json \
  --transport callable \
  --functions-base-url http://127.0.0.1:5001/beemm-vision/us-central1 \
  --firebase-id-token "$VISIONBOARD_FIREBASE_ID_TOKEN" \
  workflow import \
  --project-id proj_demo_001 \
  --workflow-id default \
  --input ./artifacts/default.workflow.json
```

### Agent guidance

- Validate that the input file exists before calling the command
- Prefer importing files produced by `workflow export`
- Treat import as a mutation command: always inspect the result JSON and logs
- Expect a result payload including `importMode`, `workflowName`, `importedNodeCount`, and `importedEdgeCount`
- The default import mode is **replace**, which overwrites the target workflow. You can use `--mode append` to add nodes beside the existing workflow instead.

## Workflow generation with Samy

Use `workflow samy-generate` when you want the CLI to ask the backend agent to produce a portable workflow from a prompt.

### Usage pattern

```bash
visionboard --json workflow samy-generate \
  --project-id proj_demo_001 \
  --workflow-id default \
  --prompt "Build a luxury editorial image workflow with one reference image and one prompt enhancer step."
```

### File output pattern

```bash
visionboard --json workflow samy-generate \
  --project-id proj_demo_001 \
  --workflow-id default \
  --prompt "Create a moodboard-to-image pipeline for brand campaign ideation." \
  --output ./artifacts/samy-generated.workflow.json
```

### Generation through Cloud Functions

```bash
visionboard --json \
  --transport callable \
  --functions-base-url http://127.0.0.1:5001/beemm-vision/us-central1 \
  --firebase-id-token "$VISIONBOARD_FIREBASE_ID_TOKEN" \
  workflow samy-generate \
  --project-id proj_demo_001 \
  --workflow-id default \
  --prompt "Create a luxury editorial image workflow with a prompt enhancer and output-to-board step." \
  --workflow-name "Editorial Samy Flow" \
  --assistant-mode premium \
  --style-preset editorial \
  --generation-strategy standard \
  --output ./artifacts/samy-generated.workflow.json
```

### Agent guidance

- Always keep the raw prompt in your own chain-of-thought memory/context store
- Prefer specific prompts: objective, inputs, outputs, creative direction, app mode expectations
- Persist the generated portable workflow immediately if `outputPath` is null
- If clarification answers are already known, pass them through `--answers-json '{"key":"value"}'`
- Inspect `response.kind`:
  - `workflow` = a portable workflow is ready
  - `questions` = Samy needs clarification before continuing

## Error handling strategy

### Validation error (`exit=1`)

Typical causes:

- missing flag
- invalid path
- malformed input JSON

Agent action:

1. inspect `error.message`
2. fix arguments
3. retry the exact command

### Auth error (`exit=2`)

Typical causes:

- missing credentials
- invalid Firebase auth/session
- forbidden access to project/workflow

Agent action:

1. stop mutation attempts
2. refresh credentials / authentication context
3. retry only after auth is restored

### API error (`exit=3`)

Typical causes:

- backend unavailable
- Cloud Function failure
- transport not implemented yet

Agent action:

1. inspect `meta.logs`
2. decide whether the failure is transient or structural
3. retry only if the backend condition is likely transient

## Best practices

- Always include `--json`, even for quick inspection
- Prefer writing large portable workflows to disk with `--output`
- Store the parsed JSON result, not the raw terminal string
- Use `data.transport` to reason about whether the result is mock, callable, or admin-backed
- If you need to compare two workflows, export both and diff the `portableWorkflow` objects directly

## Minimum agent checklist

- [ ] I used `--json`
- [ ] I parsed stdout as JSON
- [ ] I checked `ok`
- [ ] I checked the exit code
- [ ] I inspected `meta.logs` when troubleshooting
- [ ] I persisted the workflow file when needed