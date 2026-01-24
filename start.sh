#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH="$DIR/../node-v20.11.0-darwin-x64/bin:$PATH"

echo "🚀 Starting Surya's Portfolio..."
npm run dev
