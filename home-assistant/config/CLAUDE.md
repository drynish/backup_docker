# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A Home Assistant (2026.3.x) residential smart home configuration running in Docker. The instance manages climate, energy, presence, EV charging, and security for a multi-person household in Quebec, Canada. Automation aliases and entity names are primarily in French.

## Configuration Architecture

The configuration uses `!include` directives in `configuration.yaml` to split concerns into dedicated files:

- `automations.yaml` — 40 automations (presence, climate, energy, security)
- `scripts.yaml` — Reusable action sequences (EV control, climate sequencing, fan control)
- `templates.yaml` — Derived sensor values (external temp/humidity, energy sums, humidity differential)
- `groups.yaml` — Entity groupings
- `blueprints/` — Reusable automation/script/template patterns

Credentials are stored in `secrets.yaml` and referenced with `!secret key_name`.

## Key Integrations

**Custom components** (`custom_components/`):
- `hilo` — Hydro-Quebec energy management (load shifting)
- `sonoff` — Local-push eWeLink/Sonoff device control
- `adaptive_lighting` — Circadian rhythm lighting
- `waste_collection_schedule` — Google Calendar ICS for garbage day tracking
- `smartthinq_sensors` — LG appliance monitoring
- `gree` — Gree AC units

**EV & Charging**:
- Vehicle control via MQTT (Chevy EV)
- Chargepoint station via `shell_command` curl calls to local IP `192.168.101.90`

**Networking**:
- Runs behind a reverse proxy; trusted proxies configured for Docker subnets `172.25.0.0/16`, `172.18.0.0/16`, and `192.168.13.1`

## Automation Patterns

Automations use several recurring patterns:
- **Presence-based**: Triggered by `input_boolean.presence_isabelle` / `input_boolean.presence_michel` state changes
- **Humidity differential**: Compares bathroom vs external humidity (template sensor in `templates.yaml`); fan automation uses `restart` mode to prevent rapid retriggering
- **Sequential climate control**: Scripts coordinate thermostat + ventilation with `delay` steps
- **Shell commands**: EV station commands are curl calls defined in `configuration.yaml` under `shell_command:`
- **Conditional actions**: `if/then/else` blocks used inside automation actions for complex logic

## Editing Guidelines

When modifying automations via the UI, Home Assistant rewrites `automations.yaml` entirely — manual edits to that file should be made while HA is stopped or immediately reloaded. Scripts and templates are safer to edit manually as they are only reloaded on demand.

To reload configuration without restarting:
- **Developer Tools → YAML → Reload All YAML** in the UI
- Or call the `homeassistant.reload_config_entry` / specific `homeassistant.reload_*` services

The database (`home-assistant_v2.db`, ~552 MB) and `.storage/` directory contain runtime state — do not edit them directly.
