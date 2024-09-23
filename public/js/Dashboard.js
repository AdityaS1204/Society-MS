// Toggle Sidebar for Mobile View
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// Open Modal
function openModal() {
  document.getElementById("maintenanceModal").style.display = "block";
}

// Close Modal
function closeModal() {
  document.getElementById("maintenanceModal").style.display = "none";
}

// Close modal if clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById("maintenanceModal");
  if (event.target === modal) {
      modal.style.display = "none";
  }
}
