# vector94.github.io

## Knowledge Graph (RAG)

A graphify knowledge graph of this codebase lives at `graphify-out/`.

**Before answering questions about architecture, content, skills, projects, or any entity in this repo — query the graph first:**

```bash
# Check graph exists
python3 -c "from pathlib import Path; print(Path('graphify-out/graph.json').exists())"

# Query the graph
/graphify query "<your question>"
```

Key files:
- `graphify-out/graph.json` — raw graph (192 nodes, 298 edges, 23 communities)
- `graphify-out/GRAPH_REPORT.md` — audit report with god nodes and community map

**What the graph covers:**
- Portfolio owner: Md Asif Iqbal Ahmed (vector94) — skills, education, experience, projects
- Projects: Iker Finance (.NET Core + PostgreSQL), Nazar (FastAPI + TimescaleDB + RabbitMQ + Slack)
- Competitive programming achievements: ICPC Dhaka Regional, Codeforces Expert, LeetCode Knight, multiple university contests
- Frontend JS stack: jQuery, Bootstrap, Isotope, particles.js, main.js initialization logic
- Visual assets: background images, portfolio achievement images, project screenshots

**To rebuild after changes:**
```bash
/graphify . --update
```
