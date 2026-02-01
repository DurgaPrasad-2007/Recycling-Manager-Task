# Recycling Production Line Manager Selection System
<img width="1549" height="1209" alt="image" src="https://github.com/user-attachments/assets/6a757edd-b1dd-44d3-8738-82ef57899a4c" />

**Repository Description:**
A comprehensive candidate selection and ranking system for a Recycling Production Line Manager role, featuring a MySQL-backed database schema with auto-ranking triggers, detailed AI evaluation prompts with scoring rubrics, and an interactive React 19 + Mantine 8 dashboard.

## Features

- **Leaderboard**: View top 10 candidates with detailed scoring breakdown
- **Skill Heatmap**: Visual matrix of all candidates' evaluation scores
- **Candidate Cards**: Detailed profiles with skills, certifications, and scores
- **Search & Filter**: Find candidates by name, skills, or certifications
- **Share Candidate**: Copy candidate profiles to share with stakeholders

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6
- **UI Library**: Mantine UI v8
- **Database**: MySQL (Schema with Ranking Triggers)
- **Styling**: Vanilla CSS with Sustainability Dark Theme

## Quick Start

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) (Recommended for stable dependency resolution)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd recycling-manager-system

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the dashboard.

### Production Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```
recycling-manager-system/
├── src/
│   ├── components/       # UI components (Leaderboard, Heatmap, etc.)
│   ├── data/
│   │   └── candidates.json   # 40 generated candidate profiles
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx           # Main application shell
│   ├── main.tsx          # Entry point
│   └── styles.css        # Global design system & animations
├── database/
│   ├── schema.sql            # MySQL table definitions & triggers
│   └── seed-data.sql         # Sample candidates & evaluations
├── ai-prompts.md             # AI evaluation documentation & rubrics
└── README.md
```

## Database Setup

Load the schema and seed data into MySQL:

```bash
mysql -u username -p database_name < database/schema.sql
mysql -u username -p database_name < database/seed-data.sql
```

## Evaluation Criteria

Candidates are scored on three dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Crisis Management | 35% | Decision-making under pressure |
| Sustainability | 35% | Environmental and regulatory knowledge |
| Team Motivation | 30% | Leadership and people management |

See [ai-prompts.md](./ai-prompts.md) for detailed evaluation prompts and rubrics.

## Development

```bash
# Run linter
pnpm lint

# Build for production
pnpm build
```

## License

MIT
