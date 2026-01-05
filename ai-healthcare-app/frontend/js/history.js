console.log("History JS Loaded");


// ✅ Correct table ID
const tableBody = document.getElementById("historyTable");

// ================================
// LOAD HISTORY FROM LOCALSTORAGE
// ================================
const history = JSON.parse(localStorage.getItem("healthHistory")) || [];


// ================================
// TABLE LOGIC
// ================================
if (history.length === 0) {
  tableBody.innerHTML = `
    <tr>
      <td colspan="5" style="text-align:center;">
        No history found 🫤
      </td>
    </tr>
  `;
} else {
  history.forEach(record => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.date}</td>
      <td>${record.symptoms}</td>
      <td>${record.disease}</td>
      <td>${record.severity}</td>
      <td>${record.risk}</td>
    `;

    tableBody.appendChild(row);
  });
}

// ================================
// GRAPH LOGIC
// ================================
if (history.length > 0) {

  const ctx = document.getElementById("healthChart").getContext("2d");

  const severityMap = {
    "Minor": 1,
    "Moderate": 2,
    "Critical": 3
  };

  const labels = history.map(item => item.date);
  const dataPoints = history.map(item => severityMap[item.severity]);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Health Severity Trend",
        data: dataPoints,
        borderWidth: 3,
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 1,
          max: 3,
          ticks: {
            stepSize: 1,
            callback: v => ["", "Minor", "Moderate", "Critical"][v]
          }
        }
      }
    }
  });
}
