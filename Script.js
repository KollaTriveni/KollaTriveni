document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailContent = document.getElementById('emailContent').value;
    const resultDiv = document.getElementById('result');
  
    // Check if email content is empty
    if (!emailContent.trim()) {
      resultDiv.innerHTML = "Please provide email content for analysis.";
      resultDiv.className = 'result danger';
      return;
    }
  
    resultDiv.innerHTML = "Analyzing...";
    resultDiv.className = 'result';
  
    try {
      // Send a POST request to the backend (Flask server)
      const response = await fetch('http://localhost:5000/analyze-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ emailContent })
      });
  
      const result = await response.json();
  
      if (result.malicious) {
        resultDiv.innerHTML = "This email is flagged as MALICIOUS!";
        resultDiv.className = 'result danger';
      } else {
        resultDiv.innerHTML = "This email appears SAFE.";
        resultDiv.className = 'result success';
      }
    } catch (error) {
      console.error("Error analyzing the email:", error);
      resultDiv.innerHTML = "Error analyzing the email. Please try again later.";
      resultDiv.className = 'result danger';
    }
  });
  
  