const fs = require('fs');
let lines = fs.readFileSync('src/components/leads/LeadDrawerDetails.css', 'utf16le').split('\n');
if(!lines[0].includes('drawer-header')) {
  lines = fs.readFileSync('src/components/leads/LeadDrawerDetails.css', 'utf8').split('\n');
}
const cleanLines = lines.slice(0, 478);

const extraCss = `
/* Linked Properties Section */
.linked-properties-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.linked-properties-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.linked-property-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-normal);
  padding: 10px;
  border-radius: var(--radius-md);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.linked-property-card:hover {
  border-color: var(--border-light);
}

.linked-property-thumb {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
}

.linked-property-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.linked-property-ref {
  font-size: 11px;
  color: var(--text-tertiary);
  font-weight: 500;
  text-transform: uppercase;
}

.linked-property-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.linked-property-price {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.linked-property-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-properties {
  padding: 16px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px dashed var(--border-normal);
  border-radius: var(--radius-md);
  font-size: 13px;
}

/* Property Search Container */
.property-search-container {
  background-color: var(--bg-card);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  position: relative;
  z-index: 50;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--bg-dark);
  border: 1px solid var(--border-normal);
  border-radius: var(--radius-sm);
  padding: 0 10px;
}

.search-input-wrapper input {
  flex: 1;
  background: none;
  border: none;
  color: var(--text-primary);
  padding: 10px 8px;
  font-size: 14px;
}

.search-input-wrapper input:focus {
  outline: none;
}

.property-search-results {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.property-search-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--bg-dark);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color 0.2s;
}

.property-search-item:hover {
  background-color: var(--primary-alpha);
}

.psi-info {
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--text-primary);
}

.psi-info strong {
  color: var(--primary);
}

.psi-info span {
  font-size: 11px;
  color: var(--text-tertiary);
}
`;

fs.writeFileSync('src/components/leads/LeadDrawerDetails.css', cleanLines.join('\n') + '\n' + extraCss, 'utf8');
