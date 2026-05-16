# Expense Tracker Dashboard

A modern, responsive personal finance tracking workspace built using pure vanilla web technologies. This application features complex data orchestration, persistent storage synchronization, multi-frame rendering layouts, and reactive statistical graphs.

## 🚀 Key Features

- **Financial Performance Overview:** Real-time metrics engine tracking total revenue, transactional expenditures, net balances, and adaptive percentage-based savings rates.
- **Dynamic Chart.js Visualization:** Responsive statistical analytics graphs rendering granular breakdowns of monthly income streams, expense allocations, and multi-month trends.
- **Modular Transactional Architecture:** Multi-frame logging systems that separate running ledgers into structured subsets for Income streams, Expenditures, and Custom Categories.
- **Persistent State Engines:** Zero-backend required. All transactional histories, current liquid balances, metrics arrays, and categorical tokens are serialized and retained utilizing browser localStorage APIs.
- **Automated Rollover Engine:** Built-in date verification system executing automated reconciliation tasks at monthly boundaries—archiving past active records seamlessly into a structured `Old Logs` historical repository.
- **Modern Responsive Design:** Crafted around cohesive utility tokens utilizing custom layout workflows, modal popup queues, smooth transforms, and media breakpoint adapters.

## 🛠️ Built With

- **Frontend:** HTML5 (Semantic Structure)
- **Styling:** CSS3 (Custom Grid Layouts, Flexbox Systems, Variables/Design Tokens)
- **Log Engine:** JavaScript (ES6 Modules, Event Delegation, Multi-window/Iframe DOM Syncing)
- **State Engine:** Browser Web Storage (LocalStorage API API)
- **Visual Analytics:** Chart.js Library via CDN Integration

## 📂 File Architecture

```text
├── index.html            # Main dashboard overview containing KPIs, charts, & actions modals
├── logs.html             # Multi-frame structural view containing iframe transaction trackers
├── saving.html           # Dedicated long-term analytics page tracking monthly insight metrics
├── logsIncome.html       # Isolated ledger tracking revenue metrics and active balances
├── logsExpenses.html     # Isolated ledger tracking categorical outflows and array state modifications
├── logsCategory.html     # Isolated registry handling categorical parameters
├── oldlogs.html          # Secondary viewport displaying archived multi-month parameters
├── script.js             # Core functional script managing transactional states, DOM logic, & localStorage
└── style.css             # Main stylesheet providing global tokens, structural components, & breakpoints
