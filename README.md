# Windsurf Rules

![Windsurf](https://img.shields.io/badge/Windsurf-AI%20Assistant-blue?style=flat-square)
![License](https://img.shields.io/badge/License-Personal%20Use-orange?style=flat-square)
![Ubuntu](https://img.shields.io/badge/Ubuntu-25.04-E95420?style=flat-square&logo=ubuntu)

This repository contains my evolving Windsurf rules with automatic version tracking. The README dynamically displays all versions from newest to oldest.

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [File Location](#file-location)
- [Versions](#versions)
- [Development](#development)

## About

The Windsurf rules that I work with have to be evolving given that the tool itself evolves so quickly. This repository tracks all versions of my rules, with the latest version always available in `latest.md` and historical versions archived for reference.

## Usage

These rules are designed to be used with Windsurf's memory system to provide consistent context and behavior across sessions.

## File Location

The main rules file should be placed at: `~/.codeium/windsurf/memories/global_rules.md`

## Versions

| Version | Date | Size | Link |
|---------|------|------|------|
| Latest | Latest Version | 7.7 KB | [Latest](latest.md) |


<!-- END_VERSIONS_TABLE -->

## Development

This repository uses automated scripts to manage versions:

- **Version Table**: Automatically generated from archived versions
- **Token Estimation**: Track content size over time
- **GitHub Actions**: Automated updates when content changes

### Scripts

- `npm run build-table` - Update versions table
- `npm run estimate-tokens` - Estimate token count
- `./scripts/build-versions-table.js` - Manual table generation
