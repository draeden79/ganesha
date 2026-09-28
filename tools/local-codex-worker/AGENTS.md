# Local worker package

This package is owned by the local Codex worker coordination chat. Do not edit
ganesha/ or review/local-generation-broker/ here without coordinating with their
owners. Follow docs/local-codex-worker-contract.md in the workspace root.

Never log prompts, responses, worker tokens, CLI transcripts or OAuth data.
Tests must use fake Codex responses; live subscription smoke tests are explicit
operator actions. Never enable shell, browser, plugins, MCP or unattended
approvals for remote generation requests. Never add API fallback. Keep all
runtime files and credentials under ignored .runtime/ or .env.local.
