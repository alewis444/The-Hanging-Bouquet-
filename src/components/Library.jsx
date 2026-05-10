import { useState } from "react";
import { flowers, ZONES, FLOWER_IMAGES } from "../data/flowers";

const ROLE_LABEL = { upright: "Thriller", mounder: "Filler", trailer: "Spiller" };

export default function Library() {
  const [filterSeason, setFilterSeason] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = flowers.filter((f) => {
    const matchSeason = filterSeason === "all" || f.seasons.includes(filterSeason);
    const matchZone = filterZone === "all" || f.zones.includes(filterZone);
    const matchRole = filterRole === "all" || f.role === filterRole;
    const matchSearch =
      search === "" ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.latin.toLowerCase().includes(search.toLowerCase());
    return matchSeason && matchZone && matchRole && matchSearch;
  });

  return (
    <div className="library-container">
      <h2 className="library-title">Flower Library</h2>
      <p className="library-sub">All {flowers.length} flowers in the catalog.</p>

      <div className="library-filters">
        <input
          className="library-search"
          type="text"
          placeholder="Search by name or latin…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterSeason}
          onChange={(e) => setFilterSeason(e.target.value)}
        >
          <option value="all">All seasons</option>
          {["spring", "summer", "autumn", "winter"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={filterZone}
          onChange={(e) => setFilterZone(e.target.value)}
        >
          <option value="all">All zones</option>
          {ZONES.map((z) => (
            <option key={z.id} value={z.id}>
              {z.label}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All roles</option>
          <option value="upright">Thriller (Upright)</option>
          <option value="mounder">Filler (Mounder)</option>
          <option value="trailer">Spiller (Trailer)</option>
        </select>
      </div>

      <div className="library-count">{filtered.length} flowers</div>

      <div className="lib-card-grid">
        {filtered.map((f) => (
          <div key={f.id} className="lib-card">
            <div className="lib-card-img-wrap">
              <img
                src={FLOWER_IMAGES[f.id]}
                alt={f.name}
                className="lib-card-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add("lib-card-img-placeholder");
                }}
              />
            </div>
            <div className="lib-card-body">
              <div className="lib-card-name">{f.name}</div>
              <div className="lib-card-latin">{f.latin}</div>
              <div className="lib-card-meta">
                <span className={`role-badge role-${f.role}`}>{ROLE_LABEL[f.role]}</span>
                <span className="lib-card-weeks">{f.weeksToBloom} wks</span>
              </div>
              <div className="lib-card-seasons">
                {f.seasons.map((s) => (
                  <span key={s} className={`season-chip season-${s}`}>{s}</span>
                ))}
              </div>
              <div className="lib-card-desc">{f.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
