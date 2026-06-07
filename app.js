// =======================
// FIX MYCITY APP
// =======================

// REPORT FORM
const issueForm = document.getElementById("issueForm");

if (issueForm) {
  issueForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const issue = {
      id: Date.now(),
      name: document.getElementById("name").value,
      type: document.getElementById("type").value,
      desc: document.getElementById("desc").value,
      location: document.getElementById("location").value,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues.push(issue);

    localStorage.setItem("issues", JSON.stringify(issues));

    alert("Issue submitted successfully! 🚀");

    issueForm.reset();
  });
}

// DASHBOARD
window.addEventListener("DOMContentLoaded", () => {
  const issueList = document.getElementById("issueList");

  if (!issueList) return;

  let issues = JSON.parse(localStorage.getItem("issues")) || [];

  // Statistics
  const totalIssues = document.getElementById("totalIssues");
  const pendingIssues = document.getElementById("pendingIssues");
  const resolvedIssues = document.getElementById("resolvedIssues");

  if (totalIssues) totalIssues.textContent = issues.length;

  if (pendingIssues) {
    pendingIssues.textContent = issues.filter(
      issue => issue.status === "Pending"
    ).length;
  }

  if (resolvedIssues) {
    resolvedIssues.textContent = issues.filter(
      issue => issue.status === "Resolved"
    ).length;
  }

  // No issues
  if (issues.length === 0) {
    issueList.innerHTML = `
      <div class="card">
        <h3>No Issues Reported Yet 🚧</h3>
        <p>Be the first to report an issue.</p>
      </div>
    `;
    return;
  }

  // Display issues (ONLY CHANGE: added index + delete button)
  issues.forEach((issue, index) => {
    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${issue.type}</h3>
      <p><strong>Reported By:</strong> ${issue.name}</p>
      <p><strong>Location:</strong> ${issue.location}</p>
      <p>${issue.desc}</p>
      <p><strong>Date:</strong> ${issue.date}</p>
      <span class="status pending">${issue.status}</span>

      <!-- DELETE BUTTON ADDED -->
      <button class="delete-btn" data-index="${index}">
        🗑 Delete
      </button>
    `;

    issueList.appendChild(card);
  });
});


// =======================
// DELETE FUNCTION (ADDED ONLY THIS BLOCK)
// =======================
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {

    let index = e.target.getAttribute("data-index");

    let issues = JSON.parse(localStorage.getItem("issues")) || [];

    issues.splice(index, 1);

    localStorage.setItem("issues", JSON.stringify(issues));

    location.reload();
  }
});