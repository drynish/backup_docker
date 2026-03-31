#!/bin/bash
# Nettoyage automatique des logs Omada

LOGS_DIR="/home/drynish/docker/omada/logs"
MONGOD_LOG="$LOGS_DIR/mongod.log"
RETENTION_DAYS=90
MAX_MONGOD_SIZE=52428800  # 50 Mo en bytes

# Supprimer les archives server_*.log.gz de plus de 90 jours
find "$LOGS_DIR" -name "server_*.log.gz" -mtime +$RETENTION_DAYS -delete

# Tronquer mongod.log s'il dépasse 50 Mo (copytruncate pour ne pas interrompre MongoDB)
if [ -f "$MONGOD_LOG" ] && [ "$(stat -c%s "$MONGOD_LOG")" -gt "$MAX_MONGOD_SIZE" ]; then
    cp "$MONGOD_LOG" "${MONGOD_LOG}.old"
    truncate -s 0 "$MONGOD_LOG"
fi
