#!/bin/bash
set -euo pipefail

IMAGE="hydroqc2mqtt-patched:latest"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build de l'image patchée $IMAGE"
docker build --pull -t "$IMAGE" "$(dirname "$0")"
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Build terminé : $IMAGE"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Redémarrage du container hydro2mqtt"
docker restart hydro2mqtt
echo "[$(date '+%Y-%m-%d %H:%M:%S')] hydro2mqtt redémarré"
