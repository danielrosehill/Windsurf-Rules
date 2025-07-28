# Windsurf Rules - July 28, 2025

## User Profiles

User - Daniel Rosehill ([danielrosehill.com](https://danielrosehill.com))
Location: Jerusalem, Israel
This Environment - Kubuntu 25.04 desktop
Privileges - Full sudo access. Assume permission to invoke. 
LAN Network - LAN 10.0.0.0/24
SSH - Key-based access to LAN devices is preconfigured

Daniel does most development work at home. If he is not at home, he will inform you and ask that you reach critical services via Tailnet endpoints (these will be added soon).

 ## Daniel’s Ubuntu 25.04 Desktop Summary

 These are the hardware details of Daniel's desktop which is his main computer where you will be working most of the time (unless you know that you are operating on a remote directly!):

##  Core System
| Component | Details |
|----------|---------|
| OS | Ubuntu 25.04 (64-bit) |
| Kernel | 6.14.0-15-generic |
| DE/WM | KDE Plasma 6.3.4 / KWin |
| Shell | Bash 5.2.37 |
 

##  CPU
| Detail | Value |
|--------|-------|
| Model | Intel Core i7-12700F |
| Cores / Threads | 12 cores / 20 threads |
| Base / Turbo Clock | 800 MHz / 4.9 GHz |
| Virtualization | VT-x |
| L3 Cache | 25 MB |

##  GPU
| Detail | Value |
|--------|-------|
| Model | AMD Radeon RX 7700 XT (gfx1101 / Navi 32) |
| Driver | `amdgpu` |
| ROCm Version | 6.3.0 (`rocminfo` reports Runtime 1.14) |

##  RAM
| DIMMs | 4×16 GB Kingston DDR5 |
| Speed | 4800 MT/s |
| Total | 64 GB (63 GiB usable) |
| Max Supported | 128 GB |

##  Storage (Btrfs RAID-5)
| Mount | Devices | Capacity | Used | Free (est) |
|-------|---------|----------|------|------------|
| `/`   | 5 (1x NVMe + 4x SATA SSDs) | 4.51 TiB | ~840 GiB | ~2.95 TiB |
| RAID-5 Profile | Btrfs (data ratio: 1.25), metadata RAID-1 |

##  Audio Devices
| Output | Details |
|--------|---------|
| HDMI | AMD GPU HDMI ports (4 total) |
| Analog | Realtek ALC897 |

##  Network Interfaces
| Interface | Type | Status | Address |
|-----------|------|--------|---------|
| `enp6s0` | Ethernet (Realtek RTL8125 2.5GbE) | UP | `10.0.0.6/24` |
| `wlo1` | Intel CNVi WiFi | DOWN | — |

## 🧩 Motherboard / Firmware
| Detail | Value |
|--------|-------|
| Board | MSI PRO B760M-A WIFI (MS-7D99) |
| BIOS | AMI A.70 (2024-01-10) |
| Form Factor | mATX |
| UEFI | Supported and enabled |

- **GPU Acceleration**: Confirmed `amdgpu` and ROCm stack loaded; Vulkan/OpenCL compute should work.
- **Kernel Modules**: Clean module set; includes `amdgpu`, `wireguard`, `snd_usb_audio`, `btrfs`, and `r8169`.

----

### LAN IP Map

Use the following IP references unless Daniel indicates he is off the home LAN, in which case assume these are unavailable or use Tailnet alternatives.

| IP Address | Hostname         | Description                         |
| ---------- | ---------------- | ----------------------------------- |
| 10.0.0.1   | `opnsense`       | Gateway / Router                    |
| 10.0.0.2   | `proxmox-host`   | Proxmox (Ubuntu VM & HA containers) |
| 10.0.0.3   | `home-assistant` | Home Assistant OS                   |
| 10.0.0.4   | `home-server`    | Ubuntu VM (core services host)      |
| 10.0.0.50  | `synology`       | Synology NAS (DS920+)               |

---

## Project Preferences

Daniel frequently works on AI projects. 

Here are standing requirements:

Assume **OpenRouter** is the preferred backend for cloud LLM access unless it adds unnecessary complexity—then prefer **OpenAI**.

Local LLMs may be used when justified by performance or cost. Ollama is installed. Favor **Llama 3.2** for general-purpose local tasks.

API keys are on environment path.

---

## API Keys & Secrets

Frequently used API keys are on path here:

* **Directory:** `~/api-keys/` — read directly as needed
* **Primary backend:** 1Password CLI (assume installed and session available)

Daniel wants to use 1 Password as his primary secrets store going forward. If you create or receive a secret, be proactive about creating it in his 1 Password Vault.


---

## Repository & File Structure

You can use GH or the Github MCP for basic Git operations.

When creating new Github repositories, create them here:

/home/daniel/repos/github

Hugging Face repositories should go here:

/home/daniel/repos/hugging-face

Repositories whose primary purpose is to manage other repositories (there will be relatively few of these) can go here:

/home/daniel/repos/mgmt


### AI Workspace Structure

Within every project, you *may* wish to a) configure and b) use a folder structure to receive instructions from Daniel and write them back to him. If this is partially set up, finish it and use it. The paths are relative to the repo base. 

| Path                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| `/ai-workspace/for-ai/`     | Assistant input (logs, prompts, etc.) |
| `/ai-workspace/for-daniel/` | Assistant output, notes, logs, docs   |

Use `/for-daniel/` for procedures, logs, and internal docs. Never generate external-facing content (e.g., README files) unless explicitly asked.

---

## Containerization & Deployment

You can use Docker as a tool for creating a development environment and for setting up deployments. However, before blindly suggesting it, try to consider if it's really necessary. If projects do not need to be "dockerised", avoid using it. 

When deploying onto local servers (or  remotes!) be mindful of potential port conflicts. When deploying services onto local or remote VPSes, assume as general context that Daniel likes to use Cloudflare tunnels for securing access. Unless you know that a deployed service is intended to be public facing, assume that Daniel will be adding in some form of authentication for access.

---

## GUI Development

Daniel will develop many local GUI tools with your assistance.

* Use attractive, modern GUI builders such as **PySide6**, **Tauri**, **Qt**, or **Electron** where justified
* After successful validation, generate a **build script** (e.g., `build.sh`)
* Output builds to:

  ```
  /home/daniel/software/{app-name}_v{version}/
  ```

Example:

```
/home/daniel/software/task-launcher_v1.0.2/
```

Each new version should be stored in a **separate subdirectory** using this pattern, preserving older builds.

---

## Android Projects

Unless specified otherwise, Android apps should be treated as **private**.

* Output should be an **APK** (not a Play Store bundle)
* Daniel will sideload the APK using **ADB** on target devices
* Include a `build-apk.sh` or equivalent helper after successful validation
* Never upload or distribute Android builds unless explicitly told to

---

## Execution Policy

You should follow Daniel's instructions closely. You may suggest enhancements but never independently action your ideas unless Daniel approves of them. 

### Validation Protocol

Do not assume success - especially when debugging. 

Ask that Daniel check your work or using your tool open a Windsurf Browser to investigate yourself or with Daniel.

If debugging is proving unfruitful, do not be overly stubborn. Try to be proactive in acknowledging when to say "we've tried this a lot, let's find another solution." On the other hand, do not give up or change tact after a single attempt. You should strike a balance between being determined but flexible. 

---

## Python Conventions

* Always use `venv` + `pip`
* Do not use `uv`, `poetry`, `conda`, etc. unless explicitly requested
* Ensure venv is activated before running/installing anything
* If something breaks, first confirm venv is active
* Use latest stable APIs and confirm them via trusted references (`Context7`, official docs)

---

## File Hygiene & Structure

Daniel likes to keep organised file repositories.

Try to avoid generating a large amount of scripts for single purpose use. Ie, if you can run the commands directly, try to do so.

Consider proactively initiating repository cleanups at various points during a lengthy session or throughout a project.

This should entail you reviewing the current folder structure and rationalising it and deleting what doesn't need to be kept. 

Before wrapping up a project is also a good point in time to engage in a quick cleanup.

Most of Daniel's projects and repositories will be private. However, if Daniel has stated that this repository will be open sourced and thus publicly viewable, be proactive about scanning the repository for secrets or any other type of information which you can reasonably construe that Daniel would not wish to be in the public domain. Do not take decisions independently if there is any doubt as to what Daniel's preference might be - consult.

---

## CLIs & Tools

* Authenticated and available:

  * `gh` (GitHub)
  * `wrangler` (Cloudflare)

* Check for available CLIs before scripting repetitive tasks

* Prefer CLI over GUI for reproducibility and automation

---

## Documentation Rules

* Do not generate public-facing documentation by default

* Use `/ai-workspace/for-daniel/` for:

  * Internal step-by-step guides
  * Diagnostic logs
  * Procedures worth retaining

* Never auto-generate files like `README.md` unless explicitly asked

---

## Implicit Instructions

If the following files exist in the repo root, treat them as current task definitions:

* `instructions.md`
* `prompt.md`
* `task.md`

Read and follow them without asking unless ambiguity exists.

---

## Session Management

At the end of a work session (especially substantive ones), offer to:

* Write a timestamped session log to:

  ```
  /ai-workspace/for-daniel/session-logs/
  ```

* Include:

  * Summary of work done
  * Unresolved issues
  * Any open questions

These logs supplement memory and serve as continuity checkpoints.
