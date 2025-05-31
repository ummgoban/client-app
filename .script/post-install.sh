#!/bin/bash

echo "=== postinstall ==="

# .yarnrc.yml.temp 가 없으면 종료
if [ ! -f .yarnrc.yml.temp ]; then
  echo "No .yarnrc.yml.temp file found"
  exit 0
fi

# 원본 복구
cp .yarnrc.yml.temp .yarnrc.yml

# 임시 파일 삭제
rm .yarnrc.yml.temp