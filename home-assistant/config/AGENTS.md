# AGENTS.md

This file documents the current state and design decisions of this Home Assistant configuration for AI agents and contributors.

## Temperature / Climate Management

**Home Assistant does not manage temperatures directly.**

The thermostats (Hilo devices) are controlled exclusively by the **Hilo application** from Hydro-Québec. Hilo handles:
- Daily temperature scheduling (setpoints per time slot)
- Load shifting during peak demand periods ("défis Hilo")
- Optimization based on Hydro-Québec's electricity grid

Home Assistant's role regarding climate is limited to:
- **Monitoring** thermostat states via the `hilo` custom component
- **Turning thermostats on/off** during Hilo challenge events (`sensor.defi_hilo` → `reduction` / `recovery`) to assist load reduction — see automations `Hilo: Événement en cours` and `Hilo: Événement terminé`
- **Not setting temperature setpoints** — those remain under Hilo app control

Do not add automations that change thermostat temperature setpoints, as this would conflict with the Hilo schedule.

## Presence Detection

Presence is tracked via two `input_boolean` helpers, toggled manually or by phone-based automations:
- `input_boolean.presence_isabelle`
- `input_boolean.presence_michel`

## Gree AC Units

The Gree air conditioning units (`gree` integration) are separate from the Hilo thermostats. They are currently **not automated** — operated manually by Noël. Do not add automations for the Gree units.
