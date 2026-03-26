---
title: 제한된 다형성
title_en: Constrained Polymorphism
---

# Constrained Polymorphism

## 시작된 이유

설계 원칙을 지키되 확장성을 높이기 위해 시작된 고민이다.

`@vernacular/ui`를 npm으로 배포하면 Next.js, React Router 등 다양한 프레임워크 환경에서 쓰인다. 그런데 Button에 `href`가 생기면 어떤 Link 컴포넌트를 써야 할지 시스템이 알 수 없다. 이 문제를 해결하는 방법으로 asChild 패턴이 거론됐지만, asChild는 우리 원칙인 "디자인 시스템이 의미와 스타일을 함께 소유한다"와 충돌한다 — 스타일만 빌려주고 동작의 책임을 사용하는 쪽에 넘기기 때문이다.

그렇다고 framework에 종속된 구현을 하면 npm 배포 목적이 무너진다. 이 두 가지를 동시에 만족시키기 위해 asChild를 좁힌 형태를 설계했다.

## 문제

```tsx
// asChild — 어떤 엘리먼트든 허용, 시스템이 동작을 보장할 수 없음
<Button asChild>
  <div>잘못된 사용</div>
</Button>
```

## 결정: `asAnchor`

asChild의 위임 방식을 유지하되, 허용하는 엘리먼트를 anchor 계열로 명시적으로 제한한다.

```tsx
<Button asAnchor>
  <Link href="/documentation">Documentation</Link>
</Button>
```

`asAnchor`가 선언되면 자식은 anchor 계열만 허용된다. 시스템이 "이 컨텍스트에서만 위임을 허용한다"고 명시하는 것이다.

## 방어 레이어

잘못된 사용을 세 단계로 차단한다.

**1. 타입 체크** — 컴파일 타임. `asAnchor`가 true일 때 자식 타입을 anchor 계열로 제한해 IDE에서 즉시 피드백.

**2. 런타임 경고** — 타입을 우회했을 때 개발 환경에서 경고.
```tsx
if (process.env.NODE_ENV === 'development' && asAnchor) {
  const type = (children as any)?.type;
  if (type !== 'a' && !isAnchorLike(type)) {
    console.warn('Button asAnchor: 자식은 anchor 계열이어야 해요.');
  }
}
```

**3. 린트 룰** — CI에서 머지 전 차단. 추후 `@vernacular/eslint-plugin`으로 배포하면 사용자 프로젝트에서도 원칙을 강제할 수 있다.

## 이 결정이 반영하는 설계 원칙

- **디자인 시스템이 의미와 스타일을 함께 소유한다** — 위임을 허용하되 anchor 계열로 범위를 좁혀 시스템이 의도한 semantic 맥락을 벗어나지 않도록 한다.
- **올바르게 쓰는 것이 가장 쉬운 구조를 만든다** — 타입, 런타임, 린트 세 단계의 방어로 잘못 쓸 여지를 줄인다.

## 정리

이 설계의 출발점은 **설계 원칙을 지키되 확장성을 높이는 것**이다.

원칙만 고집하면 framework 종속성 문제를 해결할 수 없고, 확장성만 좇으면 asChild처럼 시스템이 동작 보장을 포기해야 한다. `asAnchor`는 이 두 가지 사이에서 시스템이 허용할 맥락을 명시적으로 정의함으로써 원칙과 확장성을 동시에 유지하는 방식이다.

타입 → 런타임 → 린트로 이어지는 방어 레이어는 확장의 문을 열면서도 잘못된 사용을 차단하는 수단이다. 특히 `@vernacular/eslint-plugin`은 이 원칙이 라이브러리 경계를 넘어 사용자 프로젝트까지 전달되는 통로가 된다.

## 향후 과제

- `@vernacular/eslint-plugin` 개발 — 사용자 프로젝트까지 원칙을 강제하는 수단
