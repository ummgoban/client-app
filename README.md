# 2024-2 Capstone

## Preferred Dev Environment

Node 20

## Install instruction

1. install depenency

```bash
$ yarn install
```

2. ios

```bash
$ cd ios
/ios $ pod install
/ios $ cd ..
$ yarn ios

or

$ yarn start
i
```

3. android

```bash
$ yarn android

or

$ yarn start
i
```

## 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/)를 따른다.

### 커밋 메세지 구조

커밋 메시지는 다음과 같은 구조로 되어야 한다.

```bash
<타입>[적용 범위(선택 사항)]: <설명>

[본문(선택 사항)]

[꼬리말(선택 사항)]
```

### 커밋 타입

커밋 타입은 다음과 같다.

- `fix`: 코드베이스에서 버그를 패치
- `feat`: 코드베이스에서 새 기능이 추가됨
- `BREAKING CHANGE`: 단절적 API 변경(breaking API change). 타입/스코프 뒤에 !를 붙이기도 함
- `build`: 빌드 관련 커밋
- `ci`: ci 관련 커밋
- `cd`: cd 관련 커밋
- `chore`: 코드와 관련없는 설정들을 변경했을 때의 커밋
- `docs`: 문서 변경 커밋
- `revert`: 커밋을 되돌렸을 때
- `style`: 단순히 코드를 포맷팅 했을 때
- `test`: 테스트 관련 커밋
- `perf`: 성능개선에 대한 커밋

## 브랜치 컨벤션

- `git-flow` 전략을 사용한다.
- `Create a merge commit` 으로 머지한다.
- branch prefix
  - `feature`: 기능 개발
  - `bugfix`: 버그 수정
  - `release`: 릴리즈
  - `hotfix`: 릴리즈 후 핫 픽스
  - `doce`: README.md 등 문서
  - `chore`: CI/CD, build, dependency 등의 수정

## 코드 컨벤션

- `prettier` 에서 제공하는 컨벤션을 따른다.

## 구성인원

- [김도현](https://github.com/l-lyun)
- [김영민](https://github.com/99mini)
- [이승민](https://github.com/itslitulinchpin2)
