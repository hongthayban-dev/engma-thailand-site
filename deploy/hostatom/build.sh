#!/bin/sh
# Build the static site for https://engma.co.th and pack it for upload to Hostatom.
# Output: out/ (site files) and outputs/engma-hostatom.zip (upload + extract in public_html).
set -e
cd "$(dirname "$0")/../.."

rm -rf out
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_URL=https://engma.co.th npx next build --webpack

# cat instead of cp: network volumes may reject copying macOS extended attributes.
cat deploy/hostatom/.htaccess > out/.htaccess
rm -f out/.nojekyll

mkdir -p outputs
rm -f outputs/engma-hostatom.zip
(cd out && zip -rq ../outputs/engma-hostatom.zip .)

echo "Ready: out/ and outputs/engma-hostatom.zip"
