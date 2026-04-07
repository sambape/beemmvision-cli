#!/usr/bin/env node
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../packages/workflow-contracts/dist/portableWorkflow.js
var require_portableWorkflow = __commonJS({
  "../packages/workflow-contracts/dist/portableWorkflow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createMockPortableWorkflowExport = exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE = exports.WorkflowImportResultSchema = exports.PortableWorkflowExportSchema = exports.PortableWorkflowDocumentSchema = exports.PortableWorkflowMetaSchema = exports.PortableWorkflowSchema = exports.PortableWorkflowAppConfigSchema = exports.PortableWorkflowEdgeSchema = exports.PortableWorkflowNodeSchema = exports.PortableWorkflowExecutionStateSchema = void 0;
    var zod_1 = __require("zod");
    exports.PortableWorkflowExecutionStateSchema = zod_1.z.object({
      status: zod_1.z.literal("IDLE"),
      error: zod_1.z.null(),
      outputUrl: zod_1.z.null(),
      outputMimeType: zod_1.z.null(),
      outputData: zod_1.z.null()
    });
    exports.PortableWorkflowNodeSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      type: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1).optional(),
      position: zod_1.z.object({
        x: zod_1.z.number().finite(),
        y: zod_1.z.number().finite()
      }),
      parentId: zod_1.z.string().min(1).nullable().optional(),
      extent: zod_1.z.enum(["parent", "viewport"]).nullable().optional(),
      inputs: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
      executionState: exports.PortableWorkflowExecutionStateSchema
    });
    exports.PortableWorkflowEdgeSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      source: zod_1.z.string().min(1),
      sourceHandle: zod_1.z.string().min(1).nullable().optional(),
      target: zod_1.z.string().min(1),
      targetHandle: zod_1.z.string().min(1).nullable().optional(),
      label: zod_1.z.string().min(1).nullable().optional()
    });
    exports.PortableWorkflowAppConfigSchema = zod_1.z.object({
      enabled: zod_1.z.boolean(),
      inputNodeIds: zod_1.z.array(zod_1.z.string().min(1)),
      outputNodeIds: zod_1.z.array(zod_1.z.string().min(1))
    });
    exports.PortableWorkflowSchema = zod_1.z.object({
      name: zod_1.z.string().min(1),
      camera: zod_1.z.object({
        x: zod_1.z.number().finite(),
        y: zod_1.z.number().finite(),
        zoom: zod_1.z.number().finite()
      }),
      appConfig: exports.PortableWorkflowAppConfigSchema.nullable().optional()
    });
    exports.PortableWorkflowMetaSchema = zod_1.z.object({
      exportedAt: zod_1.z.string().min(1),
      sourceProjectId: zod_1.z.string().min(1),
      sourceWorkflowId: zod_1.z.string().min(1)
    });
    exports.PortableWorkflowDocumentSchema = zod_1.z.object({
      version: zod_1.z.literal(1),
      workflow: exports.PortableWorkflowSchema,
      nodes: zod_1.z.array(exports.PortableWorkflowNodeSchema),
      edges: zod_1.z.array(exports.PortableWorkflowEdgeSchema),
      meta: exports.PortableWorkflowMetaSchema
    });
    exports.PortableWorkflowExportSchema = exports.PortableWorkflowDocumentSchema;
    exports.WorkflowImportResultSchema = zod_1.z.object({
      importMode: zod_1.z.enum(["replace", "append"]),
      workflowName: zod_1.z.string().min(1),
      importedNodeCount: zod_1.z.number().int().nonnegative(),
      importedEdgeCount: zod_1.z.number().int().nonnegative()
    });
    exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE = {
      status: "IDLE",
      error: null,
      outputUrl: null,
      outputMimeType: null,
      outputData: null
    };
    var createMockPortableWorkflowExport2 = (params) => {
      const portableWorkflow = {
        version: 1,
        workflow: {
          name: "Mock Workflow Export",
          camera: {
            x: 0,
            y: 0,
            zoom: 1
          },
          appConfig: null
        },
        nodes: [
          {
            id: "node_import_starter",
            type: "import",
            label: "Import",
            position: { x: 120, y: 200 },
            inputs: {
              value: "",
              file: ""
            },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_text_starter",
            type: "text",
            label: "Texte",
            position: { x: 120, y: 520 },
            inputs: {
              value: "Decrivez la transformation souhaitee pour votre image importee.",
              width: 400,
              height: 220
            },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_prompt_enhancer_starter",
            type: "promptEnhancer",
            label: "Prompt Enhancer",
            position: { x: 620, y: 520 },
            inputs: {
              model: "google/gemini-2.5-flash",
              prompt: "",
              system_prompt: "Transform the prompt into a precise creative brief."
            },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_image_model_starter",
            type: "imageModel",
            label: "Nano Banana 2",
            position: { x: 1020, y: 320 },
            inputs: {
              modelId: "nano-banana-2",
              prompt: "",
              seed: 424242,
              resolution: "1K",
              aspectRatio: "auto",
              dynamicInputs: {},
              imageInputCount: 1,
              randomSeed: true,
              outputFormat: "png"
            },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          }
        ],
        edges: [
          {
            id: "edge_starter_import_to_model",
            source: "node_import_starter",
            sourceHandle: "file",
            target: "node_image_model_starter",
            targetHandle: "image",
            label: "Image"
          },
          {
            id: "edge_starter_text_to_enhancer",
            source: "node_text_starter",
            sourceHandle: "text",
            target: "node_prompt_enhancer_starter",
            targetHandle: "prompt",
            label: "Prompt"
          },
          {
            id: "edge_starter_enhancer_to_model",
            source: "node_prompt_enhancer_starter",
            sourceHandle: "text",
            target: "node_image_model_starter",
            targetHandle: "prompt",
            label: "Prompt"
          }
        ],
        meta: {
          exportedAt: (/* @__PURE__ */ new Date("2026-03-04T11:20:00.000Z")).toISOString(),
          sourceProjectId: params.projectId,
          sourceWorkflowId: params.workflowId
        }
      };
      return exports.PortableWorkflowExportSchema.parse(portableWorkflow);
    };
    exports.createMockPortableWorkflowExport = createMockPortableWorkflowExport2;
  }
});

// ../packages/workflow-contracts/dist/catalog.js
var require_catalog = __commonJS({
  "../packages/workflow-contracts/dist/catalog.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TemplateDuplicateResultSchema = exports.TemplateGetResultSchema = exports.TemplateListResultSchema = exports.TemplateSummarySchema = exports.WorkflowTemplateStatusSchema = exports.WorkflowListResultSchema = exports.WorkflowListItemSchema = exports.ProjectListResultSchema = exports.ProjectSummarySchema = void 0;
    var zod_1 = __require("zod");
    var portableWorkflow_1 = require_portableWorkflow();
    exports.ProjectSummarySchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1),
      name: zod_1.z.string().min(1),
      type: zod_1.z.enum(["board", "workflow"]).nullable(),
      ownerId: zod_1.z.string().min(1),
      ownerName: zod_1.z.string().min(1),
      updatedAt: zod_1.z.string().nullable(),
      lastOpenedAt: zod_1.z.string().nullable()
    });
    exports.ProjectListResultSchema = zod_1.z.object({
      projectCount: zod_1.z.number().int().nonnegative(),
      projects: zod_1.z.array(exports.ProjectSummarySchema)
    });
    exports.WorkflowListItemSchema = zod_1.z.object({
      workflowId: zod_1.z.string().min(1),
      name: zod_1.z.string().min(1),
      updatedAt: zod_1.z.string().nullable(),
      lastExecutedAt: zod_1.z.string().nullable(),
      appConfigEnabled: zod_1.z.boolean()
    });
    exports.WorkflowListResultSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1),
      workflowCount: zod_1.z.number().int().nonnegative(),
      workflows: zod_1.z.array(exports.WorkflowListItemSchema)
    });
    exports.WorkflowTemplateStatusSchema = zod_1.z.enum(["pending", "approved", "rejected"]);
    exports.TemplateSummarySchema = zod_1.z.object({
      templateId: zod_1.z.string().min(1),
      title: zod_1.z.string().min(1),
      description: zod_1.z.string(),
      thumbnailUrl: zod_1.z.string().nullable(),
      creatorName: zod_1.z.string().min(1),
      creatorPhotoUrl: zod_1.z.string().nullable(),
      status: exports.WorkflowTemplateStatusSchema,
      includesGeneratedData: zod_1.z.boolean(),
      createdAt: zod_1.z.string().nullable(),
      updatedAt: zod_1.z.string().nullable()
    });
    exports.TemplateListResultSchema = zod_1.z.object({
      templateCount: zod_1.z.number().int().nonnegative(),
      templates: zod_1.z.array(exports.TemplateSummarySchema)
    });
    exports.TemplateGetResultSchema = zod_1.z.object({
      template: exports.TemplateSummarySchema,
      portableWorkflow: portableWorkflow_1.PortableWorkflowDocumentSchema
    });
    exports.TemplateDuplicateResultSchema = zod_1.z.object({
      templateId: zod_1.z.string().min(1),
      projectId: zod_1.z.string().min(1),
      workflowId: zod_1.z.string().min(1),
      projectName: zod_1.z.string().min(1),
      workflowName: zod_1.z.string().min(1)
    });
  }
});

// ../packages/workflow-contracts/dist/samyWorkflow.js
var require_samyWorkflow = __commonJS({
  "../packages/workflow-contracts/dist/samyWorkflow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamyWorkflowDraftResultSchema = exports.SamyGenerateWorkflowResponseSchema = exports.SamyWorkflowResponseSchema = exports.SamyQuestionsResponseSchema = exports.SanitizedSamyGenerateWorkflowRequestSchema = exports.SamyGenerateWorkflowRequestSchema = exports.SamyPromptAuditStepSchema = exports.SamyQuestionSchema = exports.SamyQuestionTypeSchema = exports.SamyGenerationStrategySchema = exports.SamyWorkflowStylePresetSchema = exports.SamyAssistantModeSchema = exports.WorkflowAssistantGenerateResponseSchema = exports.WorkflowAssistantWorkflowResponseSchema = exports.WorkflowAssistantQuestionsResponseSchema = exports.SanitizedWorkflowAssistantGenerateRequestSchema = exports.WorkflowAssistantGenerateRequestSchema = exports.WorkflowAssistantPromptAuditStepSchema = exports.WorkflowAssistantPromptAuditStepKindSchema = exports.WorkflowAssistantQuestionSchema = exports.WorkflowAssistantQuestionTypeSchema = exports.WorkflowAssistantGenerationStrategySchema = exports.WorkflowAssistantStylePresetSchema = exports.WorkflowAssistantModeSchema = void 0;
    var zod_1 = __require("zod");
    var portableWorkflow_1 = require_portableWorkflow();
    exports.WorkflowAssistantModeSchema = zod_1.z.enum([
      "fast",
      "premium",
      "pro",
      "deepseek-v3",
      "qwen3-32b",
      "qwen3-72b",
      "qwen25-72b"
    ]);
    exports.WorkflowAssistantStylePresetSchema = zod_1.z.enum([
      "default",
      "editorial",
      "graphic",
      "cinematic"
    ]);
    exports.WorkflowAssistantGenerationStrategySchema = zod_1.z.enum([
      "standard",
      "dashboard_bootstrap"
    ]);
    exports.WorkflowAssistantQuestionTypeSchema = zod_1.z.enum(["select", "text", "toggle"]);
    exports.WorkflowAssistantQuestionSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      type: exports.WorkflowAssistantQuestionTypeSchema,
      options: zod_1.z.array(zod_1.z.string()).optional(),
      placeholder: zod_1.z.string().optional(),
      required: zod_1.z.boolean().optional()
    });
    exports.WorkflowAssistantPromptAuditStepKindSchema = zod_1.z.enum([
      "clarification",
      "workflow_spec",
      "workflow_draft",
      "workflow_repair"
    ]);
    exports.WorkflowAssistantPromptAuditStepSchema = zod_1.z.object({
      step: exports.WorkflowAssistantPromptAuditStepKindSchema,
      openRouterModel: zod_1.z.string().min(1),
      systemLayers: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().min(1),
        source: zod_1.z.string().min(1)
      })),
      userMessageSummary: zod_1.z.object({
        jsonKeys: zod_1.z.array(zod_1.z.string()),
        promptCharCount: zod_1.z.number().optional(),
        briefKeyCount: zod_1.z.number().optional(),
        repairAttempt: zod_1.z.number().optional(),
        validationErrorCount: zod_1.z.number().optional()
      }),
      note: zod_1.z.string().optional()
    });
    exports.WorkflowAssistantGenerateRequestSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1).optional(),
      workflowId: zod_1.z.string().min(1).optional(),
      prompt: zod_1.z.string().min(1),
      answers: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.null()])).optional(),
      assistantMode: exports.WorkflowAssistantModeSchema.optional(),
      priorQuestionRounds: zod_1.z.number().int().nonnegative().optional(),
      workflowName: zod_1.z.string().min(1).optional(),
      stylePreset: exports.WorkflowAssistantStylePresetSchema.optional(),
      generationStrategy: exports.WorkflowAssistantGenerationStrategySchema.optional()
    });
    exports.SanitizedWorkflowAssistantGenerateRequestSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1).optional(),
      workflowId: zod_1.z.string().min(1).optional(),
      prompt: zod_1.z.string().min(1),
      answers: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.null()])),
      assistantMode: exports.WorkflowAssistantModeSchema,
      priorQuestionRounds: zod_1.z.number().int().nonnegative(),
      workflowName: zod_1.z.string().min(1).optional(),
      stylePreset: exports.WorkflowAssistantStylePresetSchema,
      generationStrategy: exports.WorkflowAssistantGenerationStrategySchema
    });
    exports.WorkflowAssistantQuestionsResponseSchema = zod_1.z.object({
      kind: zod_1.z.literal("questions"),
      summary: zod_1.z.string().optional(),
      questions: zod_1.z.array(exports.WorkflowAssistantQuestionSchema),
      totalCost: zod_1.z.number().optional(),
      trace: zod_1.z.array(zod_1.z.string()).optional(),
      promptAudit: zod_1.z.array(exports.WorkflowAssistantPromptAuditStepSchema).optional()
    });
    exports.WorkflowAssistantWorkflowResponseSchema = zod_1.z.object({
      kind: zod_1.z.literal("workflow"),
      workflowName: zod_1.z.string().min(1),
      portableWorkflow: portableWorkflow_1.PortableWorkflowExportSchema,
      warnings: zod_1.z.array(zod_1.z.string()),
      reasoningSummary: zod_1.z.string().optional(),
      totalCost: zod_1.z.number().optional(),
      trace: zod_1.z.array(zod_1.z.string()).optional(),
      promptAudit: zod_1.z.array(exports.WorkflowAssistantPromptAuditStepSchema).optional()
    });
    exports.WorkflowAssistantGenerateResponseSchema = zod_1.z.union([
      exports.WorkflowAssistantQuestionsResponseSchema,
      exports.WorkflowAssistantWorkflowResponseSchema
    ]);
    exports.SamyAssistantModeSchema = exports.WorkflowAssistantModeSchema;
    exports.SamyWorkflowStylePresetSchema = exports.WorkflowAssistantStylePresetSchema;
    exports.SamyGenerationStrategySchema = exports.WorkflowAssistantGenerationStrategySchema;
    exports.SamyQuestionTypeSchema = exports.WorkflowAssistantQuestionTypeSchema;
    exports.SamyQuestionSchema = exports.WorkflowAssistantQuestionSchema;
    exports.SamyPromptAuditStepSchema = exports.WorkflowAssistantPromptAuditStepSchema;
    exports.SamyGenerateWorkflowRequestSchema = exports.WorkflowAssistantGenerateRequestSchema;
    exports.SanitizedSamyGenerateWorkflowRequestSchema = exports.SanitizedWorkflowAssistantGenerateRequestSchema;
    exports.SamyQuestionsResponseSchema = exports.WorkflowAssistantQuestionsResponseSchema;
    exports.SamyWorkflowResponseSchema = exports.WorkflowAssistantWorkflowResponseSchema;
    exports.SamyGenerateWorkflowResponseSchema = exports.WorkflowAssistantGenerateResponseSchema;
    exports.SamyWorkflowDraftResultSchema = zod_1.z.object({
      workflowName: zod_1.z.string().min(1),
      reasoningSummary: zod_1.z.string().min(1),
      portableWorkflow: portableWorkflow_1.PortableWorkflowDocumentSchema
    });
  }
});

// ../packages/workflow-contracts/dist/workflowRun.js
var require_workflowRun = __commonJS({
  "../packages/workflow-contracts/dist/workflowRun.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkflowExecutionResultSchema = exports.WorkflowRunResultSchema = exports.WorkflowRunSummarySchema = exports.WorkflowRunProgressEventSchema = exports.WorkflowRunArtifactSchema = void 0;
    var zod_1 = __require("zod");
    exports.WorkflowRunArtifactSchema = zod_1.z.object({
      nodeId: zod_1.z.string().min(1),
      nodeType: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      kind: zod_1.z.enum(["image", "video", "text", "json"]),
      url: zod_1.z.string().min(1).optional(),
      text: zod_1.z.string().min(1).optional(),
      mimeType: zod_1.z.string().min(1).nullable().optional(),
      modelId: zod_1.z.string().min(1).nullable().optional(),
      prompt: zod_1.z.string().min(1).nullable().optional(),
      data: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional()
    });
    exports.WorkflowRunProgressEventSchema = zod_1.z.object({
      step: zod_1.z.enum(["workflow_start", "node_start", "node_complete", "node_failed", "workflow_complete"]),
      nodeId: zod_1.z.string().min(1),
      nodeType: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      status: zod_1.z.enum(["queued", "running", "success", "failed", "skipped"]),
      message: zod_1.z.string().min(1).nullable().optional(),
      completedNodeCount: zod_1.z.number().int().nonnegative().optional(),
      totalNodeCount: zod_1.z.number().int().nonnegative().optional(),
      timestamp: zod_1.z.string().min(1)
    });
    exports.WorkflowRunSummarySchema = zod_1.z.object({
      executedNodeCount: zod_1.z.number().int().nonnegative(),
      artifactCount: zod_1.z.number().int().nonnegative(),
      warningCount: zod_1.z.number().int().nonnegative()
    });
    exports.WorkflowRunResultSchema = zod_1.z.object({
      runId: zod_1.z.string().min(1),
      workflowName: zod_1.z.string().min(1),
      artifactCount: zod_1.z.number().int().nonnegative(),
      executedNodeCount: zod_1.z.number().int().nonnegative(),
      warnings: zod_1.z.array(zod_1.z.string()),
      artifacts: zod_1.z.array(exports.WorkflowRunArtifactSchema)
    });
    exports.WorkflowExecutionResultSchema = zod_1.z.object({
      run: exports.WorkflowRunResultSchema,
      progressEvents: zod_1.z.array(exports.WorkflowRunProgressEventSchema),
      summary: exports.WorkflowRunSummarySchema,
      creditsUsed: zod_1.z.number().optional(),
      remainingCredits: zod_1.z.number().optional()
    });
  }
});

// src/core/runner.ts
import { Command, CommanderError as CommanderError2 } from "commander";

// src/commands/auth.ts
import { z } from "zod";

// src/core/context.ts
var buildMeta = (logs) => ({
  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
  logs: [...logs]
});
var createSuccessResponse = (command, data, logs) => ({
  ok: true,
  command,
  data,
  meta: buildMeta(logs)
});
var createErrorResponse = (command, error, logs) => ({
  ok: false,
  command,
  error,
  meta: buildMeta(logs)
});

// src/core/commandAction.ts
var createCommandAction = (options) => {
  return async (rawOptions) => {
    options.context.commandName = options.commandName;
    const parsedOptions = options.schema.parse(rawOptions);
    const result = await options.handler(parsedOptions, options.context);
    options.context.response = createSuccessResponse(
      options.commandName,
      result,
      options.context.output.logs
    );
  };
};

// src/core/localAuth.ts
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
var resolveConfigHome = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join(env.HOME, ".config");
  }
  return join(homedir(), ".config");
};
var getVisionboardAuthFilePath = (env = process.env) => {
  if (env.VISIONBOARD_AUTH_FILE && env.VISIONBOARD_AUTH_FILE.trim()) {
    return env.VISIONBOARD_AUTH_FILE;
  }
  return join(resolveConfigHome(env), "visionboard", "auth.json");
};
var loadStoredAuth = (env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  if (!existsSync(authFilePath)) {
    return void 0;
  }
  try {
    const raw = readFileSync(authFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
};
var loadStoredFirebaseIdToken = (env = process.env) => {
  const parsed = loadStoredAuth(env);
  return parsed && typeof parsed.firebaseIdToken === "string" && parsed.firebaseIdToken.trim() ? parsed.firebaseIdToken.trim() : void 0;
};
var storeFirebaseIdToken = (token, refreshToken, apiKey, env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  mkdirSync(dirname(authFilePath), { recursive: true, mode: 448 });
  writeFileSync(
    authFilePath,
    `${JSON.stringify({ firebaseIdToken: token, refreshToken, apiKey, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, null, 2)}
`,
    { encoding: "utf8", mode: 384 }
  );
  return authFilePath;
};
var clearStoredFirebaseIdToken = (env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  rmSync(authFilePath, { force: true });
  return authFilePath;
};
var decodeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
};
var decodeFirebaseIdTokenClaims = (token) => {
  const parts = token.split(".");
  if (parts.length < 2) {
    throw new Error("Invalid Firebase ID token format.");
  }
  return JSON.parse(decodeBase64Url(parts[1]));
};
var getFirebaseTokenAudience = (token) => {
  try {
    const claims = decodeFirebaseIdTokenClaims(token);
    return typeof claims.aud === "string" && claims.aud.trim() ? claims.aud.trim() : void 0;
  } catch {
    return void 0;
  }
};
var refreshFirebaseIdToken = async (env = process.env) => {
  const authData = loadStoredAuth(env);
  if (!authData || !authData.refreshToken || !authData.apiKey) {
    return void 0;
  }
  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${authData.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: authData.refreshToken
      })
    });
    if (!response.ok) {
      return void 0;
    }
    const data = await response.json();
    if (data.id_token) {
      storeFirebaseIdToken(data.id_token, data.refresh_token || authData.refreshToken, authData.apiKey, env);
      return data.id_token;
    }
  } catch {
    return void 0;
  }
  return void 0;
};
var getValidFirebaseIdToken = async (env = process.env) => {
  const token = loadStoredFirebaseIdToken(env);
  if (!token) return void 0;
  try {
    const claims = decodeFirebaseIdTokenClaims(token);
    const exp = typeof claims.exp === "number" ? claims.exp : 0;
    if (Date.now() / 1e3 > exp - 300) {
      return await refreshFirebaseIdToken(env) || token;
    }
  } catch {
    return await refreshFirebaseIdToken(env);
  }
  return token;
};

// src/core/errors.ts
import { CommanderError } from "commander";
import { ZodError } from "zod";

// src/core/exitCodes.ts
var EXIT_CODES = {
  SUCCESS: 0,
  VALIDATION: 1,
  AUTH: 2,
  API: 3
};

// src/core/errors.ts
var CliError = class extends Error {
  type;
  exitCode;
  cause;
  constructor(options) {
    super(options.message);
    this.name = "CliError";
    this.type = options.type;
    this.exitCode = options.exitCode;
    this.cause = options.cause;
  }
};
var formatZodMessage = (error) => {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  }).join("; ");
};
var normalizeError = (error) => {
  if (error instanceof CliError) {
    return error;
  }
  if (error instanceof CommanderError) {
    return commanderErrorToCliError(error);
  }
  if (error instanceof ZodError) {
    return new CliError({
      type: "validation_error",
      message: formatZodMessage(error),
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (error instanceof Error) {
    if (error.type === "auth_error") {
      return new CliError({
        type: "auth_error",
        message: error.message,
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    if (error.type === "validation_error") {
      return new CliError({
        type: "validation_error",
        message: error.message,
        exitCode: EXIT_CODES.VALIDATION,
        cause: error
      });
    }
    return new CliError({
      type: "api_error",
      message: error.message,
      exitCode: EXIT_CODES.API,
      cause: error
    });
  }
  return new CliError({
    type: "api_error",
    message: "Unknown CLI error",
    exitCode: EXIT_CODES.API,
    cause: error
  });
};
var commanderErrorToCliError = (error) => {
  const cleanedMessage = error.message.replace(/^error:\s*/i, "").trim();
  if (error.code === "commander.helpDisplayed") {
    return new CliError({
      type: "api_error",
      message: cleanedMessage || "Help displayed",
      exitCode: EXIT_CODES.SUCCESS,
      cause: error
    });
  }
  return new CliError({
    type: "validation_error",
    message: cleanedMessage || "Invalid command invocation",
    exitCode: EXIT_CODES.VALIDATION,
    cause: error
  });
};

// src/core/browserAuth.ts
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { URL } from "node:url";
var buildBrowserAuthUrl = (baseAppUrl, state, callbackUrl) => {
  const trimmedBaseUrl = baseAppUrl.replace(/\/$/, "");
  const params = new URLSearchParams({ state, callbackUrl });
  return `${trimmedBaseUrl}/#/cli-auth?${params.toString()}`;
};
var createDeferred = () => {
  let resolve6;
  let reject;
  let settled = false;
  const promise = new Promise((innerResolve, innerReject) => {
    resolve6 = (value) => {
      settled = true;
      innerResolve(value);
    };
    reject = (reason) => {
      settled = true;
      innerReject(reason);
    };
  });
  return {
    promise,
    resolve: resolve6,
    reject,
    get settled() {
      return settled;
    }
  };
};
var readJsonBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
};
var writeJson = (response, statusCode, payload, baseAppUrl) => {
  response.statusCode = statusCode;
  const origin = new URL(baseAppUrl).origin;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(`${JSON.stringify(payload)}
`);
};
var writeHtml = (response, statusCode, html, baseAppUrl) => {
  response.statusCode = statusCode;
  const origin = new URL(baseAppUrl).origin;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.end(html);
};
var createBrowserAuthSession = async (baseAppUrl, options = {}) => {
  const host = options.host || "127.0.0.1";
  const callbackPath = options.callbackPath || "/cli-auth/callback";
  const timeoutMs = options.timeoutMs ?? 18e4;
  const state = randomBytes(24).toString("hex");
  const deferredToken = createDeferred();
  let pendingError = null;
  const server = createServer(async (request, response) => {
    try {
      if (!request.url) {
        writeJson(response, 404, { ok: false, error: "Not found" }, baseAppUrl);
        return;
      }
      const requestUrl = new URL(request.url, `http://${host}`);
      if (request.method === "OPTIONS") {
        writeJson(response, 204, {}, baseAppUrl);
        return;
      }
      if (request.method === "GET" && requestUrl.pathname === "/healthz") {
        writeJson(response, 200, { ok: true }, baseAppUrl);
        return;
      }
      if (request.method === "POST" && requestUrl.pathname === callbackPath) {
        const body = await readJsonBody(request);
        const receivedState = typeof body.state === "string" ? body.state : "";
        const firebaseIdToken = typeof body.firebaseIdToken === "string" ? body.firebaseIdToken : "";
        const refreshToken = typeof body.refreshToken === "string" ? body.refreshToken : void 0;
        const apiKey = typeof body.apiKey === "string" ? body.apiKey : void 0;
        if (receivedState !== state) {
          writeJson(response, 400, { ok: false, error: "Invalid state" }, baseAppUrl);
          if (!deferredToken.settled) {
            pendingError = new Error("Browser auth state mismatch.");
          }
          return;
        }
        if (!firebaseIdToken) {
          writeJson(response, 400, { ok: false, error: "Missing firebaseIdToken" }, baseAppUrl);
          if (!deferredToken.settled) {
            pendingError = new Error("Browser auth callback missing Firebase ID token.");
          }
          return;
        }
        try {
          decodeFirebaseIdTokenClaims(firebaseIdToken);
        } catch (error) {
          writeJson(response, 400, { ok: false, error: "Invalid firebaseIdToken" }, baseAppUrl);
          if (!deferredToken.settled) {
            pendingError = error instanceof Error ? error : new Error(String(error));
          }
          return;
        }
        writeHtml(
          response,
          200,
          '<!doctype html><html><body style="font-family: sans-serif; padding: 24px;"><h1>VisionBoard CLI login complete</h1><p>You can close this window and return to the terminal.</p></body></html>',
          baseAppUrl
        );
        if (!deferredToken.settled) {
          deferredToken.resolve({ firebaseIdToken, refreshToken, apiKey });
        }
        return;
      }
      writeJson(response, 404, { ok: false, error: "Not found" }, baseAppUrl);
    } catch (error) {
      writeJson(response, 500, { ok: false, error: error instanceof Error ? error.message : "Internal error" }, baseAppUrl);
      if (!deferredToken.settled) {
        pendingError = error instanceof Error ? error : new Error(String(error));
      }
    }
  });
  await new Promise((resolve6, reject) => {
    server.listen(0, host, () => resolve6());
    server.once("error", reject);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Unable to start local auth callback server.");
  }
  const callbackUrl = `http://${host}:${address.port}${callbackPath}`;
  const authUrl = buildBrowserAuthUrl(baseAppUrl, state, callbackUrl);
  const timeout = setTimeout(() => {
    if (!deferredToken.settled) {
      pendingError = new Error("Browser login timed out.");
    }
  }, timeoutMs);
  return {
    authUrl,
    state,
    callbackUrl,
    waitForToken: async () => {
      if (pendingError) {
        throw pendingError;
      }
      let pendingErrorWatcher = null;
      if (!deferredToken.settled) {
        pendingErrorWatcher = setInterval(() => {
          if (!pendingError) {
            return;
          }
          if (pendingErrorWatcher) {
            clearInterval(pendingErrorWatcher);
            pendingErrorWatcher = null;
          }
          if (!deferredToken.settled) {
            deferredToken.reject(pendingError);
          }
        }, 10);
      }
      try {
        return await deferredToken.promise;
      } finally {
        if (pendingErrorWatcher) {
          clearInterval(pendingErrorWatcher);
        }
        clearTimeout(timeout);
      }
    },
    close: async () => {
      clearTimeout(timeout);
      await new Promise((resolve6, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve6();
        });
      });
    },
    getError: () => pendingError
  };
};

// src/commands/auth.ts
var AuthLoginOptionsSchema = z.object({
  firebaseIdToken: z.string().min(1, "firebaseIdToken is required"),
  refreshToken: z.string().optional(),
  apiKey: z.string().optional()
});
var AuthWhoamiOptionsSchema = z.object({}).passthrough();
var AuthLogoutOptionsSchema = z.object({}).passthrough();
var AuthRefreshOptionsSchema = z.object({}).passthrough();
var AuthLoginBrowserOptionsSchema = z.object({
  noOpen: z.boolean().optional(),
  timeoutSeconds: z.number().int().positive().max(900).optional(),
  force: z.boolean().default(false)
});
var buildAuthSource = (context) => context.runtimeConfig.firebaseIdTokenSource;
var authLoginHandler = async (options, context) => {
  const claims = decodeFirebaseIdTokenClaims(options.firebaseIdToken);
  const authFilePath = storeFirebaseIdToken(options.firebaseIdToken, options.refreshToken, options.apiKey, context.env);
  console.log(`[auth.login] Firebase ID token stored in ${authFilePath}`);
  return {
    stored: true,
    authFilePath,
    subject: typeof claims.user_id === "string" ? claims.user_id : claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    source: "cli"
  };
};
var authWhoamiHandler = async (_options, context) => {
  const token = context.runtimeConfig.firebaseIdToken;
  if (!token) {
    throw new CliError({
      type: "auth_error",
      message: "No Firebase ID token configured. Use `auth login --firebase-id-token <token>` or set VISIONBOARD_FIREBASE_ID_TOKEN.",
      exitCode: EXIT_CODES.AUTH
    });
  }
  const claims = decodeFirebaseIdTokenClaims(token);
  console.log(`[auth.whoami] Firebase ID token loaded from ${buildAuthSource(context)}`);
  return {
    source: buildAuthSource(context),
    authFilePath: getVisionboardAuthFilePath(context.env),
    subject: typeof claims.user_id === "string" ? claims.user_id : claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    audience: typeof claims.aud === "string" ? claims.aud : null,
    issuer: typeof claims.iss === "string" ? claims.iss : null,
    expiresAtEpochSeconds: typeof claims.exp === "number" ? claims.exp : null
  };
};
var authLogoutHandler = async (_options, context) => {
  const authFilePath = clearStoredFirebaseIdToken(context.env);
  console.log(`[auth.logout] Cleared stored Firebase ID token from ${authFilePath}`);
  return {
    cleared: true,
    authFilePath
  };
};
var authRefreshHandler = async (_options, context) => {
  const newToken = await refreshFirebaseIdToken(context.env);
  if (!newToken) {
    throw new CliError({
      type: "auth_error",
      message: "Failed to refresh Firebase ID token. You may need to run `auth login` again.",
      exitCode: EXIT_CODES.AUTH
    });
  }
  console.log(`[auth.refresh] Firebase ID token refreshed successfully.`);
  return {
    refreshed: true
  };
};
var registerAuthCommands = (program, context) => {
  const authCommand = program.command("auth").description("Manage CLI Firebase authentication state");
  authCommand.command("login").description("Store a Firebase ID token in the local CLI config, or start browser login when no token is provided").option("--token <token>", "Firebase ID token to store locally").option("--firebase-id-token <token>", "Firebase ID token to store locally").option("--no-open", "Do not attempt to open the browser automatically").option("--timeout-seconds <seconds>", "Browser login timeout in seconds", (value) => Number(value)).option("--force", "Force re-login even if already authenticated").action(async (rawOptions, command) => {
    context.commandName = "auth.login";
    const rootOptions = command.parent?.parent?.opts?.() ?? {};
    const firebaseIdToken = rawOptions.token ?? rawOptions.firebaseIdToken ?? rootOptions.firebaseIdToken;
    if (typeof firebaseIdToken === "string" && firebaseIdToken.trim()) {
      const parsedOptions = AuthLoginOptionsSchema.parse({ firebaseIdToken });
      const result = await authLoginHandler(parsedOptions, context);
      console.log("[auth.login] Login completed successfully.");
      context.response = createSuccessResponse("auth.login", result, context.output.logs);
      return;
    }
    const browserOptions = AuthLoginBrowserOptionsSchema.parse(rawOptions);
    if (!browserOptions.force && context.runtimeConfig.firebaseIdToken) {
      const claims = decodeFirebaseIdTokenClaims(context.runtimeConfig.firebaseIdToken);
      const email = typeof claims.email === "string" ? claims.email : null;
      if (email) {
        console.log(`
\u2705 Already logged in as \x1B[36m${email}\x1B[0m
`);
        console.log(`   To re-login, run: beemmvision auth login --force
`);
        context.response = createSuccessResponse("auth.login", { email, alreadyLoggedIn: true }, context.output.logs);
        return;
      }
    }
    const session = await createBrowserAuthSession(context.runtimeConfig.appBaseUrl, {
      timeoutMs: (browserOptions.timeoutSeconds ?? 180) * 1e3
    });
    try {
      console.log(`[auth.login] Browser login URL: ${session.authUrl}`);
      console.log("[auth.login] Waiting for browser authentication...");
      if (browserOptions.noOpen !== true) {
        try {
          const { default: open } = await import("open");
          await open(session.authUrl);
          console.log("[auth.login] Browser opened automatically.");
        } catch (error) {
          console.log(`[auth.login] Unable to open browser automatically: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      const { firebaseIdToken: firebaseIdTokenFromBrowser, refreshToken, apiKey } = await session.waitForToken();
      const parsedOptions = AuthLoginOptionsSchema.parse({ firebaseIdToken: firebaseIdTokenFromBrowser, refreshToken, apiKey });
      const result = await authLoginHandler(parsedOptions, context);
      console.log("[auth.login] Browser authentication completed successfully.");
      const tokenAudience = getFirebaseTokenAudience(firebaseIdTokenFromBrowser);
      context.response = createSuccessResponse("auth.login", {
        ...result,
        authUrl: session.authUrl,
        callbackUrl: session.callbackUrl,
        browserFlow: true,
        tokenAudience
      }, context.output.logs);
    } finally {
      await session.close();
    }
  });
  authCommand.command("whoami").description("Inspect the current Firebase ID token configured for the CLI").action(
    createCommandAction({
      context,
      commandName: "auth.whoami",
      schema: AuthWhoamiOptionsSchema,
      handler: authWhoamiHandler
    })
  );
  authCommand.command("logout").description("Clear the locally stored Firebase ID token").action(
    createCommandAction({
      context,
      commandName: "auth.logout",
      schema: AuthLogoutOptionsSchema,
      handler: authLogoutHandler
    })
  );
  authCommand.command("refresh").description("Refresh the locally stored Firebase ID token using the refresh token").action(
    createCommandAction({
      context,
      commandName: "auth.refresh",
      schema: AuthRefreshOptionsSchema,
      handler: authRefreshHandler
    })
  );
};

// src/commands/config.ts
import { z as z2 } from "zod";

// src/core/localConfig.ts
import { existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname as dirname2, join as join2 } from "node:path";
import { homedir as homedir2 } from "node:os";
var resolveConfigHome2 = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join2(env.HOME, ".config");
  }
  return join2(homedir2(), ".config");
};
var getVisionboardConfigFilePath = (env = process.env) => {
  if (env.VISIONBOARD_CONFIG_FILE && env.VISIONBOARD_CONFIG_FILE.trim()) {
    return env.VISIONBOARD_CONFIG_FILE;
  }
  return join2(resolveConfigHome2(env), "visionboard", "config.json");
};
var loadVisionboardCliConfig = (env = process.env) => {
  const configFilePath = getVisionboardConfigFilePath(env);
  if (!existsSync2(configFilePath)) {
    return {};
  }
  try {
    const raw = readFileSync2(configFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};
var writeVisionboardCliConfig = (patch, env = process.env) => {
  const configFilePath = getVisionboardConfigFilePath(env);
  const current = loadVisionboardCliConfig(env);
  const next = {
    ...current,
    ...patch,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  mkdirSync2(dirname2(configFilePath), { recursive: true });
  writeFileSync2(configFilePath, `${JSON.stringify(next, null, 2)}
`, "utf8");
  return configFilePath;
};

// src/commands/config.ts
import { readFileSync as readFileSync3 } from "node:fs";

// src/contracts/portableWorkflow.ts
var import_portableWorkflow = __toESM(require_portableWorkflow(), 1);

// src/contracts/catalog.ts
var import_catalog = __toESM(require_catalog(), 1);

// src/contracts/samyWorkflow.ts
var import_samyWorkflow = __toESM(require_samyWorkflow(), 1);

// src/contracts/workflowRun.ts
var import_workflowRun = __toESM(require_workflowRun(), 1);

// src/transports/mockWorkflowTransport.ts
var MockWorkflowTransport = class {
  kind = "mock";
  async exportWorkflow(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: input.projectId,
      workflowId: input.workflowId
    });
    return import_portableWorkflow.PortableWorkflowExportSchema.parse(portableWorkflow);
  }
  async importWorkflow(input) {
    return import_portableWorkflow.WorkflowImportResultSchema.parse({
      importMode: input.importMode || "replace",
      workflowName: input.payload.workflow.name,
      importedNodeCount: input.payload.nodes.length,
      importedEdgeCount: input.payload.edges.length
    });
  }
  async generateWorkflow(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: input.projectId,
      workflowId: input.workflowId
    });
    return import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse({
      kind: "workflow",
      workflowName: input.workflowName || "Mock Samy Workflow",
      portableWorkflow: {
        ...portableWorkflow,
        workflow: {
          ...portableWorkflow.workflow,
          name: input.workflowName || "Mock Samy Workflow"
        }
      },
      warnings: [],
      reasoningSummary: `Mock Samy generation created from prompt: ${input.prompt}`,
      totalCost: 0,
      trace: ["Mock Samy transport used."]
    });
  }
  async runWorkflow(input, onProgress) {
    const progressEvents = [
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_start",
        status: "queued",
        message: "Node queued for execution.",
        timestamp: "2026-04-05T10:00:00.000Z"
      },
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_start",
        status: "running",
        message: "Node execution started.",
        timestamp: "2026-04-05T10:00:01.000Z"
      },
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_complete",
        status: "success",
        message: "Prompt enhanced with google/gemini-2.5-flash.",
        completedNodeCount: 1,
        totalNodeCount: 4,
        timestamp: "2026-04-05T10:00:02.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_start",
        status: "queued",
        message: "Node queued for execution.",
        timestamp: "2026-04-05T10:00:03.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_start",
        status: "running",
        message: "Node execution started.",
        timestamp: "2026-04-05T10:00:04.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_complete",
        status: "success",
        message: "Image generated with nano-banana-2.",
        completedNodeCount: 2,
        totalNodeCount: 4,
        timestamp: "2026-04-05T10:00:05.000Z"
      }
    ];
    for (const event of progressEvents) {
      onProgress?.(event);
      await new Promise((r) => setTimeout(r, 150));
    }
    return import_workflowRun.WorkflowExecutionResultSchema.parse({
      run: {
        runId: `mock-run-${input.projectId}-${input.workflowId}`,
        workflowName: "Mock Samy Workflow",
        artifactCount: 2,
        executedNodeCount: 4,
        warnings: [],
        artifacts: [
          {
            nodeId: "node_prompt_enhancer_starter",
            nodeType: "promptEnhancer",
            label: "Prompt Enhancer",
            kind: "text",
            text: "A premium editorial product shot, clean composition, luxury lighting.",
            modelId: "google/gemini-2.5-flash",
            prompt: "Enhance the prompt"
          },
          {
            nodeId: "node_image_model_starter",
            nodeType: "imageModel",
            label: "Nano Banana 2",
            kind: "image",
            url: "https://example.com/mock-generated-image.png",
            mimeType: "image/png",
            modelId: "nano-banana-2",
            prompt: "A premium editorial product shot, clean composition, luxury lighting.",
            data: {
              outputFormat: "png",
              resolution: "1K"
            }
          }
        ]
      },
      progressEvents,
      summary: {
        executedNodeCount: 4,
        artifactCount: 2,
        warningCount: 0
      }
    });
  }
  async listWorkflows(input) {
    return import_catalog.WorkflowListResultSchema.parse({
      projectId: input.projectId,
      workflowCount: 2,
      workflows: [
        {
          workflowId: "default",
          name: "Main Workflow",
          updatedAt: "2026-04-04T10:00:00.000Z",
          lastExecutedAt: "2026-04-04T09:45:00.000Z",
          appConfigEnabled: true
        },
        {
          workflowId: "editorial-variant",
          name: "Editorial Variant",
          updatedAt: "2026-04-03T18:30:00.000Z",
          lastExecutedAt: null,
          appConfigEnabled: false
        }
      ]
    });
  }
  async listTemplates() {
    return import_catalog.TemplateListResultSchema.parse({
      templateCount: 2,
      templates: [
        {
          templateId: "template-editorial-premium",
          title: "Premium Editorial Template",
          description: "Editorial pipeline with prompt enhancer and image model.",
          thumbnailUrl: "https://example.com/template-editorial-premium.png",
          creatorName: "BEEMM Team",
          creatorPhotoUrl: null,
          status: "approved",
          includesGeneratedData: false,
          createdAt: "2026-04-01T09:00:00.000Z",
          updatedAt: "2026-04-02T12:00:00.000Z"
        },
        {
          templateId: "template-product-campaign",
          title: "Product Campaign Template",
          description: "Product visual generation flow for campaign variants.",
          thumbnailUrl: "https://example.com/template-product-campaign.png",
          creatorName: "BEEMM Team",
          creatorPhotoUrl: null,
          status: "approved",
          includesGeneratedData: false,
          createdAt: "2026-03-29T14:00:00.000Z",
          updatedAt: "2026-04-01T11:00:00.000Z"
        }
      ]
    });
  }
  async getTemplate(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: "template-catalog",
      workflowId: input.templateId
    });
    return import_catalog.TemplateGetResultSchema.parse({
      template: {
        templateId: input.templateId,
        title: "Premium Editorial Template",
        description: "Editorial pipeline with prompt enhancer and image model.",
        thumbnailUrl: "https://example.com/template-editorial-premium.png",
        creatorName: "BEEMM Team",
        creatorPhotoUrl: null,
        status: "approved",
        includesGeneratedData: false,
        createdAt: "2026-04-01T09:00:00.000Z",
        updatedAt: "2026-04-02T12:00:00.000Z"
      },
      portableWorkflow: {
        ...portableWorkflow,
        workflow: {
          ...portableWorkflow.workflow,
          name: "Premium Editorial Template"
        }
      }
    });
  }
  async duplicateTemplate(input) {
    return import_catalog.TemplateDuplicateResultSchema.parse({
      templateId: input.templateId,
      projectId: "mock-duplicated-project",
      workflowId: "default",
      projectName: "Copy of Premium Editorial Template",
      workflowName: "Main Workflow"
    });
  }
  async listProjects(input) {
    const allProjects = [
      {
        projectId: "mock-workflow-project",
        name: "Premium Editorial Project",
        type: "workflow",
        ownerId: "mock-user",
        ownerName: "Mock User",
        updatedAt: "2026-04-05T10:00:00.000Z",
        lastOpenedAt: "2026-04-05T09:45:00.000Z"
      },
      {
        projectId: "mock-board-project",
        name: "Campaign Board",
        type: "board",
        ownerId: "mock-user",
        ownerName: "Mock User",
        updatedAt: "2026-04-04T18:00:00.000Z",
        lastOpenedAt: "2026-04-04T17:30:00.000Z"
      }
    ];
    const filteredProjects = input.type ? allProjects.filter((project) => project.type === input.type) : allProjects;
    return import_catalog.ProjectListResultSchema.parse({
      projectCount: filteredProjects.length,
      projects: filteredProjects
    });
  }
  async getCredits() {
    return 1e3;
  }
  async renameWorkflow(input) {
    return { ok: true };
  }
  async createProject(input) {
    const projectId = `mock-project-${Date.now()}`;
    return { projectId, name: input.name };
  }
};

// src/commands/config.ts
var ConfigRawOptionsSchema = z2.object({
  functionsBaseUrl: z2.string().optional(),
  appBaseUrl: z2.string().optional(),
  functionsBaseURL: z2.string().optional(),
  appBaseURL: z2.string().optional()
});
var ConfigSetOptionsSchema = z2.object({
  functionsBaseUrl: z2.string().url().optional(),
  appBaseUrl: z2.string().url().optional()
});
var ConfigShowOptionsSchema = z2.object({}).passthrough();
var readLongOptionValue = (argv, optionName) => {
  const exactToken = `--${optionName}`;
  const prefixedToken = `${exactToken}=`;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === exactToken) {
      const next = argv[index + 1];
      if (next && !next.startsWith("--")) {
        return next;
      }
      return void 0;
    }
    if (token.startsWith(prefixedToken)) {
      return token.slice(prefixedToken.length);
    }
  }
  return void 0;
};
var configShowHandler = async (_options, context) => {
  const storedConfig = loadVisionboardCliConfig(context.env);
  console.log("[config.show] Loaded CLI configuration");
  return {
    configFilePath: getVisionboardConfigFilePath(context.env),
    storedConfig,
    effective: {
      functionsBaseUrl: context.runtimeConfig.functionsBaseUrl || null,
      functionsBaseUrlSource: context.runtimeConfig.functionsBaseUrlSource,
      appBaseUrl: context.runtimeConfig.appBaseUrl,
      appBaseUrlSource: context.runtimeConfig.appBaseUrlSource,
      currentProjectId: context.runtimeConfig.currentProjectId || null,
      firebaseIdTokenSource: context.runtimeConfig.firebaseIdTokenSource
    }
  };
};
var registerConfigCommands = (program, context) => {
  const configCommand = program.command("config").description("Manage persistent CLI configuration");
  configCommand.command("show").description("Show stored and effective CLI configuration").action(
    createCommandAction({
      context,
      commandName: "config.show",
      schema: ConfigShowOptionsSchema,
      handler: configShowHandler
    })
  );
  configCommand.command("set").description("Persist app/functions URLs for deployed usage").option("--functions-base-url <url>", "Callable Functions base URL").option("--app-base-url <url>", "App base URL used by browser auth").action(async (rawOptions) => {
    context.commandName = "config.set";
    context.transport = new MockWorkflowTransport();
    const raw = ConfigRawOptionsSchema.parse({
      ...rawOptions,
      functionsBaseUrl: readLongOptionValue(process.argv, "functions-base-url") ?? rawOptions.functionsBaseUrl,
      appBaseUrl: readLongOptionValue(process.argv, "app-base-url") ?? rawOptions.appBaseUrl
    });
    const normalized = {
      functionsBaseUrl: raw.functionsBaseUrl || raw.functionsBaseURL,
      appBaseUrl: raw.appBaseUrl || raw.appBaseURL
    };
    if (!normalized.functionsBaseUrl && !normalized.appBaseUrl) {
      throw new CliError({
        type: "validation_error",
        message: "config set requires at least one of --functions-base-url or --app-base-url.",
        exitCode: EXIT_CODES.VALIDATION
      });
    }
    const parsedOptions = ConfigSetOptionsSchema.parse(normalized);
    const configFilePath = writeVisionboardCliConfig(parsedOptions, context.env);
    const rawFile = readFileSync3(configFilePath, "utf8");
    console.log(`[config.set] Updated CLI configuration in ${configFilePath}`);
    context.response = createSuccessResponse("config.set", {
      configFilePath,
      storedConfig: JSON.parse(rawFile)
    }, context.output.logs);
  });
};

// src/commands/doctor.ts
import { z as z3 } from "zod";
var DoctorOptionsSchema = z3.object({
  fix: z3.boolean().optional().default(false)
});
var detectJava = async () => {
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    const result = await execFileAsync("java", ["-version"]);
    return {
      available: true,
      details: (result.stderr || result.stdout || "").trim()
    };
  } catch (error) {
    return {
      available: false,
      details: error instanceof Error ? error.message : "java -version failed"
    };
  }
};
var doctorHandler = async (options, context) => {
  const java = await detectJava();
  const tokenAudience = context.runtimeConfig.firebaseIdToken ? getFirebaseTokenAudience(context.runtimeConfig.firebaseIdToken) : void 0;
  const tokenInspection = (() => {
    const token = context.runtimeConfig.firebaseIdToken;
    if (!token) {
      return {
        present: false,
        validFormat: false,
        message: "Missing Firebase ID token for callable transport."
      };
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        present: true,
        validFormat: false,
        message: "Firebase ID token is present but malformed or truncated; expected a JWT with 3 segments. A header-only token like eyJ... is not usable."
      };
    }
    return {
      present: true,
      validFormat: true,
      message: `Firebase ID token configured via ${context.runtimeConfig.firebaseIdTokenSource}.`
    };
  })();
  const callableConfigured = Boolean(
    context.runtimeConfig.functionsBaseUrl && tokenInspection.validFormat
  );
  const checks = [
    {
      id: "transport-resolution",
      ok: true,
      message: `Resolved transport: ${context.transport.kind}`
    },
    {
      id: "functions-base-url",
      ok: Boolean(context.runtimeConfig.functionsBaseUrl),
      message: context.runtimeConfig.functionsBaseUrl ? `Functions base URL configured via ${context.runtimeConfig.functionsBaseUrlSource}: ${context.runtimeConfig.functionsBaseUrl}` : "Missing Functions base URL for callable transport."
    },
    {
      id: "app-base-url",
      ok: Boolean(context.runtimeConfig.appBaseUrl),
      message: `Browser auth app base URL via ${context.runtimeConfig.appBaseUrlSource}: ${context.runtimeConfig.appBaseUrl}`
    },
    {
      id: "firebase-id-token",
      ok: tokenInspection.validFormat,
      message: tokenInspection.message
    },
    {
      id: "firebase-token-audience",
      ok: Boolean(tokenAudience),
      message: tokenAudience ? `Firebase ID token audience: ${tokenAudience}` : "Firebase ID token audience unavailable."
    },
    {
      id: "callable-ready",
      ok: callableConfigured,
      message: callableConfigured ? "Callable transport prerequisites are present." : "Callable transport prerequisites are incomplete."
    },
    {
      id: "current-project",
      ok: Boolean(context.runtimeConfig.currentProjectId),
      message: context.runtimeConfig.currentProjectId ? `Current project configured: ${context.runtimeConfig.currentProjectId}` : "No current project configured; use `project use --project-id <id>` to avoid repeating it."
    },
    {
      id: "backend-mode",
      ok: true,
      message: context.runtimeConfig.functionsBaseUrl?.includes("127.0.0.1") || context.runtimeConfig.functionsBaseUrl?.includes("localhost") ? "Callable backend target appears to be local/emulator." : "Callable backend target appears to be remote/cloud or not configured."
    },
    {
      id: "java-runtime",
      ok: java.available,
      message: java.available ? "Java runtime detected for Firebase Firestore emulator." : "Java runtime missing; Firestore emulator and emulator integration tests will fail.",
      details: java.details
    }
  ];
  const fixesApplied = [];
  if (options.fix) {
    if (!context.runtimeConfig.appBaseUrl || context.runtimeConfig.appBaseUrlSource === "default") {
      const defaultAppUrl = "https://beemm-vision.netlify.app";
      writeVisionboardCliConfig({ appBaseUrl: defaultAppUrl }, context.env);
      fixesApplied.push(`Set default app-base-url to ${defaultAppUrl}`);
      console.log(`[doctor.fix] Set default app-base-url to ${defaultAppUrl}`);
    }
    if (!context.runtimeConfig.currentProjectId) {
      console.log("[doctor.fix] No current project configured. Use `project use --project-id <id>` to set one.");
    }
    if (!context.runtimeConfig.functionsBaseUrl) {
      console.log("[doctor.fix] Functions base URL is missing. Set it with `config set --functions-base-url <url>` for callable transport.");
    }
    if (!context.runtimeConfig.firebaseIdToken) {
      console.log("[doctor.fix] Firebase ID token is missing. Use `auth login` to authenticate.");
    }
  }
  checks.forEach((check) => {
    console.log(`[doctor] ${check.ok ? "OK" : "FAIL"} ${check.id}: ${check.message}`);
  });
  if (options.fix && fixesApplied.length > 0) {
    console.log(`[doctor] ${fixesApplied.length} fix(es) applied.`);
  }
  return {
    transport: context.transport.kind,
    callableConfigured,
    checks,
    fixesApplied
  };
};
var registerDoctorCommand = (program, context) => {
  program.command("doctor").description("Inspect CLI runtime prerequisites and emulator readiness").option("--fix", "Attempt to automatically fix common configuration issues").action(
    createCommandAction({
      context,
      commandName: "doctor",
      schema: DoctorOptionsSchema,
      handler: doctorHandler
    })
  );
};

// src/commands/project.ts
import { z as z5 } from "zod";

// src/core/localProject.ts
import { existsSync as existsSync3, mkdirSync as mkdirSync3, readFileSync as readFileSync4, rmSync as rmSync2, writeFileSync as writeFileSync3 } from "node:fs";
import { dirname as dirname3, join as join3 } from "node:path";
import { homedir as homedir3 } from "node:os";
var resolveConfigHome3 = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join3(env.HOME, ".config");
  }
  return join3(homedir3(), ".config");
};
var getVisionboardProjectFilePath = (env = process.env) => {
  if (env.VISIONBOARD_PROJECT_FILE && env.VISIONBOARD_PROJECT_FILE.trim()) {
    return env.VISIONBOARD_PROJECT_FILE;
  }
  return join3(resolveConfigHome3(env), "visionboard", "project.json");
};
var loadStoredProjectId = (env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  if (!existsSync3(projectFilePath)) {
    return void 0;
  }
  try {
    const raw = readFileSync4(projectFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed.projectId === "string" && parsed.projectId.trim() ? parsed.projectId.trim() : void 0;
  } catch {
    return void 0;
  }
};
var storeProjectId = (projectId, env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  mkdirSync3(dirname3(projectFilePath), { recursive: true });
  writeFileSync3(
    projectFilePath,
    `${JSON.stringify({ projectId, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, null, 2)}
`,
    "utf8"
  );
  return projectFilePath;
};
var clearStoredProjectId = (env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  rmSync2(projectFilePath, { force: true });
  return projectFilePath;
};

// src/commands/project/create.ts
import { z as z4 } from "zod";
var ProjectCreateOptionsSchema = z4.object({
  name: z4.string().min(1, "Project name is required"),
  setAsCurrent: z4.boolean().default(true)
});
var projectCreateHandler = async (options, context) => {
  const result = await context.transport.createProject({ name: options.name });
  if (options.setAsCurrent && result.projectId) {
    storeProjectId(result.projectId, context.env);
  }
  if (!context.json) {
    context.output.writeHuman(`\u2705 Project created: "${result.name}" (${result.projectId})
`);
    if (options.setAsCurrent) {
      context.output.writeHuman(`   Set as current project.
`);
    }
  }
  return {
    projectId: result.projectId,
    name: result.name,
    setAsCurrent: options.setAsCurrent,
    transport: context.transport.kind
  };
};
var registerProjectCreateCommand = (projectCommand, context) => {
  projectCommand.command("create").description("Create a new project").requiredOption("--name <name>", "Name of the new project").option("--no-set-as-current", "Do not set the new project as the current project").action(
    createCommandAction({
      context,
      commandName: "project.create",
      schema: ProjectCreateOptionsSchema,
      handler: projectCreateHandler
    })
  );
};

// src/commands/project.ts
var ProjectListOptionsSchema = z5.object({
  type: z5.enum(["board", "workflow"]).optional()
});
var ProjectUseOptionsSchema = z5.object({ projectId: z5.string().min(1, "projectId is required") });
var ProjectCurrentOptionsSchema = z5.object({}).passthrough();
var projectListHandler = async (options, context) => {
  const rawResult = await context.transport.listProjects({ type: options.type });
  const result = import_catalog.ProjectListResultSchema.parse(rawResult);
  if (!context.json) {
    if (result.projectCount === 0) {
      context.output.writeHuman("No projects found.\n");
    } else {
      context.output.writeHuman(`Found ${result.projectCount} project(s):
`);
      result.projects.forEach((project) => {
        const current = context.runtimeConfig.currentProjectId === project.projectId ? " (current)" : "";
        context.output.writeHuman(`  ${project.projectId} - ${project.name}${current}
`);
      });
    }
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var projectCurrentHandler = async (_options, context) => {
  const projectId = loadStoredProjectId(context.env) || null;
  console.log(`[project.current] ${projectId ? "Current project loaded" : "No current project configured"}`);
  return {
    projectId,
    projectFilePath: getVisionboardProjectFilePath(context.env)
  };
};
var registerProjectCommands = (program, context) => {
  const projectCommand = program.command("project").description("List and manage the current project context");
  registerProjectCreateCommand(projectCommand, context);
  projectCommand.command("list").description("List accessible projects").option("--type <type>", "Filter by project type (board|workflow)").action(
    createCommandAction({
      context,
      commandName: "project.list",
      schema: ProjectListOptionsSchema,
      handler: projectListHandler
    })
  );
  projectCommand.command("use").description("Store the current project id locally").requiredOption("--project-id <projectId>", "Project identifier").action(async (rawOptions) => {
    context.commandName = "project.use";
    const parsedOptions = ProjectUseOptionsSchema.parse(rawOptions);
    const projectFilePath = storeProjectId(parsedOptions.projectId, context.env);
    console.log(`[project.use] Current project stored in ${projectFilePath}`);
    context.response = createSuccessResponse("project.use", {
      projectId: parsedOptions.projectId,
      projectFilePath
    }, context.output.logs);
  });
  projectCommand.command("current").description("Read the current stored project context").action(
    createCommandAction({
      context,
      commandName: "project.current",
      schema: ProjectCurrentOptionsSchema,
      handler: projectCurrentHandler
    })
  );
  projectCommand.command("clear").description("Clear the stored project context").action(async () => {
    context.commandName = "project.clear";
    const projectFilePath = clearStoredProjectId(context.env);
    console.log(`[project.clear] Cleared current project from ${projectFilePath}`);
    context.response = createSuccessResponse("project.clear", {
      cleared: true,
      projectFilePath
    }, context.output.logs);
  });
};

// src/commands/template.ts
import { z as z6 } from "zod";
var TemplateListOptionsSchema = z6.object({}).passthrough();
var TemplateGetOptionsSchema = z6.object({ templateId: z6.string().min(1, "templateId is required") });
var TemplateCloneOptionsSchema = z6.object({ templateId: z6.string().min(1, "templateId is required") });
var templateListHandler = async (_options, context) => {
  const result = import_catalog.TemplateListResultSchema.parse(await context.transport.listTemplates());
  console.log(`[template.list] ${context.transport.kind} listed templates`);
  if (context.transport.kind === "callable" && result.templateCount === 0) {
    console.log("[template.list] No approved templates were returned by the callable backend. Seed templates in Firestore or switch to mock transport for local contract testing.");
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var templateGetHandler = async (options, context) => {
  const result = import_catalog.TemplateGetResultSchema.parse(
    await context.transport.getTemplate({ templateId: options.templateId })
  );
  console.log(`[template.get] ${context.transport.kind} fetched template ${options.templateId}`);
  return {
    transport: context.transport.kind,
    ...result
  };
};
var templateCloneHandler = async (options, context) => {
  const result = import_catalog.TemplateDuplicateResultSchema.parse(
    await context.transport.duplicateTemplate({ templateId: options.templateId })
  );
  console.log(`[template.clone] ${context.transport.kind} duplicated template ${options.templateId}`);
  return {
    transport: context.transport.kind,
    ...result
  };
};
var registerTemplateCommands = (program, context) => {
  const templateCommand = program.command("template").description("List, inspect, and duplicate workflow templates");
  templateCommand.command("list").description("List available community templates").action(
    createCommandAction({
      context,
      commandName: "template.list",
      schema: TemplateListOptionsSchema,
      handler: templateListHandler
    })
  );
  templateCommand.command("get").description("Fetch a template and its portable workflow document").requiredOption("--template-id <templateId>", "Template identifier").action(
    createCommandAction({
      context,
      commandName: "template.get",
      schema: TemplateGetOptionsSchema,
      handler: templateGetHandler
    })
  );
  templateCommand.command("clone").description("Duplicate a community template into a new workflow project").requiredOption("--template-id <templateId>", "Template identifier").action(
    createCommandAction({
      context,
      commandName: "template.clone",
      schema: TemplateCloneOptionsSchema,
      handler: templateCloneHandler
    })
  );
};

// src/commands/workflow/duplicate.ts
import { z as z7 } from "zod";

// src/core/projectResolver.ts
var resolveProjectIdOrThrow = (explicitProjectId, currentProjectId) => {
  const projectId = explicitProjectId || currentProjectId;
  if (!projectId) {
    throw new CliError({
      type: "validation_error",
      message: "projectId is required. Use --project-id or configure a current project with `project use`.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  return projectId;
};

// src/commands/workflow/duplicate.ts
var WorkflowDuplicateOptionsSchema = z7.object({
  projectId: z7.string().min(1).optional(),
  workflowId: z7.string().min(1, "workflowId is required"),
  name: z7.string().min(1).optional()
});
var workflowDuplicateHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const exportedWorkflow = await context.transport.exportWorkflow({
    projectId,
    workflowId: options.workflowId
  });
  const newName = options.name || `${exportedWorkflow.workflow.name} (Copy)`;
  const newWorkflowId = `wf-${Date.now()}`;
  const result = await context.transport.importWorkflow({
    projectId,
    workflowId: newWorkflowId,
    payload: {
      ...exportedWorkflow,
      workflow: {
        ...exportedWorkflow.workflow,
        name: newName
      }
    }
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Workflow duplicated: ${newName}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   New workflow id: ${newWorkflowId}
`);
    context.output.writeHuman(`   Nodes: ${result.importedNodeCount} | Edges: ${result.importedEdgeCount}

`);
  }
  return {
    projectId,
    sourceWorkflowId: options.workflowId,
    newWorkflowId,
    newName,
    transport: context.transport.kind,
    ...result
  };
};
var registerWorkflowDuplicateCommand = (workflowCommand, context) => {
  workflowCommand.command("duplicate").description("Duplicate an existing workflow into a new one").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Source workflow identifier to duplicate").option("--name <name>", 'Name for the duplicated workflow (default: original name + " (Copy)")').action(
    createCommandAction({
      context,
      commandName: "workflow.duplicate",
      schema: WorkflowDuplicateOptionsSchema,
      handler: workflowDuplicateHandler
    })
  );
};

// src/commands/workflow/export.ts
import { dirname as dirname4, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { z as z8 } from "zod";
var WorkflowExportOptionsSchema = z8.object({
  projectId: z8.string().min(1).optional(),
  workflowId: z8.string().min(1, "workflowId is required"),
  output: z8.string().min(1).optional()
});
var persistPortableWorkflow = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve(outputPath);
  await mkdir(dirname4(resolvedPath), { recursive: true });
  await writeFile(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowExportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const portableWorkflow = import_portableWorkflow.PortableWorkflowExportSchema.parse(
    await context.transport.exportWorkflow({
      projectId,
      workflowId: options.workflowId
    })
  );
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow(options.output, portableWorkflow);
  }
  console.log(`[workflow.export] ${context.transport.kind} export completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.export] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    outputPath,
    portableWorkflow
  };
};
var registerWorkflowExportCommand = (workflowCommand, context) => {
  workflowCommand.command("export").description("Export a BEEMM-JAM portable workflow document").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").option("--output <path>", "Write the portable workflow JSON to a file").action(
    createCommandAction({
      context,
      commandName: "workflow.export",
      schema: WorkflowExportOptionsSchema,
      handler: workflowExportHandler
    })
  );
};

// src/commands/workflow/generateImportRun.ts
import { mkdir as mkdir2, writeFile as writeFile2 } from "node:fs/promises";
import { dirname as dirname5, resolve as resolve2 } from "node:path";
import { z as z9 } from "zod";
var WorkflowGenerateImportRunOptionsSchema = z9.object({
  projectId: z9.string().min(1).optional(),
  workflowId: z9.string().min(1, "workflowId is required"),
  prompt: z9.string().min(1, "prompt is required"),
  workflowName: z9.string().min(1).optional(),
  assistantMode: z9.string().min(1).optional(),
  stylePreset: z9.string().min(1).optional(),
  generationStrategy: z9.string().min(1).optional(),
  priorQuestionRounds: z9.number().int().nonnegative().optional(),
  answersJson: z9.string().min(2).optional(),
  output: z9.string().min(1).optional()
});
var parseAnswersJson = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    normalized[key] = typeof value === "string" || typeof value === "boolean" || value === null ? value : String(value);
  }
  return normalized;
};
var persistPortableWorkflow2 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve2(outputPath);
  await mkdir2(dirname5(resolvedPath), { recursive: true });
  await writeFile2(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowGenerateImportRunHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson(options.answersJson);
  const generation = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  if (generation.kind !== "workflow") {
    console.log(`[workflow.generate-import-run] ${context.transport.kind} generation requires clarification for ${projectId}/${options.workflowId}`);
    return {
      projectId,
      workflowId: options.workflowId,
      transport: context.transport.kind,
      imported: false,
      executed: false,
      response: generation
    };
  }
  const importResult = await context.transport.importWorkflow({
    projectId,
    workflowId: options.workflowId,
    payload: generation.portableWorkflow
  });
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow2(options.output, generation.portableWorkflow);
  }
  let runResult;
  const spinner = context.json ? null : context.output.createSpinner({ text: `Running workflow ${projectId}/${options.workflowId}...` });
  try {
    runResult = await context.transport.runWorkflow(
      {
        projectId,
        workflowId: options.workflowId
      },
      (event) => {
        if (!context.json && spinner) {
          const totalNodes = event.totalNodeCount || 0;
          if (event.step === "node_start") {
            const comp = event.completedNodeCount ?? 0;
            const displayTotal = totalNodes > 0 ? totalNodes : "?";
            spinner.update(`[${comp}/${displayTotal}] ${event.label}...`);
          }
        }
      }
    );
    if (!context.json && spinner) {
      spinner.stop(`Workflow run finished (${runResult.summary.artifactCount} artifact(s)).`);
    }
  } finally {
    if (spinner) {
      spinner.stop();
    }
  }
  console.log(`[workflow.generate-import-run] ${context.transport.kind} generation, import, and run completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.generate-import-run] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    imported: true,
    executed: true,
    outputPath,
    generation,
    import: importResult,
    run: runResult
  };
};
var registerWorkflowGenerateImportRunCommand = (workflowCommand, context) => {
  workflowCommand.command("generate-import-run").description("Generate a workflow, import it, then run it when supported by the transport").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode").option("--style-preset <preset>", "Style preset").option("--generation-strategy <strategy>", "Generation strategy").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").option("--output <path>", "Write the generated workflow JSON to a file before import").action(
    createCommandAction({
      context,
      commandName: "workflow.generate-import-run",
      schema: WorkflowGenerateImportRunOptionsSchema,
      handler: workflowGenerateImportRunHandler
    })
  );
};

// src/commands/workflow/generateAndImport.ts
import { mkdir as mkdir3, writeFile as writeFile3 } from "node:fs/promises";
import { dirname as dirname6, resolve as resolve3 } from "node:path";
import { z as z10 } from "zod";
var WorkflowGenerateAndImportOptionsSchema = z10.object({
  projectId: z10.string().min(1).optional(),
  workflowId: z10.string().min(1, "workflowId is required"),
  prompt: z10.string().min(1, "prompt is required"),
  workflowName: z10.string().min(1).optional(),
  assistantMode: z10.string().min(1).optional(),
  stylePreset: z10.string().min(1).optional(),
  generationStrategy: z10.string().min(1).optional(),
  priorQuestionRounds: z10.number().int().nonnegative().optional(),
  answersJson: z10.string().min(2).optional(),
  output: z10.string().min(1).optional()
});
var parseAnswersJson2 = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    normalized[key] = typeof value === "string" || typeof value === "boolean" || value === null ? value : String(value);
  }
  return normalized;
};
var persistPortableWorkflow3 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve3(outputPath);
  await mkdir3(dirname6(resolvedPath), { recursive: true });
  await writeFile3(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowGenerateAndImportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson2(options.answersJson);
  const response = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  if (response.kind !== "workflow") {
    console.log(`[workflow.generate-and-import] ${context.transport.kind} generation requires clarification for ${projectId}/${options.workflowId}`);
    return {
      projectId,
      workflowId: options.workflowId,
      transport: context.transport.kind,
      imported: false,
      response
    };
  }
  const importResult = await context.transport.importWorkflow({
    projectId,
    workflowId: options.workflowId,
    payload: response.portableWorkflow
  });
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow3(options.output, response.portableWorkflow);
  }
  console.log(`[workflow.generate-and-import] ${context.transport.kind} generation and import completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.generate-and-import] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    imported: true,
    outputPath,
    generation: response,
    import: importResult
  };
};
var registerWorkflowGenerateAndImportCommand = (workflowCommand, context) => {
  workflowCommand.command("generate-and-import").description("Generate a portable workflow through Samy and immediately import it").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode").option("--style-preset <preset>", "Style preset").option("--generation-strategy <strategy>", "Generation strategy").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").option("--output <path>", "Write the generated workflow JSON to a file before/after import").action(
    createCommandAction({
      context,
      commandName: "workflow.generate-and-import",
      schema: WorkflowGenerateAndImportOptionsSchema,
      handler: workflowGenerateAndImportHandler
    })
  );
};

// src/commands/workflow/import.ts
import { readFile } from "node:fs/promises";
import { resolve as resolve4 } from "node:path";
import { z as z11 } from "zod";
var WorkflowImportOptionsSchema = z11.object({
  projectId: z11.string().min(1).optional(),
  workflowId: z11.string().min(1).optional(),
  input: z11.string().min(1, "input is required"),
  append: z11.boolean().default(false),
  mode: z11.enum(["replace", "append"]).default("replace"),
  force: z11.boolean().default(false),
  name: z11.string().min(1).optional()
});
var loadPortableWorkflowFromFile = async (inputPath) => {
  const resolvedPath = resolve4(inputPath);
  let raw;
  try {
    raw = await readFile(resolvedPath, "utf8");
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: `Unable to read input file: ${resolvedPath}`,
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: `Input file is not valid JSON: ${resolvedPath}`,
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  return {
    resolvedPath,
    portableWorkflow: import_portableWorkflow.PortableWorkflowExportSchema.parse(parsed)
  };
};
var calculateWorkflowBounds = (nodes) => {
  if (nodes.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, centerX: 0, centerY: 0, width: 0, height: 0 };
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const node of nodes) {
    const x = node.position?.x ?? 0;
    const y = node.position?.y ?? 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const width = maxX - minX;
  const height = maxY - minY;
  return { minX, maxX, minY, maxY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2, width, height };
};
var calculateSmartAppendOffset = (existingBounds, importBounds) => {
  const gap = 150;
  const isWide = existingBounds.width > existingBounds.height;
  const isImportWide = importBounds.width > importBounds.height;
  if (isWide) {
    return { x: existingBounds.centerX + existingBounds.width / 2 + gap, y: existingBounds.centerY };
  }
  if (isImportWide) {
    return { x: existingBounds.centerX, y: existingBounds.centerY + existingBounds.height / 2 + gap };
  }
  return { x: existingBounds.centerX, y: existingBounds.centerY + existingBounds.height / 2 + gap };
};
var workflowImportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const { resolvedPath, portableWorkflow } = await loadPortableWorkflowFromFile(options.input);
  const workflowName = options.name || portableWorkflow.workflow.name || "Imported Workflow";
  let targetWorkflowId = options.workflowId;
  let importMode = options.append ? "append" : options.mode;
  let createdNewWorkflow = false;
  let positionOffset;
  if (!targetWorkflowId && importMode !== "append") {
    targetWorkflowId = `imported-${Date.now()}`;
    importMode = "replace";
    createdNewWorkflow = true;
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Workflow: ${workflowName}
`);
      context.output.writeHuman(`   Nodes: ${portableWorkflow.nodes.length} | Edges: ${portableWorkflow.edges.length}

`);
      context.output.writeHuman(`Creating new workflow "${workflowName}" (id: ${targetWorkflowId})...
`);
    }
  } else if (!targetWorkflowId && importMode === "append") {
    targetWorkflowId = "default";
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Appending to workflow "default"...
`);
      context.output.writeHuman(`   Nodes to add: ${portableWorkflow.nodes.length} | Edges to add: ${portableWorkflow.edges.length}

`);
    }
  } else if (targetWorkflowId && importMode !== "append" && !options.force) {
    if (!context.json) {
      context.output.writeHuman(`
\u26A0\uFE0F  Workflow "${targetWorkflowId}" already exists in project ${projectId}.
`);
      context.output.writeHuman(`   Importing will REPLACE its current content.

`);
      context.output.writeHuman(`   \u{1F4A1} To create a NEW workflow instead, omit --workflow-id
`);
      context.output.writeHuman(`   \u{1F4A1} To APPEND nodes beside existing ones, use --mode append
`);
      context.output.writeHuman(`   \u{1F4A1} To force replace without warning, use --force

`);
    }
  } else if (targetWorkflowId && importMode === "append") {
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Appending to workflow "${targetWorkflowId}"...
`);
      context.output.writeHuman(`   Nodes to add: ${portableWorkflow.nodes.length} | Edges to add: ${portableWorkflow.edges.length}

`);
    }
  }
  if (importMode === "append") {
    const importBounds = calculateWorkflowBounds(portableWorkflow.nodes);
    positionOffset = calculateSmartAppendOffset(
      { centerX: 0, centerY: 0, width: importBounds.width, height: importBounds.height },
      importBounds
    );
  }
  const result = await context.transport.importWorkflow({
    projectId,
    workflowId: targetWorkflowId,
    payload: {
      ...portableWorkflow,
      workflow: {
        ...portableWorkflow.workflow,
        name: workflowName
      }
    },
    importMode,
    positionOffset
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Import completed: ${workflowName}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   Workflow: ${targetWorkflowId}${createdNewWorkflow ? " (new)" : ""}
`);
    context.output.writeHuman(`   Mode: ${result.importMode}
`);
    context.output.writeHuman(`   Nodes: ${result.importedNodeCount} | Edges: ${result.importedEdgeCount}

`);
  }
  return {
    projectId,
    workflowId: targetWorkflowId,
    inputPath: resolvedPath,
    transport: context.transport.kind,
    createdNewWorkflow,
    ...result
  };
};
var registerWorkflowImportCommand = (workflowCommand, context) => {
  workflowCommand.command("import").description("Import a BEEMM-JAM portable workflow document").option("--project-id <projectId>", "Target project identifier").option("--workflow-id <workflowId>", "Target workflow identifier (omit to create new)").option("--name <name>", "Override the imported workflow name").option("--mode <mode>", "Import mode: replace or append", "replace").option("--append", "(Deprecated) Use --mode append instead").option("--force", "Skip confirmation when replacing an existing workflow").requiredOption("--input <path>", "Portable workflow JSON file").action(
    createCommandAction({
      context,
      commandName: "workflow.import",
      schema: WorkflowImportOptionsSchema,
      handler: workflowImportHandler
    })
  );
};

// src/commands/workflow/list.ts
import { z as z12 } from "zod";
var WorkflowListOptionsSchema = z12.object({
  projectId: z12.string().min(1).optional()
});
var workflowListHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const result = import_catalog.WorkflowListResultSchema.parse(
    await context.transport.listWorkflows({ projectId })
  );
  console.log(`[workflow.list] ${context.transport.kind} listed workflows for ${projectId}`);
  if (context.transport.kind === "callable" && result.workflowCount === 0) {
    console.log(`[workflow.list] No workflows were returned by the callable backend for ${projectId}. If you are targeting local emulators, verify this project and its workflows exist in emulator Firestore.`);
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var registerWorkflowListCommand = (workflowCommand, context) => {
  workflowCommand.command("list").description("List workflows for a project").option("--project-id <projectId>", "Target project identifier").action(
    createCommandAction({
      context,
      commandName: "workflow.list",
      schema: WorkflowListOptionsSchema,
      handler: workflowListHandler
    })
  );
};

// src/commands/workflow/rename.ts
import { z as z13 } from "zod";
var WorkflowRenameOptionsSchema = z13.object({
  projectId: z13.string().min(1).optional(),
  workflowId: z13.string().min(1, "workflowId is required"),
  name: z13.string().min(1, "name is required")
});
var workflowRenameHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  await context.transport.renameWorkflow({
    projectId,
    workflowId: options.workflowId,
    name: options.name
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Workflow renamed: "${options.name}"
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   Workflow ID: ${options.workflowId}
`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    newName: options.name,
    transport: context.transport.kind
  };
};
var registerWorkflowRenameCommand = (workflowCommand, context) => {
  workflowCommand.command("rename").description("Rename an existing workflow").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--name <name>", "New name for the workflow").action(
    createCommandAction({
      context,
      commandName: "workflow.rename",
      schema: WorkflowRenameOptionsSchema,
      handler: workflowRenameHandler
    })
  );
};

// src/commands/workflow/run.ts
import * as readline from "readline";
import { z as z14 } from "zod";

// src/transports/callableWorkflowTransport.ts
var isCallableErrorResponse = (payload) => {
  return Boolean(payload) && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "error");
};
var createFunctionsUrl = (baseUrl, functionName) => {
  const trimmedBaseUrl = baseUrl.replace(/\/+$/, "");
  if (/cloudfunctions\.net$/i.test(trimmedBaseUrl)) {
    return `${trimmedBaseUrl}/${functionName}`;
  }
  return `${trimmedBaseUrl}/${functionName}`;
};
var mapFunctionsErrorToCliError = (status, payload) => {
  const code = payload?.error?.code || "internal";
  const message = payload?.error?.message || `Functions transport failed with status ${status}.`;
  if (code === "unauthenticated" || code === "permission-denied") {
    return new CliError({
      type: "auth_error",
      message,
      exitCode: EXIT_CODES.AUTH,
      cause: payload
    });
  }
  if (code === "invalid-argument") {
    return new CliError({
      type: "validation_error",
      message,
      exitCode: EXIT_CODES.VALIDATION,
      cause: payload
    });
  }
  return new CliError({
    type: "api_error",
    message,
    exitCode: EXIT_CODES.API,
    cause: payload
  });
};
var mapCallableErrorToCliError = (status, payload) => {
  const code = payload?.error?.status || "INTERNAL";
  const message = payload?.error?.message || `Callable transport failed with status ${status}.`;
  if (code === "UNAUTHENTICATED" || code === "PERMISSION_DENIED") {
    return new CliError({
      type: "auth_error",
      message,
      exitCode: EXIT_CODES.AUTH,
      cause: payload
    });
  }
  if (code === "INVALID_ARGUMENT") {
    return new CliError({
      type: "validation_error",
      message,
      exitCode: EXIT_CODES.VALIDATION,
      cause: payload
    });
  }
  return new CliError({
    type: "api_error",
    message,
    exitCode: EXIT_CODES.API,
    cause: payload
  });
};
var CallableWorkflowTransport = class {
  constructor(baseUrl, firebaseIdToken, fetchImpl = fetch) {
    this.baseUrl = baseUrl;
    this.firebaseIdToken = firebaseIdToken;
    this.fetchImpl = fetchImpl;
  }
  baseUrl;
  firebaseIdToken;
  fetchImpl;
  kind = "callable";
  async exportWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "exportPortableWorkflow"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_portableWorkflow.PortableWorkflowExportSchema.parse(payload.portableWorkflow);
  }
  async importWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "importPortableWorkflow"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_portableWorkflow.WorkflowImportResultSchema.parse({
      importMode: payload.importMode,
      workflowName: payload.workflowName,
      importedNodeCount: payload.importedNodeCount,
      importedEdgeCount: payload.importedEdgeCount
    });
  }
  async generateWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "generateWorkflowWithSamy"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify({ data: input })
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || isCallableErrorResponse(payload)) {
      throw mapCallableErrorToCliError(response.status, payload);
    }
    return import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(payload.result);
  }
  async runWorkflow(input, onProgress) {
    if (onProgress) {
      const response2 = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "executeWorkflowPortable"), {
        method: "POST",
        headers: {
          Accept: "application/x-ndjson",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify({ ...input, stream: true, executionId: `cli-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` })
      });
      if (!response2.ok) {
        throw new CliError({
          type: "api_error",
          message: `Stream request failed with status ${response2.status}`,
          exitCode: EXIT_CODES.API
        });
      }
      if (!response2.body) {
        throw new CliError({
          type: "api_error",
          message: "Response body is empty",
          exitCode: EXIT_CODES.API
        });
      }
      const reader = response2.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.type === "progress") {
              onProgress(data.event);
            } else if (data.type === "result") {
              return import_workflowRun.WorkflowExecutionResultSchema.parse(data.data);
            } else if (data.type === "error") {
              throw new CliError({
                type: "api_error",
                message: data.error || "Unknown error during execution stream",
                exitCode: EXIT_CODES.API
              });
            }
          } catch (e) {
            if (e instanceof CliError) throw e;
          }
        }
      }
      throw new CliError({
        type: "api_error",
        message: "Stream ended without a final result",
        exitCode: EXIT_CODES.API
      });
    }
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "executeWorkflowPortable"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_workflowRun.WorkflowExecutionResultSchema.parse({
      run: payload.run,
      progressEvents: payload.progressEvents,
      summary: payload.summary
    });
  }
  async listWorkflows(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listProjectWorkflows"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_catalog.WorkflowListResultSchema.parse(payload);
  }
  async listTemplates() {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listCommunityTemplates"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify({})
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_catalog.TemplateListResultSchema.parse(payload);
  }
  async getTemplate(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "getCommunityTemplate"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_catalog.TemplateGetResultSchema.parse(payload);
  }
  async duplicateTemplate(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "duplicateCommunityTemplate"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_catalog.TemplateDuplicateResultSchema.parse(payload);
  }
  async listProjects(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listUserProjects"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw mapFunctionsErrorToCliError(response.status, payload);
    }
    return import_catalog.ProjectListResultSchema.parse(payload);
  }
  async getCredits() {
    try {
      const response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "getUserCredits"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify({})
      });
      const text = await response.text();
      const payload = JSON.parse(text);
      return payload?.credits ?? 0;
    } catch {
      return 0;
    }
  }
  async renameWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "renameWorkflow"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw new CliError({
        type: "api_error",
        message: payload?.error?.message || `Failed to rename workflow: ${response.statusText}`,
        exitCode: EXIT_CODES.API,
        cause: payload
      });
    }
    return { ok: true };
  }
  async createProject(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "createProject"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.firebaseIdToken}`
        },
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires a reachable Functions backend and a valid Firebase ID token.",
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok || !payload?.projectId) {
      throw new CliError({
        type: "api_error",
        message: payload?.error?.message || `Failed to create project: ${response.statusText}`,
        exitCode: EXIT_CODES.API,
        cause: payload
      });
    }
    return { projectId: payload.projectId, name: payload.name || input.name };
  }
};

// src/transports/resolveWorkflowTransport.ts
var resolveWorkflowTransport = (runtimeConfig) => {
  if (runtimeConfig.transportMode === "mock") {
    return new MockWorkflowTransport();
  }
  const hasCallableConfig = Boolean(runtimeConfig.functionsBaseUrl && runtimeConfig.firebaseIdToken);
  if (runtimeConfig.transportMode === "callable") {
    if (!runtimeConfig.functionsBaseUrl) {
      throw new CliError({
        type: "validation_error",
        message: "Callable transport requires --functions-base-url or VISIONBOARD_FUNCTIONS_BASE_URL.",
        exitCode: EXIT_CODES.VALIDATION
      });
    }
    if (!runtimeConfig.firebaseIdToken) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires --firebase-id-token or VISIONBOARD_FIREBASE_ID_TOKEN.",
        exitCode: EXIT_CODES.AUTH
      });
    }
    return new CallableWorkflowTransport(runtimeConfig.functionsBaseUrl, runtimeConfig.firebaseIdToken);
  }
  if (hasCallableConfig) {
    return new CallableWorkflowTransport(runtimeConfig.functionsBaseUrl, runtimeConfig.firebaseIdToken);
  }
  return new MockWorkflowTransport();
};

// src/core/pricing.ts
var roundCostUpToHundredth = (cost) => Math.ceil(cost * 100) / 100;
var AI_PRICING = {
  "nano-banana": { baseCost: 15, calculateCost: (inputs) => inputs.resolution === "4K" || inputs.resolution === "4k" ? 30 : 15 },
  "nano-banana-2": { baseCost: 8, calculateCost: (inputs) => inputs.resolution === "4K" || inputs.resolution === "4k" ? 16 : 8 },
  "nano-banana-pro": { baseCost: 15, calculateCost: (inputs) => inputs.resolution === "4K" || inputs.resolution === "4k" ? 30 : 15 },
  "nano-banana-pro-t2i": { baseCost: 15, calculateCost: (inputs) => inputs.resolution === "4K" || inputs.resolution === "4k" ? 30 : 15 },
  "nano-banana-2-t2i": { baseCost: 8, calculateCost: (inputs) => inputs.resolution === "4K" || inputs.resolution === "4k" ? 16 : 8 },
  "seedream": { baseCost: 4 },
  "seedream-lite": { baseCost: 3.5 },
  "kling": { baseCost: 2.8 },
  "kling-o3": { baseCost: 2.8, calculateCost: (inputs) => (inputs.resolution?.toLowerCase() === "4k" ? 5.6 : 2.8) * (parseInt(inputs.imageInputCount) || 1) },
  "reve": { baseCost: 4 },
  "reve-text": { baseCost: 4 },
  "qwen-max": { baseCost: 7.5 },
  "qwen-image-2": { baseCost: 3.5 },
  "qwen-image-2-pro": { baseCost: 7.5 },
  "qwen-image-2-pro-edit": { baseCost: 7.5 },
  "grok-edit": { baseCost: 2.2, calculateCost: (inputs) => 2.2 * (parseInt(inputs.imageInputCount) || 1) },
  "grok": { baseCost: 2 },
  "hunyuan": { baseCost: 9, calculateCost: (inputs) => {
    const r = inputs.resolution?.toLowerCase();
    return r === "4k" ? 144 : r === "2k" ? 36 : 9;
  } },
  "gpt-image-1-5": { baseCost: 2 },
  "gpt-image-1-5-edit": { baseCost: 2 },
  "flux-2-pro": { baseCost: 6 },
  "recraft-v4-vector": { baseCost: 8 },
  "ideogram-v3": { baseCost: 6, calculateCost: (inputs) => {
    const s = inputs.rendering_speed?.toUpperCase();
    return s === "TURBO" ? 3 : s === "QUALITY" ? 9 : 6;
  } },
  "ideogram-v3-t2i": { baseCost: 6, calculateCost: (inputs) => {
    const s = inputs.rendering_speed?.toUpperCase();
    return s === "TURBO" ? 3 : s === "QUALITY" ? 9 : 6;
  } },
  "ltx-video": { baseCost: 36 },
  "ltx-video-fast": { baseCost: 24 },
  "wan-video-flash": { baseCost: 25 },
  "grok-video": { baseCost: 42 },
  "bytedance-seedance-1.5-pro": { baseCost: 26 },
  "veo-3.1-fast": { baseCost: 120 },
  "google/gemini-2.5-flash": { baseCost: 2 },
  "anthropic/claude-sonnet-4.6": { baseCost: 4 },
  "anthropic/claude-sonnet-4.5": { baseCost: 4 },
  "openai/gpt-4o": { baseCost: 4 },
  "qwen/qwen3-vl-235b-a22b-instruct": { baseCost: 3.5 },
  "x-ai/grok-4-fast": { baseCost: 2 }
};
var calculateGenerationCost = (modelId, inputs = {}) => {
  const rule = AI_PRICING[modelId];
  if (!rule) return 1;
  if (rule.calculateCost) return rule.calculateCost(inputs);
  return rule.baseCost;
};

// src/commands/workflow/run.ts
var WorkflowRunOptionsSchema = z14.object({
  projectId: z14.string().min(1).optional(),
  workflowId: z14.string().min(1, "workflowId is required")
});
var formatCredits = (credits) => {
  return credits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
var statusIcon = (status) => {
  switch (status) {
    case "success":
      return "\u2713";
    case "running":
      return "\u27F3";
    case "failed":
      return "\u2717";
    case "skipped":
      return "\u2298";
    default:
      return " ";
  }
};
var promptConfirmation = async (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve6) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve6(answer.trim());
    });
  });
};
var estimateWorkflowCost = (workflow) => {
  let total = 0;
  for (const node of workflow.nodes) {
    if (node.type === "imageModel") {
      const modelId = String(node.inputs?.modelId || "seedream");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
    if (node.type === "anyLlm" || node.type === "imageDescriber") {
      const modelId = String(node.inputs?.model || node.inputs?.modelId || "google/gemini-2.5-flash");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
    if (node.type === "promptEnhancer") {
      const modelId = String(node.inputs?.model || "google/gemini-2.5-flash");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
  }
  return roundCostUpToHundredth(total);
};
var renderDashboard = (nodeStates, creditsInfo, workflowUrl, progress) => {
  const lines = [];
  lines.push("");
  lines.push(`\u256D\u2500${"\u2500".repeat(58)}\u2500\u256E`);
  lines.push(`\u2502  Credits: ${creditsInfo.padEnd(56)}\u2502`);
  lines.push(`\u2570\u2500${"\u2500".repeat(58)}\u2500\u256F`);
  lines.push("");
  lines.push(`\x1B[1mNode                    Status      Duration\x1B[0m`);
  lines.push("\u2500".repeat(45));
  for (const [, state] of nodeStates) {
    const icon = statusIcon(state.status);
    const status = state.status.toUpperCase().padEnd(11);
    const duration = state.duration || "-";
    const color = state.status === "running" ? "33m" : state.status === "success" ? "32m" : state.status === "failed" ? "31m" : "90m";
    lines.push(`[\x1B[${color}${icon}\x1B[0m] ${state.label.padEnd(20)} ${status} ${duration}`);
  }
  lines.push("");
  lines.push(`Progress: ${progress.completed}/${progress.total} nodes complete | ${progress.running} running | ${progress.queued} queued`);
  lines.push("");
  const isTTY = process.stdout.isTTY;
  if (isTTY) {
    process.stdout.write("\x1B[H\x1B[2J");
  }
  process.stdout.write(lines.join("\n"));
};
var renderFinalResults = (execution, metadata) => {
  const { run } = execution;
  const textArtifacts = run.artifacts.filter((a) => a.kind === "text");
  const imageArtifacts = run.artifacts.filter((a) => a.kind === "image");
  const videoArtifacts = run.artifacts.filter((a) => a.kind === "video");
  const lines = [];
  lines.push("");
  lines.push("\u256D\u2500" + "\u2500".repeat(58) + "\u2500\u256E");
  lines.push("\u2502  \x1B[32mWorkflow Complete!\x1B[0m" + " ".repeat(41) + "\u2502");
  const creditLine = metadata.creditsUsed !== void 0 ? `Credits used: ${formatCredits(metadata.creditsUsed)} | Remaining: ${formatCredits(metadata.remainingCredits || 0)}` : "";
  if (creditLine) {
    lines.push("\u2502  " + creditLine.padEnd(56) + "\u2502");
  }
  lines.push("\u2570\u2500" + "\u2500".repeat(58) + "\u2500\u256F");
  lines.push("");
  if (textArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F4DD} Text Outputs (" + textArtifacts.length + "):\x1B[0m");
    textArtifacts.forEach((a) => {
      const preview = a.text ? a.text.length > 120 ? a.text.substring(0, 120) + "..." : a.text : "(empty)";
      lines.push("  " + a.label + ' \u2192 "' + preview + '"');
    });
    lines.push("");
  }
  if (imageArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F5BC}\uFE0F  Image Outputs (" + imageArtifacts.length + "):\x1B[0m");
    imageArtifacts.forEach((a, i) => {
      lines.push("  " + (i + 1) + ". " + (a.url || "(no url)"));
    });
    lines.push("");
  }
  if (videoArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F3AC} Video Outputs (" + videoArtifacts.length + "):\x1B[0m");
    videoArtifacts.forEach((a, i) => {
      lines.push("  " + (i + 1) + ". " + (a.url || "(no url)"));
    });
    lines.push("");
  }
  if (run.warnings.length > 0) {
    lines.push("\x1B[33m\u26A0\uFE0F  Warnings (" + run.warnings.length + "):\x1B[0m");
    run.warnings.forEach((w) => {
      lines.push("  - " + w);
    });
    lines.push("");
  }
  process.stdout.write(lines.join("\n"));
};
var workflowRunHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const appBaseUrl = context.runtimeConfig.appBaseUrl || "https://beemm-vision.netlify.app";
  const workflowUrl = `${appBaseUrl}/#/project/${projectId}/workflow/${options.workflowId}`;
  const transport = resolveWorkflowTransport(context.runtimeConfig);
  const credits = await transport.getCredits();
  if (!context.json) {
    context.output.writeHuman(`
\u{1F517} Open in browser: ${workflowUrl}
`);
    let estimatedCost = 0;
    try {
      const workflow = await transport.exportWorkflow({ projectId, workflowId: options.workflowId });
      estimatedCost = estimateWorkflowCost(workflow);
    } catch {
    }
    if (estimatedCost > 0 && process.stdin.isTTY) {
      context.output.writeHuman(`
\u{1F4B0} Estimated cost: ${formatCredits(estimatedCost)} credits`);
      context.output.writeHuman(`   Your balance: ${formatCredits(credits)} credits
`);
      const answer = await promptConfirmation("Continue? (y/n): ");
      if (answer.toLowerCase() !== "y") {
        context.output.writeHuman("\nCancelled.\n");
        process.exit(0);
      }
    } else if (estimatedCost > 0) {
      context.output.writeHuman(`
\u{1F4B0} Estimated cost: ${formatCredits(estimatedCost)} credits`);
      context.output.writeHuman(`   Your balance: ${formatCredits(credits)} credits`);
      context.output.writeHuman(`   (Non-interactive mode: proceeding automatically)
`);
    }
    if (credits < 10) {
      context.output.writeHuman(`
\u26A0\uFE0F  Warning: Low credit balance (${formatCredits(credits)} credits).
`);
    }
    context.output.writeHuman("");
  }
  const nodeStates = /* @__PURE__ */ new Map();
  let creditsUsed = 0;
  let remainingCredits = credits;
  let totalNodeCount = 0;
  let execution;
  try {
    execution = import_workflowRun.WorkflowExecutionResultSchema.parse(
      await transport.runWorkflow(
        { projectId, workflowId: options.workflowId },
        (event) => {
          if (context.json) return;
          if (event.step === "node_start" && event.status === "running") {
            nodeStates.set(event.nodeId, {
              label: event.label,
              status: "running",
              startTime: Date.now()
            });
          } else if (event.step === "node_start" && event.status === "queued") {
            nodeStates.set(event.nodeId, {
              label: event.label,
              status: "queued",
              startTime: Date.now()
            });
          } else if (event.step === "node_complete" || event.step === "node_failed" || event.step === "node_skipped") {
            const state = nodeStates.get(event.nodeId);
            if (state) {
              state.status = event.status;
              state.duration = `${((Date.now() - state.startTime) / 1e3).toFixed(1)}s`;
            }
          } else if (event.step === "credits_used") {
            creditsUsed += event.amount || 0;
          }
          if (totalNodeCount === 0 && nodeStates.size > 0) {
            totalNodeCount = nodeStates.size;
          }
          const completed = [...nodeStates.values()].filter((s) => s.status === "success" || s.status === "failed" || s.status === "skipped").length;
          const running = [...nodeStates.values()].filter((s) => s.status === "running").length;
          const queued = Math.max(0, totalNodeCount - completed - running);
          renderDashboard(nodeStates, `${formatCredits(credits)} \u2192 ${formatCredits(credits - creditsUsed)} (-${formatCredits(creditsUsed)} est.)`, workflowUrl, {
            completed,
            total: totalNodeCount,
            running,
            queued
          });
        }
      )
    );
    remainingCredits = execution.remainingCredits ?? credits - creditsUsed;
    creditsUsed = execution.creditsUsed ?? creditsUsed;
    if (!context.json) {
      renderFinalResults(execution, {
        projectId,
        workflowId: options.workflowId,
        workflowUrl,
        creditsUsed,
        remainingCredits
      });
    }
  } catch (error) {
    if (!context.json) {
      context.output.writeHuman(`
\x1B[31m\u274C Workflow run failed: ${error instanceof Error ? error.message : String(error)}\x1B[0m
`);
    }
    throw error;
  }
  console.log(`[workflow.run] ${context.transport.kind} run completed for ${projectId}/${options.workflowId}`);
  return {
    projectId,
    workflowId: options.workflowId,
    workflowUrl,
    transport: context.transport.kind,
    creditsUsed,
    remainingCredits,
    run: execution.run,
    progressEvents: execution.progressEvents,
    summary: execution.summary
  };
};
var registerWorkflowRunCommand = (workflowCommand, context) => {
  workflowCommand.command("run").description("Run a workflow and collect artifacts when supported by the transport").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").action(
    createCommandAction({
      context,
      commandName: "workflow.run",
      schema: WorkflowRunOptionsSchema,
      handler: workflowRunHandler
    })
  );
};

// src/commands/workflow/samyGenerate.ts
import { mkdir as mkdir4, writeFile as writeFile4 } from "node:fs/promises";
import { dirname as dirname7, resolve as resolve5 } from "node:path";
import { z as z15 } from "zod";
var WorkflowSamyGenerateOptionsSchema = z15.object({
  projectId: z15.string().min(1).optional(),
  workflowId: z15.string().min(1, "workflowId is required"),
  prompt: z15.string().min(1, "prompt is required"),
  output: z15.string().min(1).optional(),
  workflowName: z15.string().min(1).optional(),
  assistantMode: import_samyWorkflow.WorkflowAssistantModeSchema.optional(),
  stylePreset: import_samyWorkflow.WorkflowAssistantStylePresetSchema.optional(),
  generationStrategy: import_samyWorkflow.WorkflowAssistantGenerationStrategySchema.optional(),
  priorQuestionRounds: z15.number().int().nonnegative().optional(),
  answersJson: z15.string().min(2).optional()
});
var parseAnswersJson3 = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value === "string" || typeof value === "boolean" || value === null) {
      normalized[key] = value;
      continue;
    }
    normalized[key] = String(value);
  }
  return normalized;
};
var persistPortableWorkflow4 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve5(outputPath);
  await mkdir4(dirname7(resolvedPath), { recursive: true });
  await writeFile4(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowSamyGenerateHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson3(options.answersJson);
  const response = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  let outputPath = null;
  if (options.output && response.kind === "workflow") {
    outputPath = await persistPortableWorkflow4(options.output, response.portableWorkflow);
  }
  console.log(
    `[workflow.samy-generate] ${context.transport.kind} generation completed for ${projectId}/${options.workflowId}`
  );
  if (outputPath) {
    console.log(`[workflow.samy-generate] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    prompt: options.prompt,
    transport: context.transport.kind,
    outputPath,
    response
  };
};
var registerWorkflowSamyGenerateCommand = (workflowCommand, context) => {
  workflowCommand.command("samy-generate").description("Generate a portable workflow through Samy").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--output <path>", "Write the generated workflow JSON to a file").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode: fast, premium, pro, deepseek-v3, qwen3-32b, qwen3-72b, qwen25-72b").option("--style-preset <preset>", "Style preset: default, editorial, graphic, cinematic").option("--generation-strategy <strategy>", "Generation strategy: standard or dashboard_bootstrap").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").action(
    createCommandAction({
      context,
      commandName: "workflow.samy-generate",
      schema: WorkflowSamyGenerateOptionsSchema,
      handler: workflowSamyGenerateHandler
    })
  );
};

// src/commands/workflow/watch.ts
import { z as z16 } from "zod";
var WorkflowWatchOptionsSchema = z16.object({
  projectId: z16.string().min(1).optional(),
  workflowId: z16.string().min(1, "workflowId is required"),
  interval: z16.number().int().positive().max(60).optional()
});
var workflowWatchHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const pollInterval = options.interval || 5;
  const appBaseUrl = context.runtimeConfig.appBaseUrl || "https://beemm-vision.netlify.app";
  const workflowUrl = `${appBaseUrl}/#/project/${projectId}/workflow/${options.workflowId}`;
  let previousSnapshot = null;
  let isRunning = true;
  const handleShutdown = () => {
    isRunning = false;
    if (!context.json) {
      context.output.writeHuman("\n\n\u{1F44B} Stopping workflow watch.\n");
    }
    process.exit(0);
  };
  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
  if (!context.json) {
    context.output.writeHuman(`
\u{1F441}\uFE0F  Watching workflow: ${options.workflowId}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   URL: ${workflowUrl}
`);
    context.output.writeHuman(`   Poll interval: ${pollInterval}s
`);
    context.output.writeHuman(`   Press Ctrl+C to stop

`);
  }
  const pollWorkflow = async () => {
    const workflows = await context.transport.listWorkflows({ projectId });
    const workflow = workflows.workflows.find((w) => w.workflowId === options.workflowId);
    if (!workflow) {
      throw new Error(`Workflow "${options.workflowId}" not found in project "${projectId}"`);
    }
    const exportedWorkflow = await context.transport.exportWorkflow({ projectId, workflowId: options.workflowId });
    return {
      workflowId: workflow.workflowId,
      name: workflow.name,
      updatedAt: workflow.updatedAt,
      lastExecutedAt: workflow.lastExecutedAt,
      appConfigEnabled: workflow.appConfigEnabled,
      nodeCount: exportedWorkflow.nodes.length,
      edgeCount: exportedWorkflow.edges.length
    };
  };
  const formatChange = (prev, curr) => {
    const changes = [];
    if (prev.name !== curr.name) {
      changes.push(`  \u{1F4DD} Name: "${prev.name}" \u2192 "${curr.name}"`);
    }
    if (prev.nodeCount !== curr.nodeCount) {
      const diff = curr.nodeCount - prev.nodeCount;
      const sign = diff > 0 ? "+" : "";
      changes.push(`  \u{1F4E6} Nodes: ${prev.nodeCount} \u2192 ${curr.nodeCount} (${sign}${diff})`);
    }
    if (prev.edgeCount !== curr.edgeCount) {
      const diff = curr.edgeCount - prev.edgeCount;
      const sign = diff > 0 ? "+" : "";
      changes.push(`  \u{1F517} Edges: ${prev.edgeCount} \u2192 ${curr.edgeCount} (${sign}${diff})`);
    }
    if (prev.appConfigEnabled !== curr.appConfigEnabled) {
      changes.push(`  \u2699\uFE0F  App Config: ${prev.appConfigEnabled ? "ON" : "OFF"} \u2192 ${curr.appConfigEnabled ? "ON" : "OFF"}`);
    }
    if (prev.lastExecutedAt !== curr.lastExecutedAt && curr.lastExecutedAt) {
      changes.push(`  \u25B6\uFE0F  Last executed: ${new Date(curr.lastExecutedAt).toLocaleTimeString()}`);
    }
    if (prev.updatedAt !== curr.updatedAt) {
      changes.push(`  \u{1F550} Updated: ${new Date(curr.updatedAt || "").toLocaleTimeString()}`);
    }
    return changes;
  };
  const renderDashboard2 = (snapshot) => {
    const lines = [
      `\u256D\u2500 Workflow Watch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E`,
      `\u2502  Project: ${projectId.padEnd(50)}\u2502`,
      `\u2502  Workflow: ${snapshot.workflowId.padEnd(49)}\u2502`,
      `\u2502  Name: ${snapshot.name.padEnd(53)}\u2502`,
      `\u2502  Nodes: ${String(snapshot.nodeCount).padEnd(54)}\u2502`,
      `\u2502  Edges: ${String(snapshot.edgeCount).padEnd(54)}\u2502`,
      `\u2502  App Config: ${(snapshot.appConfigEnabled ? "ON" : "OFF").padEnd(49)}\u2502`,
      `\u2502  Last Executed: ${(snapshot.lastExecutedAt ? new Date(snapshot.lastExecutedAt).toLocaleTimeString() : "Never").padEnd(44)}\u2502`,
      `\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F`
    ];
    if (process.stdout.isTTY) {
      process.stdout.write("\x1B[2J\x1B[H");
    }
    lines.forEach((line) => context.output.writeHuman(line + "\n"));
  };
  while (isRunning) {
    try {
      const currentSnapshot = await pollWorkflow();
      if (context.json) {
        context.output.writeHuman(`${JSON.stringify({ ok: true, command: "workflow.watch", data: { snapshot: currentSnapshot }, logs: [] })}
`);
      } else {
        if (previousSnapshot) {
          const changes = formatChange(previousSnapshot, currentSnapshot);
          if (changes.length > 0) {
            context.output.writeHuman(`
\u{1F504} Changes detected:
`);
            changes.forEach((change) => context.output.writeHuman(`${change}
`));
          }
        }
        renderDashboard2(currentSnapshot);
      }
      previousSnapshot = currentSnapshot;
    } catch (error) {
      if (!context.json) {
        context.output.writeHuman(`\u274C Error: ${error instanceof Error ? error.message : String(error)}
`, "stderr");
      }
    }
    await new Promise((resolve6) => setTimeout(resolve6, pollInterval * 1e3));
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind
  };
};
var registerWorkflowWatchCommand = (workflowCommand, context) => {
  workflowCommand.command("watch").description("Watch a workflow for changes and display real-time updates").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").option("--interval <seconds>", "Poll interval in seconds (default: 5)", (value) => Number(value)).action(
    createCommandAction({
      context,
      commandName: "workflow.watch",
      schema: WorkflowWatchOptionsSchema,
      handler: workflowWatchHandler
    })
  );
};

// src/commands/workflow/index.ts
var registerWorkflowCommands = (program, context) => {
  const workflowCommand = program.command("workflow").description("Portable workflow operations for BEEMM-JAM");
  registerWorkflowExportCommand(workflowCommand, context);
  registerWorkflowImportCommand(workflowCommand, context);
  registerWorkflowDuplicateCommand(workflowCommand, context);
  registerWorkflowListCommand(workflowCommand, context);
  registerWorkflowRenameCommand(workflowCommand, context);
  registerWorkflowRunCommand(workflowCommand, context);
  registerWorkflowSamyGenerateCommand(workflowCommand, context);
  registerWorkflowGenerateAndImportCommand(workflowCommand, context);
  registerWorkflowGenerateImportRunCommand(workflowCommand, context);
  registerWorkflowWatchCommand(workflowCommand, context);
};

// src/commands/credits.ts
import { z as z17 } from "zod";
var CreditsOptionsSchema = z17.object({
  json: z17.boolean().default(false)
});
var creditsHandler = async (options, context) => {
  const transport = resolveWorkflowTransport(context.runtimeConfig);
  const credits = await transport.getCredits();
  if (context.json) {
    return { ok: true, command: "credits", data: { credits }, logs: [] };
  }
  context.output.writeHuman(`
\u{1F4B3} Credit Balance: ${credits} credits
`);
  if (credits < 50) {
    context.output.writeHuman(`\u26A0\uFE0F  Low credits! Consider adding more.
`);
  }
  return { ok: true, command: "credits", data: { credits }, logs: [] };
};
var registerCreditsCommand = (program, context) => {
  program.command("credits").description("Check your BeemmVision credit balance").option("--json", "Output results as JSON").action(
    createCommandAction({
      context,
      commandName: "credits",
      schema: CreditsOptionsSchema,
      handler: creditsHandler
    })
  );
};

// src/core/output.ts
import util from "node:util";
var normalizeChunk = (chunk) => {
  return chunk.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
};
var createOutputBuffer = () => {
  let value = "";
  return {
    get value() {
      return value;
    },
    write(chunk) {
      value += chunk;
    }
  };
};
var createOutputController = (options) => {
  const logs = [];
  let activeSpinner = null;
  const pushLog = (chunk) => {
    logs.push(...normalizeChunk(chunk));
  };
  const clearSpinner = () => {
    if (!activeSpinner || options.jsonMode || !process.stdout.isTTY) return;
    const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
    sink("\r\x1B[2K");
  };
  const renderSpinner = () => {
    if (!activeSpinner || options.jsonMode) return;
    const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
    const frame = activeSpinner.frames[activeSpinner.frameIndex % activeSpinner.frames.length];
    activeSpinner.frameIndex += 1;
    if (process.stdout.isTTY) {
      sink(`\r\x1B[2K${frame} ${activeSpinner.text}`);
    }
  };
  const stopSpinnerInternal = (finalText) => {
    if (!activeSpinner) return;
    if (activeSpinner.timer) {
      clearInterval(activeSpinner.timer);
    }
    const stream = activeSpinner.stream;
    clearSpinner();
    activeSpinner = null;
    if (finalText) {
      if (stream === "stderr") {
        writeStderr(`${finalText}
`);
      } else {
        writeStdout(`${finalText}
`);
      }
    }
  };
  const writeStdout = (chunk) => {
    options.stdoutBuffer.write(chunk);
    options.stdoutSink?.(chunk);
  };
  const writeStderr = (chunk) => {
    options.stderrBuffer.write(chunk);
    options.stderrSink?.(chunk);
  };
  const writeHuman = (chunk, stream = "stdout") => {
    if (options.jsonMode) {
      pushLog(chunk);
      return;
    }
    if (activeSpinner) {
      clearSpinner();
    }
    if (stream === "stderr") {
      writeStderr(chunk);
      if (activeSpinner) {
        renderSpinner();
      }
      return;
    }
    writeStdout(chunk);
    if (activeSpinner) {
      renderSpinner();
    }
  };
  return {
    jsonMode: options.jsonMode,
    logs,
    writeHuman,
    createSpinner({ text, stream = "stdout" }) {
      if (options.jsonMode) {
        return {
          update() {
            return void 0;
          },
          stop() {
            return void 0;
          }
        };
      }
      stopSpinnerInternal();
      const isTTY = Boolean(process.stdout.isTTY);
      activeSpinner = {
        frames: isTTY ? ["|", "/", "-", "\\"] : ["*"],
        frameIndex: 0,
        timer: null,
        text,
        stream
      };
      if (isTTY) {
        renderSpinner();
        activeSpinner.timer = setInterval(renderSpinner, 80);
      } else {
        renderSpinner();
      }
      return {
        update(nextText) {
          if (!activeSpinner) return;
          if (activeSpinner.text === nextText) return;
          activeSpinner.text = nextText;
          if (isTTY) {
            renderSpinner();
          } else {
            const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
            sink(`[*] ${nextText}
`);
          }
        },
        stop(finalText) {
          stopSpinnerInternal(finalText);
        }
      };
    },
    writeJsonDocument(document) {
      stopSpinnerInternal();
      writeStdout(`${JSON.stringify(document, null, 2)}
`);
    },
    configureCommanderOutput() {
      return {
        writeOut: (str) => writeHuman(str, "stdout"),
        writeErr: (str) => writeHuman(str, "stderr")
      };
    },
    captureConsole() {
      const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
      };
      const redirect = (stream) => (...args) => {
        const message = `${util.format(...args)}
`;
        writeHuman(message, stream);
      };
      console.log = redirect("stdout");
      console.info = redirect("stdout");
      console.warn = redirect("stderr");
      console.error = redirect("stderr");
      return () => {
        console.log = originalConsole.log;
        console.info = originalConsole.info;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
      };
    }
  };
};

// src/core/runtimeConfig.ts
var normalizeTransportMode = (value) => {
  if (value === "mock" || value === "callable") {
    return value;
  }
  return "auto";
};
var readCliOption = (argv, optionName) => {
  const exactToken = `--${optionName}`;
  const prefixedToken = `${exactToken}=`;
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === exactToken) {
      const next = argv[index + 1];
      if (next && !next.startsWith("--")) {
        return next;
      }
      return void 0;
    }
    if (token.startsWith(prefixedToken)) {
      return token.slice(prefixedToken.length);
    }
  }
  return void 0;
};
var parseRuntimeConfig = async (argv, env = process.env) => {
  const storedConfig = loadVisionboardCliConfig(env);
  const transportMode = normalizeTransportMode(
    readCliOption(argv, "transport") || env.VISIONBOARD_CLI_TRANSPORT
  );
  const cliFunctionsBaseUrl = readCliOption(argv, "functions-base-url");
  const envFunctionsBaseUrl = env.VISIONBOARD_FUNCTIONS_BASE_URL || void 0;
  const functionsBaseUrl = cliFunctionsBaseUrl || envFunctionsBaseUrl || storedConfig.functionsBaseUrl || void 0;
  const functionsBaseUrlSource = cliFunctionsBaseUrl ? "cli" : envFunctionsBaseUrl ? "env" : storedConfig.functionsBaseUrl ? "config" : "missing";
  const cliFirebaseIdToken = readCliOption(argv, "firebase-id-token");
  const envFirebaseIdToken = env.VISIONBOARD_FIREBASE_ID_TOKEN || void 0;
  const storedFirebaseIdToken = await getValidFirebaseIdToken(env);
  const cliAppBaseUrl = readCliOption(argv, "app-base-url");
  const envAppBaseUrl = env.VISIONBOARD_APP_BASE_URL || void 0;
  const appBaseUrl = cliAppBaseUrl || envAppBaseUrl || storedConfig.appBaseUrl || "https://beemm-vision.netlify.app";
  const appBaseUrlSource = cliAppBaseUrl ? "cli" : envAppBaseUrl ? "env" : storedConfig.appBaseUrl ? "config" : "default";
  const firebaseIdToken = cliFirebaseIdToken || envFirebaseIdToken || storedFirebaseIdToken || void 0;
  const firebaseIdTokenSource = cliFirebaseIdToken ? "cli" : envFirebaseIdToken ? "env" : storedFirebaseIdToken ? "stored" : "missing";
  return {
    transportMode,
    functionsBaseUrl,
    firebaseIdToken,
    firebaseIdTokenSource,
    currentProjectId: loadStoredProjectId(env),
    appBaseUrl,
    functionsBaseUrlSource,
    appBaseUrlSource
  };
};

// src/core/runner.ts
var detectJsonFlag = (argv) => argv.includes("--json");
var inferCommandNameFromArgv = (argv) => {
  const tokens = argv.slice(2).filter((token) => token && !token.startsWith("-"));
  if (tokens.length >= 2) {
    return `${tokens[0]}.${tokens[1]}`;
  }
  if (tokens.length === 1) {
    return tokens[0];
  }
  return "visionboard";
};
var createProgram = (context) => {
  const program = new Command();
  program.name("visionboard").version("0.1.5").description("Agent-native BEEMM-JAM CLI").option("--json", "Emit machine-readable JSON output").option("--transport <transport>", "Transport mode: auto, mock, callable", "auto").option("--functions-base-url <url>", "Base URL for Firebase Functions HTTP endpoints").option("--firebase-id-token <token>", "Firebase ID token used by callable transport").showHelpAfterError().configureOutput(context.output.configureCommanderOutput()).exitOverride();
  registerWorkflowCommands(program, context);
  registerAuthCommands(program, context);
  registerConfigCommands(program, context);
  registerProjectCommands(program, context);
  registerTemplateCommands(program, context);
  registerDoctorCommand(program, context);
  registerCreditsCommand(program, context);
  return program;
};
var runCli = async (argv, options) => {
  const jsonMode = detectJsonFlag(argv);
  const runtimeConfig = await parseRuntimeConfig(argv, options?.env);
  const stdoutBuffer = createOutputBuffer();
  const stderrBuffer = createOutputBuffer();
  const output = createOutputController({
    jsonMode,
    stdoutBuffer,
    stderrBuffer,
    stdoutSink: options?.stdoutSink,
    stderrSink: options?.stderrSink
  });
  const context = {
    json: jsonMode,
    env: options?.env ?? process.env,
    runtimeConfig,
    transport: options?.transportOverride ?? {
      kind: "mock",
      exportWorkflow: async () => {
        throw new Error("Transport not initialized");
      },
      importWorkflow: async () => {
        throw new Error("Transport not initialized");
      },
      generateWorkflow: async () => {
        throw new Error("Transport not initialized");
      },
      runWorkflow: async () => {
        throw new Error("Transport not initialized");
      },
      listWorkflows: async () => {
        throw new Error("Transport not initialized");
      },
      listTemplates: async () => {
        throw new Error("Transport not initialized");
      },
      getTemplate: async () => {
        throw new Error("Transport not initialized");
      },
      duplicateTemplate: async () => {
        throw new Error("Transport not initialized");
      },
      listProjects: async () => {
        throw new Error("Transport not initialized");
      },
      getCredits: async () => {
        throw new Error("Transport not initialized");
      },
      renameWorkflow: async () => {
        throw new Error("Transport not initialized");
      },
      createProject: async () => {
        throw new Error("Transport not initialized");
      }
    },
    output,
    commandName: null,
    response: null
  };
  const restoreConsole = output.captureConsole();
  let exitCode = EXIT_CODES.SUCCESS;
  try {
    context.transport = options?.transportOverride ?? resolveWorkflowTransport(runtimeConfig);
    const program = createProgram(context);
    await program.parseAsync(argv);
  } catch (error) {
    if (error instanceof CommanderError2 && (error.code === "commander.helpDisplayed" || error.code === "commander.version")) {
      exitCode = EXIT_CODES.SUCCESS;
    } else {
      const cliError = error instanceof CommanderError2 ? commanderErrorToCliError(error) : normalizeError(error);
      exitCode = cliError.exitCode;
      const commandName = context.commandName ?? inferCommandNameFromArgv(argv);
      if (jsonMode) {
        context.response = createErrorResponse(
          commandName,
          {
            type: cliError.type,
            message: cliError.message
          },
          context.output.logs
        );
      } else if (!(error instanceof CommanderError2)) {
        context.output.writeHuman(`${cliError.message}
`, "stderr");
      }
    }
  } finally {
    restoreConsole();
  }
  if (jsonMode) {
    if (!context.response) {
      context.response = createErrorResponse(
        context.commandName ?? inferCommandNameFromArgv(argv),
        {
          type: "validation_error",
          message: "No command was executed"
        },
        context.output.logs
      );
      exitCode = EXIT_CODES.VALIDATION;
    }
    output.writeJsonDocument(context.response);
  }
  return {
    exitCode,
    stdout: stdoutBuffer.value,
    stderr: stderrBuffer.value,
    response: context.response
  };
};

// src/index.ts
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
var resolveSymlink = (path) => {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
};
var scriptPath = process.argv[1];
var actualScriptPath = scriptPath ? resolveSymlink(scriptPath) : "";
var modulePath = fileURLToPath(import.meta.url);
var isDirectExecution = actualScriptPath ? actualScriptPath === modulePath || actualScriptPath.endsWith("cli/dist/index.js") || actualScriptPath.endsWith("cli\\dist\\index.js") || actualScriptPath.endsWith("cli/dist/bundle.js") || actualScriptPath.endsWith("cli\\dist\\bundle.js") || actualScriptPath.endsWith("beemmvision-cli/index.js") || actualScriptPath.endsWith("beemmvision-cli\\index.js") : false;
if (isDirectExecution) {
  const result = await runCli(process.argv, {
    stdoutSink: (chunk) => process.stdout.write(chunk),
    stderrSink: (chunk) => process.stderr.write(chunk)
  });
  process.exitCode = result.exitCode;
}
export {
  runCli
};
