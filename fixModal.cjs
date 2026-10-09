const fs = require('fs');
let lines = fs.readFileSync('src/components/leads/LeadModalCreate.css', 'utf16le').split('\n');
if(!lines[0].includes('input-error')) {
  lines = fs.readFileSync('src/components/leads/LeadModalCreate.css', 'utf8').split('\n');
}
const cleanLines = lines.slice(0, 475);

const extraCss = `
/* Property Search in Modal */
.modal-property-search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: #111827;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  max-height: 250px;
  overflow-y: auto;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.modal-property-search-results::-webkit-scrollbar {
  width: 6px;
}
.modal-property-search-results::-webkit-scrollbar-thumb {
  background: var(--border-light);
  border-radius: 4px;
}

.modal-property-search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s;
}

.modal-property-search-item:last-child {
  border-bottom: none;
}

.modal-property-search-item:hover {
  background-color: var(--bg-surface-hover);
}

.modal-property-search-empty {
  padding: 16px;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 13px;
}

.btn-clear-property {
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.btn-clear-property:hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.1);
}
`;

fs.writeFileSync('src/components/leads/LeadModalCreate.css', cleanLines.join('\n') + '\n' + extraCss, 'utf8');
