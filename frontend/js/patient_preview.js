document.addEventListener('DOMContentLoaded', function () {
    const navBtns = document.querySelectorAll('.nav-btn');
    const recordsPanel = document.getElementById('records-panel');
    const analysisPanel = document.getElementById('analysis-panel');

    function showTarget(targetId) {
        if (targetId === 'records-panel') {
            recordsPanel.style.display = '';
            analysisPanel.style.display = 'none';
        } else if (targetId === 'analysis-panel') {
            recordsPanel.style.display = 'none';
            analysisPanel.style.display = '';
        }
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const li = btn.closest('li');
            // toggle active class on list items
            document.querySelectorAll('.nav-list li').forEach(item => item.classList.remove('active'));
            if (li) li.classList.add('active');

            const target = btn.getAttribute('data-target');
            if (target) showTarget(target);
        });

        // allow Enter/Space keyboard activation
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // Initialize default view: show records
    showTarget('records-panel');
});
