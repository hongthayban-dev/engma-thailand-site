#!/bin/sh
# Build the static site and update the files nginx serves on the NAS (deploy/nas/site).
# rsync into the existing folder instead of replacing it: the container bind-mounts this
# folder, so deleting/recreating it would leave nginx pointing at a stale directory.
# If the build fails, the live site is left untouched.
set -e
cd "$(dirname "$0")/../.."

sh deploy/hostatom/build.sh

mkdir -p deploy/nas/site
rsync -rt --delete --exclude '.htaccess' out/ deploy/nas/site/

echo "Published: deploy/nas/site (live immediately, no container restart needed)"
