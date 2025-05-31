#!/bin/bash

echo "=== preinstall ==="

# 원본 유지
cp .yarnrc.yml .yarnrc.yml.temp

NPM_TOKEN=$(grep NPM_TOKEN .env | cut -d '=' -f2 | tr -d '"' | xargs) envsubst < .yarnrc.yml.template > .yarnrc.yml
