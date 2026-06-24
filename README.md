# Expenses Manager
 
A personal expense manager built with Angular 20+ and Tailwind CSS.
 
## Overview
 
App to track monthly expenses grouped by credit cards, services, and upcoming due dates. All data is persisted in localStorage.
 
## Tech Stack
 
- **Framework:** Angular 20
- **Styling:** Tailwind CSS v4
- **State Management:** Angular Signals
- **Storage:** localStorage (future: backend API)
## Project Structure
 
```
src/app/
│
├── models/
│   ├── base.model.ts          # Base interface (id, nombre, icono?)
│   ├── tarjeta.model.ts       # Extends base — credit card with cuotas[]
│   ├── cuota.model.ts         # Extends base — installment (cuotaActual/cuotaTotal)
│   └── servicio.model.ts      # Extends base — monthly service (luz, gas, etc.)
│
├── services/
│   └── gastos.ts              # Central service — signals, localStorage, CRUD, modal state
│
└── components/
    ├── layout/
    │   ├── nav/               # Collapsible sidebar with action buttons
    │   └── footer/
    └── features/
        ├── tarjetas/          # Displays credit card list
        ├── tarjeta-form/      # Modal form to add/edit a tarjeta
        ├── cuotas/            # Displays installments per card
        ├── cuota-form/        # Modal form to add/edit a cuota
        ├── servicios/         # Displays monthly services
        ├── servicio-form/     # Modal form to add/edit a servicio
        └── proximos-vencimientos/  # Sorted list of upcoming due dates
```
 
## Features
 
- [x] Credit card tracking with fixed monthly total
- [x] Installment tracking per card (informational, e.g. "Notebook 4/12")
- [x] Monthly services tracking (luz, gas, internet, etc.)
- [x] Upcoming due dates sorted by proximity
- [x] Collapsible sidebar navigation
- [x] Modal forms for adding data
- [x] localStorage persistence
## Pending / Roadmap
 
- [ ] Edit and delete for tarjetas, servicios, cuotas
- [ ] Servicio form and cuota form
- [ ] Proximos vencimientos component
- [ ] Responsive layout (mobile)
- [ ] User login / authentication
- [ ] Replace localStorage with backend API
- [ ] `empresa` field in forms will become a `<select>` loaded from DB with company name + icon

## Notes
 
- `monto` in `Tarjeta` is the fixed total from the bank statement — not calculated from cuotas
- `cuotas` are informational only — they don't affect the card total
- Modal state is managed centrally in `GastosService` via a `string | null` signal
- Icons are optional (`icono?`) on all models — to be implemented visually later
