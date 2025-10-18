document.addEventListener("DOMContentLoaded", function() {
    const emailForm = document.getElementById('emailForm');
    const emailContent = document.getElementById('emailContent');
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const emailValidation = document.getElementById('emailValidation');
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    const clearBtn = document.getElementById('clearBtn');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const bgImageInput = document.getElementById('bgImageInput');
  
    // Update character and word count
    emailContent.addEventListener('input', function() {
        const text = emailContent.value;
        charCount.textContent = `${text.length}/1000 characters`;
        wordCount.textContent = `${text.trim() ? text.trim().split(/\s+/).length : 0} words`;
    });
  
    // Analyze Email Content
    emailForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const content = emailContent.value.trim();
        
        if (content.length === 0) {
            emailValidation.textContent = "Please enter email content.";
            return;
        }
  
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        emailValidation.textContent = '';
        resultDiv.style.display = 'none';
        downloadReportBtn.style.display = 'none';
  
        // Send email content to the backend for analysis
        fetch('https://kollatriveni.onrender.com/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailContent: content })
        })
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = 'none';
            resultDiv.textContent = data.message; // Display the analysis result
            resultDiv.style.display = 'block';
            downloadReportBtn.style.display = 'inline'; // Show the download button
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            emailValidation.textContent = "An error occurred while analyzing the email.";
            console.error('Error:', error);
        });
    });
  
    // Clear the form
    clearBtn.addEventListener('click', function() {
        emailContent.value = '';
        charCount.textContent = '0/1000 characters';
        wordCount.textContent = '0 words';
        emailValidation.textContent = '';
        resultDiv.style.display = 'none';
        downloadReportBtn.style.display = 'none';
    });
  
    // Toggle Dark Mode
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
  
    // Change Background Image
    bgImageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.body.style.backgroundImage = `url(${e.target.result})`;
            }
            reader.readAsDataURL(file);
        }
    });
  });


