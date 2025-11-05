# Component Code Examples

Concrete code patterns demonstrating good and bad design implementations.

## Button Examples

### Good Button Implementation

```jsx
// React/Tailwind
<button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                   text-white px-6 py-3 rounded-lg
                   shadow-sm hover:shadow-md
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed">
  Submit
</button>

// HTML/CSS
<button class="btn-primary">Submit</button>

.btn-primary {
  background: #0066CC;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #0052A3;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn-primary:active {
  background: #003D7A;
  box-shadow: none;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Bad Button Implementation

```jsx
// ❌ Bad: Gradient, inconsistent spacing, no states
<button className="bg-gradient-to-r from-purple-500 to-blue-500
                   text-white px-4 py-2 rounded-full">
  Submit
</button>

// ❌ Bad: No hover state, poor spacing
.btn-bad {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 14px;  /* Inconsistent with 8px grid */
  border-radius: 50px;  /* Overly rounded */
}
```

## Card Examples

### Good Card Implementation

```jsx
// React/Tailwind
<div className="bg-white rounded-lg border border-gray-200 p-8">
  <h3 className="text-2xl font-semibold mb-4">Card Title</h3>
  <p className="text-gray-600 mb-6">Card description goes here.</p>
  <button className="...">Action</button>
</div>

// HTML/CSS
<div class="card">
  <h3 class="card-title">Card Title</h3>
  <p class="card-description">Card description goes here.</p>
  <button class="btn-primary">Action</button>
</div>

.card {
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  padding: 32px;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1A1A1A;
}

.card-description {
  font-size: 16px;
  color: #666666;
  margin-bottom: 24px;
  line-height: 1.5;
}
```

### Bad Card Implementation

```jsx
// ❌ Bad: Border AND shadow, inconsistent spacing, gradient
<div className="bg-gradient-to-br from-purple-50 to-blue-50
                border-2 border-purple-300 rounded-3xl p-5
                shadow-2xl">
  <h3 className="text-lg mb-3">Title</h3>
  <p className="text-sm mb-5">Description</p>
</div>

// ❌ Bad: Heavy shadow, inconsistent spacing
.card-bad {
  background: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 18px;  /* Not on 8px grid */
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);  /* Too heavy */
}
```

## Form Examples

### Good Form Implementation

```jsx
// React/Tailwind
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Email
    </label>
    <input 
      type="email"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg
                 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-20
                 disabled:bg-gray-50 disabled:text-gray-500"
      placeholder="you@example.com"
    />
  </div>
  
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Password
    </label>
    <input 
      type="password"
      className="w-full px-4 py-3 border border-red-600 rounded-lg"
    />
    <p className="text-red-600 text-sm mt-2">Password is required</p>
  </div>
  
  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
    Sign In
  </button>
</form>

// HTML/CSS
<form class="form">
  <div class="form-field">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-input" placeholder="you@example.com">
  </div>
  
  <div class="form-field">
    <label for="password" class="form-label">Password</label>
    <input type="password" id="password" class="form-input error">
    <span class="form-error">Password is required</span>
  </div>
  
  <button type="submit" class="btn-primary">Sign In</button>
</form>

.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
  margin-bottom: 8px;
}

.form-input {
  height: 40px;
  padding: 0 16px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #0066CC;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-input.error {
  border-color: #D32F2F;
}

.form-error {
  color: #D32F2F;
  font-size: 14px;
  margin-top: 8px;
}

.form-input:disabled {
  background: #F5F5F5;
  color: #BDBDBD;
  cursor: not-allowed;
}
```

### Bad Form Implementation

```jsx
// ❌ Bad: Placeholder as label, inconsistent spacing, no error states
<form className="space-y-4">
  <input 
    type="email"
    className="w-full p-2 border rounded"
    placeholder="Email"
  />
  <input 
    type="password"
    className="w-full p-2 border rounded"
    placeholder="Password"
  />
  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3">
    Sign In
  </button>
</form>
```

## Navigation Examples

### Good Navigation Implementation

```jsx
// React/Tailwind
<nav className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <a href="/" className="text-xl font-semibold">Logo</a>
        <div className="flex gap-4">
          <a href="/home" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
            Home
          </a>
          <a href="/about" className="px-3 py-2 rounded-md bg-gray-100 text-gray-900">
            About
          </a>
          <a href="/contact" className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
            Contact
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

// HTML/CSS
.nav {
  background: white;
  border-bottom: 1px solid #E0E0E0;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 32px;
}

.nav-link {
  padding: 8px 16px;
  color: #666666;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-link:hover {
  background: #F5F5F5;
  color: #1A1A1A;
}

.nav-link.active {
  background: #F5F5F5;
  color: #1A1A1A;
  font-weight: 600;
}
```

### Bad Navigation Implementation

```jsx
// ❌ Bad: Too many items, no active state, inconsistent spacing
<nav className="bg-gradient-to-r from-blue-500 to-purple-600">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/services">Services</a>
  <a href="/portfolio">Portfolio</a>
  <a href="/team">Team</a>
  <a href="/blog">Blog</a>
  <a href="/careers">Careers</a>
  <a href="/contact">Contact</a>
</nav>
```

## Layout Examples

### Good Layout Structure

```jsx
// React/Tailwind - Dashboard Layout
<div className="min-h-screen bg-gray-50">
  <nav className="bg-white border-b border-gray-200 h-16">
    {/* Navigation */}
  </nav>
  
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Card 1</h3>
        <p className="text-gray-600">Content</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Card 2</h3>
        <p className="text-gray-600">Content</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4">Card 3</h3>
        <p className="text-gray-600">Content</p>
      </div>
    </div>
  </div>
</div>

// HTML/CSS
.layout {
  min-height: 100vh;
  background: #FAFAFA;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .container {
    padding: 16px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

## Color Palette Examples

### Good Palette - Professional SaaS

```css
:root {
  /* Base */
  --color-bg: #FFFFFF;
  --color-surface: #F9F9F9;
  --color-border: #E0E0E0;
  
  /* Text */
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #666666;
  --color-text-disabled: #BDBDBD;
  
  /* Accent */
  --color-accent: #0066CC;
  --color-accent-hover: #0052A3;
}
```

### Good Palette - Creative Portfolio

```css
:root {
  /* Base */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-border: #EEEEEE;
  
  /* Text */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  
  /* Accent */
  --color-accent: #E65100;  /* Warm orange */
  --color-accent-hover: #CC4700;
}
```

### Bad Palette

```css
/* ❌ Bad: Too many colors, no system */
:root {
  --color-primary: #667eea;
  --color-secondary: #f093fb;
  --color-tertiary: #4facfe;
  --color-success: #00f260;
  --color-warning: #ffd93d;
  --color-info: #6bcf7f;
  --color-danger: #fa709a;
}
```

## Spacing Examples

### Good Spacing System

```css
/* Use this spacing scale consistently */
:root {
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
}

/* Component spacing */
.card {
  padding: var(--space-4);  /* 32px */
  margin-bottom: var(--space-3);  /* 24px */
}

.button {
  padding: var(--space-2) var(--space-3);  /* 16px 24px */
}
```

### Bad Spacing

```css
/* ❌ Bad: Random values, no system */
.card {
  padding: 22px;  /* Not on grid */
  margin-bottom: 18px;  /* Not on grid */
}

.button {
  padding: 11px 19px;  /* Arbitrary values */
}
```
