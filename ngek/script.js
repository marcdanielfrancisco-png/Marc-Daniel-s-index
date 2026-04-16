function saveData(event, category) {
    event.preventDefault();

    const title = event.target.querySelector('input').value;
    const fileInput = event.target.querySelector('input[type="file"]');
    
    // 1. Create a "Reader" to look at the photo
    const reader = new FileReader();

    reader.onload = function() {
        const entry = {
            name: title,
            type: category,
            date: new Date().toLocaleDateString(),
            // 2. This stores the photo as a text string
            image: reader.result 
        };

        let uploads = JSON.parse(localStorage.getItem('myUploads')) || [];
        uploads.push(entry);
        localStorage.setItem('myUploads', JSON.stringify(uploads));

        alert("Upload Successful!");
        window.location.href = "dashboard.html";
    };

    if (fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert("Please select an image first!");
    }
}

function showData() {
    const table = document.getElementById('output');
    const uploads = JSON.parse(localStorage.getItem('myUploads')) || [];

    if (table && uploads.length > 0) {
        table.innerHTML = ""; 
        uploads.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.type}</td>
                    <td>${item.date}</td>
                    <!-- 3. Show the photo as a small thumbnail -->
                    <td><img src="${item.image}" style="width:70px; border-radius:5px;"></td>
                </tr>`;
        });
    }
}

// Auto-run display logic on the dashboard
if (window.location.pathname.includes('dashboard.html')) {
    showData();
}
