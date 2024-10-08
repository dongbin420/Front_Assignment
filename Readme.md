# Drag and Drop

<div align="center">
<img src="https://github.com/user-attachments/assets/c3b84cf2-9c28-4145-9445-cfa9b729d926" alt="draganddrop">
</div>

이 프로젝트는 `Webpack` 설정을 직접 구성하고, `react-beautiful-dnd` 라이브러리를 사용하여 드래그 앤 드롭 기능을 구현한 `React` 애플리케이션입니다. 요구 사항에 따라 다양한 드래그 제약 조건과 멀티 드래그 기능을 추가하였으며, 네 개의 칼럼 간의 아이템 이동을 지원합니다. 또한, UI/UX를 고려한 직관적이고 심플한 디자인으로 설계되었습니다.

## 요구사항 구현률

| 기능 | 구현률 | 설명 |
| ---- | ---------- | ----- |
| **Webpack 적용** | ✅ 100% | `react-scripts` 없이 Webpack 설정을 완료하고 `React` 애플리케이션 빌드 및 개발 환경을 구성 |
| **칼럼 확장** | ✅ 100% | 하나의 칼럼을 네 개로 확장하였으며, 각 칼럼은 독립적인 드래그 앤 드롭 영역을 가짐 |
| **드래그 제약 조건** | ✅ 100% | 1번 칼럼에서 3번 칼럼으로의 이동 제한 및 짝수 아이템의 제약 조건을 적용 |
| **멀티 드래그 기능** | ✅ 100% | 사용자가 여러 아이템을 선택한 후 한꺼번에 드래그하여 이동할 수 있도록 구현 |
| **UI/UX** | ✅ 90% | 드래그 또는 드랍이 불가능한 경우 시각적 피드백을 추가, 사용성을 고려한 리셋 버튼 및 규칙 툴팁 구현, 반응형 UI 적용, 동시 이동 애니메이션은 구현 보류(아래 '고민했던 부분'에 관련 내용 설명) |

## 고민했던 부분

### 같은 칼럼 내 멀티 드래그 및 동시 이동 애니메이션

   - `react-beautiful-dnd`는 멀티 드래그를 기본 기능으로 지원하지 않기 때문에, 단일 드래그 기능을 활용해 멀티 드래그를 구현해야 했습니다.
  
   - 예시로, `destination.index`를 멀티 드래그에 맞게 조정하는 함수를 작성하여, 드래그된 여러 요소가 올바른 위치에 적용되도록 처리했습니다.
  
   - 이와 비슷한 맥락에서, 멀티 드래그 시 동시 이동 애니메이션 적용을 고민했으나, 기본 애니메이션 로직이 `react-beautiful-dnd` 내부에서 처리되기 때문에, 해당 부분을 커스터마이징하는 데 복잡성과 시간적 한계가 발생하였고, 구현을 보류하게 되었습니다.

###  멀티 드래그 아이템 선택 시, 같은 칼럼에 있는 아이템들만 함께 선택할 수 있도록 구현

   - 사용자 입장에서 생각해봤을 때, 멀티 드래그의 결과가 이전 위치의 순서를 유지하는 것이 더 직관적이라고 판단했습니다.

   - 같은 칼럼에 있는 아이템들끼리는 순서가 명확하게 정해져 있지만, 여기에 다른 칼럼에 있는 아이템들이 추가되면 그 순서를 결정할 명확한 기준이 없어집니다. 따라서, 멀티 드래그 시 같은 칼럼에 있는 아이템들만 함께 선택할 수 있도록 구현했습니다. 

## 프로젝트 실행

### 패키지 설치

프로젝트를 실행하기 전, 프로젝트의 의존성을 설치합니다.

```bash
npm install
```

### 개발 서버 실행

개발 환경에서 애플리케이션을 실행하려면 아래 명령어를 사용하세요. Webpack 개발 서버를 실행하며, 코드 수정 시 자동으로 페이지가 새로고침됩니다.

```bash
npm run start
```

### 프로덕션 빌드

프로덕션 환경을 위한 빌드를 생성하려면 아래 명령어를 실행하세요. 이 명령어는 Webpack을 사용하여 프로덕션 번들 파일을 생성합니다.

```bash
npm run build:prod
```
