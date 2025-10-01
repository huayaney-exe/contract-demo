# Peru Contract Flow - BPI Design System Update

## Overview
Updated the Peru Contract Flow React application to align with the Interbank Banca por Internet (BPI) design system from `banca-por-internet-v2.html`.

## Changes Made

### 1. CSS Variables (`src/index.css`)

#### Colors - Exact BPI Palette
- **Primary Green**: `#05BE50` (was different shade)
- **Secondary Blue**: `#0039A6` (exact match)
- **Gray Scale**: Full 9-step scale matching BPI (gray-50 to gray-900)
- **Status Colors**: Success `#00A94F`, Error `#EB0046`

#### Border Radius - BPI Spec
- `--radius`: 5px (base)
- `--radius-lg`: 20px
- `--radius-xl`: 24px
- `--radius-full`: 30px

#### Shadows - BPI Spec
- `--shadow-sm`: `0px 1px 4px rgba(0, 0, 0, 0.10)`
- `--shadow-md`: `0px 4px 10px rgba(0, 0, 0, 0.05)`

### 2. Typography

#### Fonts
- **Primary**: Montserrat (body text)
- **Headings**: Geometria (with Montserrat fallback)
- **Secondary**: Inter (data, numbers)

#### Heading Styles
```css
h1: text-4xl/5xl, font-medium, line-height: 1.2
h2: text-3xl/4xl, font-medium, line-height: 1.2  
h3: text-2xl/3xl, font-medium, line-height: 1.3
h4: text-xl, font-medium, line-height: 1.4
```

#### Input/Button Typography
- Font: Geometria/Montserrat
- Size: 16px (inputs), 14px (buttons)
- Weight: 500 (medium)
- Letter spacing: 0.1px (buttons)

### 3. Component Classes

#### BPI Button Styles
```css
.ibk-button {
  height: 48px;
  padding: 0 32px;
  border-radius: 24px;
  font-family: 'Geometria', 'Montserrat';
  font-size: 14px;
  font-weight: 500;
}

.ibk-button--primary {
  background: #05BE50;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.10);
}

.ibk-button--secondary {
  border: 1px solid #05BE50;
  color: #05BE50;
  background: transparent;
}
```

#### BPI Card Styles
```css
.ibk-card {
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 16px;
}
```

#### BPI Input Styles
```css
.ibk-input {
  padding: 13.42px 12px;
  border: none;
  border-bottom: 1px solid #D9DADB;
  font-size: 16px;
  font-weight: 500;
}

.ibk-input:focus {
  border-bottom-color: #64B4E6;
}
```

#### BPI Stepper Styles
```css
.ibk-stepper__circle {
  width: 32px;
  height: 32px;
  border-radius: 30px;
}

.ibk-stepper__circle--active {
  background: #0039A6;
  outline: 8px solid #CCD7ED;
}
```

### 4. Tailwind Config Updates

#### New Color Variables
```typescript
'interbank-primary-green': 'hsl(var(--interbank-primary-green))',
'interbank-primary-green-light': 'hsl(var(--interbank-primary-green-light))',
'interbank-primary-green-bg': 'hsl(var(--interbank-primary-green-bg))',
'interbank-secondary-blue': 'hsl(var(--interbank-secondary-blue))',
'interbank-secondary-blue-light': 'hsl(var(--interbank-secondary-blue-light))',
// ... plus full gray scale and status colors
```

#### New Font Families
```typescript
fontFamily: {
  sans: ['Montserrat', 'system-ui', 'sans-serif'],
  secondary: ['Inter', 'system-ui', 'sans-serif'],
  corporate: ['Geometria', 'Montserrat', 'sans-serif'],
}
```

#### BPI Spacing Scale
```typescript
spacing: {
  'xs': '4px',
  'sm': '8px',
  'md': '12px',
  'lg': '16px',
  'xl': '24px',
  '2xl': '32px',
  '3xl': '48px',
  '4xl': '96px',
}
```

## Usage Guide

### Using BPI Colors in Components

```tsx
// Primary green button
<button className="bg-interbank-primary-green text-white">
  Continuar
</button>

// Secondary blue text
<h2 className="text-interbank-secondary-blue">
  Título
</h2>

// Gray backgrounds
<div className="bg-interbank-gray-100">
  Content
</div>
```

### Using BPI Component Classes

```tsx
// BPI button
<button className="ibk-button ibk-button--primary">
  Enviar
</button>

// BPI card
<div className="ibk-card">
  <h3 className="ibk-card__title">Card Title</h3>
</div>

// BPI input
<input className="ibk-input" placeholder="Ingrese RUC" />

// BPI stepper
<div className="ibk-stepper__circle ibk-stepper__circle--active">
  1
</div>
```

### Using BPI Typography

```tsx
// Heading with corporate font
<h1 className="font-corporate">
  Título Principal
</h1>

// Body text with Montserrat
<p className="font-sans">
  Texto descriptivo
</p>

// Data/numbers with Inter
<span className="font-secondary">
  123,456.78
</span>
```

## Migration Notes

### Existing Components
Components using the old design system will need to:
1. Replace color classes with new BPI colors
2. Update button styles to use `.ibk-button` classes
3. Update card styles to use `.ibk-card` classes
4. Verify font weights (BPI uses 500 "medium" not 600 "semibold")
5. Update border radius to BPI spec (5px base, 20px/24px/30px for larger)

### Breaking Changes
- Font weights changed from semibold (600) to medium (500)
- Border radius changed from 0.5rem (8px) to 0.3125rem (5px)
- Some color HSL values changed to match exact BPI hex values
- Shadow values updated to match BPI specification

## Design System Alignment

✅ **Aligned with BPI**:
- Exact color palette (#05BE50, #0039A6, full gray scale)
- Typography (Geometria headings, Montserrat body)
- Border radius (5px, 20px, 24px, 30px)
- Shadows (sm/md specifications)
- Button styles (height, padding, border-radius)
- Input styles (bottom border only, specific padding)
- Spacing scale (4px to 96px)

## Next Steps

1. **Audit existing components** for design system compliance
2. **Update Button component** to use `.ibk-button` classes
3. **Update Input component** to use `.ibk-input` classes
4. **Update Card component** to use `.ibk-card` classes
5. **Test visual consistency** across all form pages
6. **Review hover/focus states** to match BPI interactions

## Resources

- **Reference**: `/Users/luishuayaney/Projects/Interbank/ibk-1/banca-por-internet-v2.html`
- **CSS Variables**: `src/index.css` (lines 10-92)
- **Component Classes**: `src/index.css` (lines 186-315)
- **Tailwind Config**: `tailwind.config.ts`
