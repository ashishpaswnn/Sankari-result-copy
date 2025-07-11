const jobList = document.getElementById('jobList');
const categoryFilter = document.getElementById('categoryFilter');
const stateFilter = document.getElementById('stateFilter');

let allJobs = [];

const JOB_API_URL = 'jobs.json';

function fetchJobs() {
  fetch(JOB_API_URL)
    .then(res => res.json())
    .then(data => {
      allJobs = data.jobs || [];
      renderJobs();
    })
    .catch(err => {
      jobList.innerHTML = '<div class="loading">Failed to load jobs.</div>';
    });
}

function renderJobs() {
  const category = categoryFilter.value;
  const state = stateFilter.value;

  const filtered = allJobs.filter(job => {
    const matchCategory = category === 'all' || job.category === category;
    const matchState = state === 'all' || job.state === state;
    return matchCategory && matchState;
  });

  jobList.innerHTML = '';
  if (filtered.length === 0) {
    jobList.innerHTML = '<div class="loading">No jobs found for selected filters.</div>';
    return;
  }

  filtered.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card';
    div.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Department:</strong> ${job.department}</p>
      <p><strong>Location:</strong> ${job.state}</p>
      <p><strong>Last Date:</strong> ${job.last_date}</p>
      <a href="${job.apply_link}" target="_blank">Apply Now</a>
    `;
    jobList.appendChild(div);
  });
}

categoryFilter.addEventListener('change', renderJobs);
stateFilter.addEventListener('change', renderJobs);

window.onload = fetchJobs;
