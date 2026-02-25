#!/usr/bin/env bash
#
# Downloads ALL Smithy JSON AST models from the aws/api-models-aws GitHub repo.
#
# Usage: ./fetch-models.sh
#
# This shallow-clones the repo and copies each service's Smithy model
# into the local models/ directory. The clone is ephemeral.
#
# Repo structure: models/{service}/service/{version}/{service}-{version}.json
# We pick the latest version for each service.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MODELS_DIR="$SCRIPT_DIR/models"
TEMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

echo "Cloning aws/api-models-aws (shallow)..."
git clone --depth 1 https://github.com/aws/api-models-aws.git "$TEMP_DIR/repo" 2>&1

REPO_MODELS="$TEMP_DIR/repo/models"

if [ ! -d "$REPO_MODELS" ]; then
  echo "Error: models/ directory not found in cloned repo"
  exit 1
fi

# Count service directories
SERVICES=$(ls -d "$REPO_MODELS"/*/ 2>/dev/null | xargs -I{} basename {})
TOTAL=$(echo "$SERVICES" | wc -l | tr -d ' ')

echo "Found $TOTAL service directories. Extracting Smithy models..."

COUNT=0
SKIPPED=0

mkdir -p "$MODELS_DIR"

for svc in $SERVICES; do
  svc_dir="$REPO_MODELS/$svc/service"
  if [ ! -d "$svc_dir" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Pick the latest version (sort by version string)
  latest_ver=$(ls "$svc_dir" 2>/dev/null | sort -V | tail -1)
  if [ -z "$latest_ver" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Find the model JSON file in the version directory
  model_file=$(ls "$svc_dir/$latest_ver"/*.json 2>/dev/null | head -1)
  if [ -z "$model_file" ] || [ ! -f "$model_file" ]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  local_dir="$MODELS_DIR/$svc"
  mkdir -p "$local_dir"
  cp "$model_file" "$local_dir/model.json"
  COUNT=$((COUNT + 1))
done

echo ""
echo "Done! Copied $COUNT models to: $MODELS_DIR/"
[ "$SKIPPED" -gt 0 ] && echo "Skipped $SKIPPED directories (no Smithy model found)."
echo ""
echo "Next: run 'npx tsx tools/codegen/generate.ts' to generate service bindings."
