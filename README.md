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

## 주석 컨벤션

VSC `Todo Tree` Extension에서 제공하는 TODO 리스트 관리를 합니다.

```bash
Name: Todo Tree
Id: Gruntfuggly.todo-tree
Description: Show TODO, FIXME, etc. comment tags in a tree view
Version: 0.0.226
Publisher: Gruntfuggly
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree
```

해당 익스텐션을 설치하지 않더라도 인라인에 주석은 아래의 tag를 이용하여 주석을 기록합니다

- `TODO`: 예정되어 있는 구현. 리펙토링 필요
  - `TODO`: 카카오톡 로그인 로직 연결하기`
  - `TODO`: 절차지향 for 문을 함수형 고차함수로 리펙토링
- `FIXME`: 수정이 필요한 버그, 오류, 또는 잘못된 동작
  - `FIXME`: 상품이 존재하지 않을 때 예외 처리
- `HACK`: workaround. 임시방편으로 동작하는 코드. FIXME 보다 시급도가 낮은 경우
  - `HACK` : 응급조치로 우선 하드코딩을 적용하였습니다
- `XXX`": 코드나 문서를 검토할 때 주의해야 할 부분을 강조하는 데 사용되며 주로 버그 또는 잠재적인 문제를 가리키는 데 사용되며 개선이 필요한 부분을 의미합니다.
  - `XXX`: 상품 정보가 많아 질 때, 해당 코드에서 오류가 발생할 가능성이 있습니다.
- `[ ]`: 단순한 체크박스를 남길 때 사용합니다.
  - `[ ] 가게 정보 표시하기`

## 구성인원

- [김도현](https://github.com/l-lyun)
- [김영민](https://github.com/99mini)
- [이승민](https://github.com/itslitulinchpin2)
