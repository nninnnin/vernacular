---
title: 버튼 다형성
title_en: Button Polymorphism
---

# Button Polymorphism

## 문제

Button 컴포넌트를 `<a>`, `<Link>` 등 다른 엘리먼트로도 렌더링해야 하는 상황이 있다.
예: 사이드바 내비게이션 아이템 — 버튼처럼 생겼지만 실제로는 링크여야 함.

```html
<!-- 잘못된 구조 -->
<button>
  <a href="/colors">색상</a>
</button>
```

## 검토한 방법들

### 1. `as` prop
```tsx
<Button as={Link} href="/colors" variant="ghost">색상</Button>
```
- 직관적이지만 TypeScript 타입 정의가 복잡해짐
- `as`에 따라 허용 props가 달라져야 해서 제네릭 처리 필요

### 2. `buttonVariants` 유틸 함수
```tsx
<Link href="/colors" className={buttonVariants({ variant: "ghost" })}>색상</Link>
```
- 구현이 단순하고 어떤 엘리먼트에든 적용 가능
- **문제:** 디자인 시스템이 단일 진입점을 잃음. 사용하는 쪽이 엘리먼트를 자유롭게 선택하다 보면 의미에 맞지 않는 엘리먼트(`<div>` 등)를 쓸 수 있고, 스타일 변경 시 추적이 어려워짐

### 3. `asChild` 패턴 (shadcn, Radix UI 방식)
```tsx
<Button asChild variant="ghost">
  <Link href="/colors">색상</Link>
</Button>
```
- Button이 `<button>` 렌더링을 포기하고 자식 엘리먼트에 스타일과 props를 위임
- 결과 DOM: `<a href="/colors" class="...버튼스타일...">`
- 스타일만 빌려주고 동작의 책임은 사용하는 쪽으로 넘어감
- **문제:** 시스템이 semantic behavior를 보장할 수 없음. 사용자가 `<div>`에 asChild를 쓰면 버튼처럼 생겼지만 키보드 접근이 안 되는 상황이 생길 수 있음. 자유도가 높은 만큼 잘못 쓸 여지도 크고 트래킹도 어려움.

### 4. 컨텍스트 기반 분기
```tsx
<Button href="/colors" variant="ghost">색상</Button>
```
- Button은 시각적 역할로 정의됨. `href` 유무 등 컨텍스트를 시스템이 읽고 적절한 엘리먼트(`<button>` 또는 `<a>`)를 결정함
- 사용자는 Button 하나만 알면 되고, 엘리먼트 선택은 시스템이 보장

## 결론

**컨텍스트 기반 분기**를 채택한다.

컴포넌트는 시각적 역할로 정의된다. 사용자는 "버튼처럼 생겼다"는 것만 알면 되고, 그게 `<button>`인지 `<a>`인지는 시스템이 컨텍스트를 보고 결정한다. 사용자가 `href`를 넘기는 건 의도를 선언하는 것이고, 그 의도에 맞는 올바른 엘리먼트와 동작은 시스템이 보장한다.

asChild보다 닫혀있는 구조지만, 그것이 목적이다. 시스템이 허용한 컨텍스트 안에서만 동작하기 때문에 잘못 쓸 여지가 없고, 사용 현황 트래킹이 가능하며, "올바르게 쓰는 것이 가장 쉬운" 구조가 된다.

이 결정은 아래와 같이 [설계 원칙](../principles/index.md)을 반영한다.

- **디자인 시스템이 의미와 스타일을 함께 소유한다** — `href` 유무에 따른 엘리먼트 분기를 시스템 내부에서 처리함으로써, 사용하는 쪽이 아닌 시스템이 semantic behavior를 보장한다.
- **컴포넌트는 시각적 역할로 정의된다** — 사용자는 Button 하나만 알면 된다. `<button>`인지 `<a>`인지는 사용자가 선언한 컨텍스트(`href`)를 보고 시스템이 결정한다.
- **올바르게 쓰는 것이 가장 쉬운 구조를 만든다** — asChild처럼 엘리먼트를 직접 주입하는 탈출구를 열어두지 않기 때문에 잘못 쓸 여지가 없고, 모든 사용이 시스템을 통해 트래킹된다.
