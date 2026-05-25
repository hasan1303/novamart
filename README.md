# NovaMart — Nuxt 3 E-Commerce

A modern, fully static e-commerce frontend built with Nuxt 3, Vue 3, Pinia, and Tailwind CSS. Powered by the [FakeStore API](https://fakestoreapi.com).

## 🚀 Features

- **Static SPA** — `ssr: false` mode, deploys anywhere (GitHub Pages, Netlify, Vercel)
- **Pinia cart store** — addToCart, removeFromCart, updateQuantity, clearCart + localStorage persistence
- **Dark / Light mode** — system-aware toggle with smooth transitions
- **Product catalog** — search, category filter, price sort
- **Toast notifications** — animated cart add confirmations
- **Loading skeletons** — smooth loading states
- **Responsive** — mobile-first design

## 📁 File Structure

```
nuxt-store/
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── assets/css/main.css            # Global styles + Tailwind layers
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue
│   │   └── AppFooter.vue
│   ├── product/
│   │   ├── ProductCard.vue
│   │   ├── ProductSkeleton.vue
│   │   └── StarRating.vue
│   └── ui/
│       └── ToastContainer.vue
├── composables/
│   ├── useProducts.ts             # FakeStore API wrapper
│   └── useTheme.ts                # Dark/light mode
├── pages/
│   ├── index.vue                  # Homepage
│   ├── cart.vue                   # Cart page
│   └── products/
│       ├── index.vue              # All products + filters
│       └── [id].vue               # Product detail
├── stores/
│   ├── cart.ts                    # Pinia cart store
│   └── toast.ts                   # Pinia toast store
├── nuxt.config.ts
├── tailwind.config.js
└── package.json
```

## 🛠 Setup

```bash
npm install
npm run dev        # Development
npm run generate   # Build static site → .output/public
npm run preview    # Preview generated site
```

## 🌐 GitHub Pages Deployment

1. Push to GitHub repo (e.g. `my-nuxt-store`)
2. Go to **Settings → Pages → Source: GitHub Actions**
3. The workflow in `.github/workflows/deploy.yml` auto-deploys on every push to `main`
4. Site available at: `https://yourusername.github.io/my-nuxt-store/`

> The workflow automatically sets `NUXT_APP_BASE_URL` to `/<repo-name>/` so all assets load correctly.

## 🎨 Design System

- **Fonts:** Syne (display) + DM Sans (body)
- **Colors:** Dark Navy (#0d1635) + Electric Blue (#00b4e6)
- **CSS variables** for dark/light theme switching
- **Tailwind custom** colors, animations, and component classes
