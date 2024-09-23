// GSAP Animations
window.onload = function () {
    gsap.from(".container", { duration: 1, opacity: 0, y: 50 });
    gsap.from("h1, p", { duration: 0.5, opacity: 0, x: -30, stagger: 0.2 });
  };
  
  // Preview Profile Picture
  function previewProfilePic(event) {
    const profilePicPreview = document.getElementById('profilePicPreview');
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profilePicPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  // Function to validate file size and format
  function validateFile(input) {
    const file = input.files[0];
    const errorMessage = document.getElementById(input.id + 'Error');
    const viewBtn = document.getElementById('view' + capitalizeFirstLetter(input.id));
  
    if (file) {
      const fileSize = file.size / (1024 * 1024); // Convert to MB
      const validFormats = ["image/jpeg", "image/png", "application/pdf"];
  
      if (fileSize > 5 || !validFormats.includes(file.type)) {
        errorMessage.textContent = "File must be a JPG, PNG, or PDF and less than 5MB.";
        viewBtn.style.display = "none";
      } else {
        errorMessage.textContent = "";
        viewBtn.style.display = "inline-block"; // Show the view button if valid
      }
    }
  }
  
  // Function to view image in a modal
  function viewImage(documentId) {
    const fileInput = document.getElementById(documentId);
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('modalImage').src = e.target.result;
        document.getElementById('imageModal').style.display = 'flex';
      };
      reader.readAsDataURL(file);
    }
  }
  
 // Function to close the modal
function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
  }
  
  
  // Helper to capitalize first letter for button ID usage
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Enable submit button if all fields are filled
  const form = document.getElementById('userDetailsForm');
  form.addEventListener('change', function () {
    const allInputs = Array.from(form.querySelectorAll('input, select'));
    const submitBtn = document.getElementById('submitBtn');
  
    const allFilled = allInputs.every(input => input.value.trim() !== '');
    const allDocumentsUploaded = Array.from(document.querySelectorAll('input[type="file"]')).every(fileInput => fileInput.files.length > 0);
  
    if (allFilled && allDocumentsUploaded) {
      submitBtn.disabled = false;
      submitBtn.classList.add('active');
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove('active');
    }
  });
  