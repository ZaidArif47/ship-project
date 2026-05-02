document.addEventListener('DOMContentLoaded', async () => {
    const patientsContainer = document.getElementById('patients-list');
    const analyticsContainer = document.getElementById('analytics-overview');
    const refreshBtn = document.getElementById('refresh-btn');

    function makeEl(tag, cls, text) {
        const e = document.createElement(tag);
        if (cls) e.className = cls;
        if (text) e.textContent = text;
        return e;
    }

    function patientCard(patient) {
        const wrap = makeEl('div', 'patient-row');

        const meta = makeEl('div', 'patient-meta');
        const name = makeEl('div', 'patient-name', patient.full_name || patient.name || 'Unnamed');
        const email = makeEl('div', 'patient-email', patient.email || '');
        meta.appendChild(name);
        meta.appendChild(email);

        const actions = makeEl('div', 'patient-actions');
        const viewBtn = makeEl('button', 'btn tiny view-reports'); viewBtn.textContent = 'View Reports';
        const aiBtn = makeEl('button', 'btn tiny primary generate-analytics'); aiBtn.textContent = 'AI Analytics';
        actions.appendChild(viewBtn);
        actions.appendChild(aiBtn);

        const details = makeEl('div', 'patient-details'); details.style.display = 'none'; details.style.marginTop = '12px';

        wrap.appendChild(meta);
        wrap.appendChild(actions);
        wrap.appendChild(details);

        viewBtn.addEventListener('click', async () => {
            if (details.style.display === 'none') {
                details.style.display = '';
                details.innerHTML = '<em>Loading reports...</em>';
                try {
                    const reports = await apiRequest(`/patients/${patient.id}/reports`);
                    if (Array.isArray(reports) && reports.length) {
                        const ul = makeEl('ul', 'report-list');
                        reports.forEach(r => {
                            const li = makeEl('li');
                            li.innerHTML = `<strong>${r.title || r.name}</strong> — ${r.date || ''} <button class="btn tiny">View</button>`;
                            ul.appendChild(li);
                        });
                        details.innerHTML = '';
                        details.appendChild(ul);
                    } else {
                        details.innerHTML = '<div class="empty">No reports available</div>';
                    }
                } catch (err) {
                    details.innerHTML = '<div class="empty">Could not load reports (endpoint missing).</div>';
                }
            } else {
                details.style.display = 'none';
            }
        });

        aiBtn.addEventListener('click', async () => {
            details.style.display = '';
            details.innerHTML = '<em>Generating AI analytics...</em>';
            try {
                const res = await apiRequest('/generate-report', 'POST', { patient_id: patient.id, report_type: 'summary' });
                details.innerHTML = `<div class="ai-card"><h4>AI Summary</h4><div class="ai-content">${res.content || JSON.stringify(res)}</div></div>`;
            } catch (err) {
                details.innerHTML = '<div class="empty">AI analytics failed to generate.</div>';
            }
        });

        return wrap;
    }

    async function load() {
        patientsContainer.innerHTML = '<p class="muted">Loading patients...</p>';
        analyticsContainer.innerHTML = '<p class="muted">Loading analytics...</p>';
        try {
            const patients = await apiRequest('/patients/');
            patientsContainer.innerHTML = '';
            if (Array.isArray(patients) && patients.length) {
                patients.forEach(p => patientsContainer.appendChild(patientCard(p)));
            } else {
                patientsContainer.innerHTML = '<div class="empty">No patients found.</div>';
            }

            // Aggregated analytics (for first few patients)
            const subset = (patients||[]).slice(0, 6);
            if (!subset.length) {
                analyticsContainer.innerHTML = '<div class="empty">No analytics available.</div>';
                return;
            }

            const results = await Promise.all(subset.map(p => apiRequest('/generate-report', 'POST', { patient_id: p.id, report_type: 'summary' }).catch(()=>null)));
            analyticsContainer.innerHTML = '';
            results.forEach((r, i) => {
                if (!r) return;
                const item = makeEl('div', 'overview-item');
                item.innerHTML = `<strong>${subset[i].full_name||subset[i].name}</strong>: ${ (r.content||'No content').slice(0,140) }`;
                analyticsContainer.appendChild(item);
            });
            if (!analyticsContainer.children.length) analyticsContainer.innerHTML = '<div class="empty">No analytics available.</div>';

        } catch (err) {
            patientsContainer.innerHTML = '<div class="empty">Failed to load patients. Is the API running?</div>';
            analyticsContainer.innerHTML = '<div class="empty">Analytics unavailable.</div>';
            console.error(err);
        }
    }

    refreshBtn.addEventListener('click', load);
    await load();
});