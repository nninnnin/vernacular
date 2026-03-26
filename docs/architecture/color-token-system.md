---
title: 색상 토큰 시스템
title_en: Color Token System
---

# Color Token System

## 개요

색상 토큰을 두 레이어로 분리한다. seed에서 palette를 생성하고, palette에서 semantic 토큰을 파생한다.

```
seed → palette → semantic
```

사용자는 seed만 결정하면 나머지는 자동으로 생성된다. seed가 바뀌면 palette와 semantic은 전부 재계산된다.

---

## 레이어 구조

### Layer 1: Seed

사용자가 직접 선택하는 값.

```typescript
type ColorSeed = {
  neutral: string;        // "zinc" | "slate" | "gray" | "stone"
  accent: string;         // hex color, e.g. "#0066FF"
  mode: "light" | "dark";
};
```

- `neutral` — UI 전반의 gray 계열 색조 결정. 미리 정의된 팔레트 중 선택.
- `accent` — 브랜드 컬러. 임의 hex 값을 받아 스케일을 자동 생성.
- `mode` — light/dark. semantic 토큰의 매핑 방향을 결정.

### Layer 2: Palette

Seed에서 자동 생성되는 11단계 스케일 (50–950).

```typescript
type ColorPalette = {
  neutral: Scale;   // neutralPalettes[seed.neutral]
  accent: Scale;    // generateAccentScale(seed.accent)
};
```

- `neutral`은 하드코딩된 팔레트 테이블에서 조회.
- `accent`는 hex → HSL 변환 후 lightness를 단계적으로 보간해 생성.

팔레트는 노출하되 직접 편집은 받지 않는다. seed를 통해서만 바꾼다.

### Layer 3: Semantic

Palette를 참조해 역할(role)에 값을 매핑한 토큰. 컴포넌트가 실제로 참조하는 레이어.

```typescript
type ColorSemantic = {
  background, foreground,
  primary, "primary-foreground",
  secondary, "secondary-foreground",
  muted, "muted-foreground",
  border, input, ring,
  destructive, "destructive-foreground",
};
```

Light 모드 예시:

| Token | Source |
|---|---|
| `background` | `neutral[50]` |
| `foreground` | `neutral[950]` |
| `primary` | `accent[600]` |
| `primary-foreground` | `accent[50]` |
| `muted` | `neutral[100]` |
| `muted-foreground` | `neutral[500]` |
| `border` | `neutral[200]` |

Dark 모드는 neutral/accent의 방향을 반전한다 (950→50, 400 대신 600 등).

---

## 상태 관리

`useTokenStore`의 `setSeed(partial: Partial<ColorSeed>)`를 호출하면:

1. 기존 seed에 partial을 병합
2. `generatePalette(seed)` 실행
3. `generateSemantic(palette, seed.mode)` 실행
4. `tokens.color` 전체 교체

편집 내역은 보존하지 않는다. seed가 바뀌면 semantic도 전부 재계산.

---

## 파일 위치

- `apps/web/lib/tokens.ts` — 타입, 생성 함수, 기본값
- `apps/web/lib/store.ts` — Zustand 스토어, `setSeed` 액션
- `apps/web/components/pages/foundation/Colors.tsx` — 팔레트 및 시맨틱 토큰 표시
