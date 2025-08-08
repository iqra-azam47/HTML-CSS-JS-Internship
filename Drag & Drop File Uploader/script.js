document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const fileLink = document.getElementById('file-link');
    const previewContainer = document.getElementById('preview-container');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const errorMessage = document.getElementById('error-message');

    let uploadedFiles = []; // For localStorage challenge

    // Function to load images from localStorage
    function loadImagesFromLocalStorage() {
        const storedFiles = localStorage.getItem('uploadedImages');
        if (storedFiles) {
            uploadedFiles = JSON.parse(storedFiles);
            uploadedFiles.forEach(url => displayImage(url));
        }
    }

    // Load images on page load
    loadImagesFromLocalStorage();

    // Event listener to open file dialog when 'click to browse' is clicked
    fileLink.addEventListener('click', () => fileInput.click());

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area on dragenter and dragover
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
    });

    // Un-highlight drop area on dragleave and drop
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
    });

    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        // Clear previous messages
        errorMessage.style.display = 'none';

        if (files.length === 0) return;

        [...files].forEach(file => {
            if (file.type.startsWith('image/')) {
                // Simulate upload progress
                simulateUpload(file);
            } else {
                errorMessage.textContent = 'Invalid file type. Please upload a JPG, PNG, or GIF.';
                errorMessage.style.display = 'block';
            }
        });
    }

    function simulateUpload(file) {
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                progressContainer.style.display = 'none';
                handleImage(file);
            }
        }, 200); // 200ms interval for simulation
    }

    function handleImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const imageDataURL = reader.result;
            displayImage(imageDataURL);
            // Store in localStorage
            uploadedFiles.push(imageDataURL);
            localStorage.setItem('uploadedImages', JSON.stringify(uploadedFiles));
        };
    }

    function displayImage(dataURL) {
        const img = document.createElement('img');
        img.src = dataURL;
        previewContainer.appendChild(img);
    }
});