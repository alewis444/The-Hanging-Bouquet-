import { useState } from "react";
import { flowers, ZONES, SEASONS } from "../data/flowers";

const ROLE_LABEL = { upright: "Thriller", mounder: "Filler", trailer: "Spiller" };

export default function Library() {
  const [filterSeason, setFilterSeason] = useState("all");
  const [filterZone, setFilterZone] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = flowers.filter((f) => {
    const matchSeason =
      filterSeason === "all" || f.seasons.includes(filterSeason);
    const matchZone =
      filterZone === "all" || f.zones.includes(filterZone);
    const matchRole =
      filterRole === "all" || f.role === filterRole;
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

      <div className="library-table">
        <div className="library-table-header">
          <span>Name</span>
          <span>Role</span>
          <span>Type</span>
          <span>Seasons</span>
          <span>Weeks to Bloom</span>
        </div>
        {filtered.map((f) => (
          <div key={f.id} className="library-table-row">
            <div className="lib-name-cell">
              <span className="lib-name">{f.name}</span>
              <span className="lib-latin">{f.latin}</span>
            </div>
            <span className={`role-badge role-${f.role}`}>
              {ROLE_LABEL[f.role]}
            </span>
            <span className="lib-type">{f.type}</span>
            <div className="lib-seasons">
              {f.seasons.map((s) => (
                <span key={s} className={`season-chip season-${s}`}>
                  {s}
                </span>
              ))}
            </div>
            <span className="lib-weeks">{f.weeksToBloom} wks</span>
          </div>
        ))}
      </div>
    </div>
  );
}
