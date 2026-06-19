document.addEventListener("DOMContentLoaded", () => {
    
    // ----------------------------------------------------
    // 1. BOOKING FORM VALIDATION
    // ----------------------------------------------------
    const bookingForm = document.getElementById("bookingForm");
    
    if (bookingForm) {
        const fullNameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const dateInput = document.getElementById("bookingDate");

        bookingForm.addEventListener("submit", (e) => {
            let isValid = true;

            // Validate Full Name
            if (fullNameInput.value.trim() === "") {
                setFieldError(fullNameInput, "Name is required", true);
                isValid = false;
            } else {
                setFieldError(fullNameInput, "", false);
            }

            // Validate Email
            if (!validateEmail(emailInput.value.trim())) {
                setFieldError(emailInput, "Enter a valid email", true);
                isValid = false;
            } else {
                setFieldError(emailInput, "", false);
            }

            // Validate Booking Date
            if (dateInput.value === "") {
                setFieldError(dateInput, "Date must be in the future", true);
                isValid = false;
            } else {
                const selectedDate = new Date(dateInput.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); 
                
                if (selectedDate <= today) {
                    setFieldError(dateInput, "Date must be in the future", true);
                    isValid = false;
                } else {
                    setFieldError(dateInput, "", false);
                }
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // ----------------------------------------------------
    // 2. ENQUIRY FORM VALIDATION
    // ----------------------------------------------------
    const enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {
        const nameInput = enquiryForm.querySelector("#name");
        const emailInput = enquiryForm.querySelector("#email"); 
        const phoneInput = enquiryForm.querySelector("#phone");
        const messageInput = enquiryForm.querySelector("#message");
        const formMessage = enquiryForm.querySelector("#formMessage");

        enquiryForm.addEventListener("submit", (e) => {
            let isValid = true;

            if (nameInput.value.trim() === "") {
                setFieldError(nameInput, "Full Name is required", true);
                isValid = false;
            } else {
                setFieldError(nameInput, "", false);
            }

            if (!validateEmail(emailInput.value.trim())) {
                setFieldError(emailInput, "A valid email address is required", true);
                isValid = false;
            } else {
                setFieldError(emailInput, "", false);
            }

            if (!validatePhone(phoneInput.value.trim())) {
                setFieldError(phoneInput, "Please provide a valid phone number", true);
                isValid = false;
            } else {
                setFieldError(phoneInput, "", false);
            }

            if (messageInput.value.trim() === "") {
                setFieldError(messageInput, "Please enter a message", true);
                isValid = false;
            } else {
                setFieldError(messageInput, "", false);
            }

            if (!isValid) {
                e.preventDefault();
                if (formMessage) {
                    formMessage.style.color = "red";
                    formMessage.textContent = "Please fill in all details correctly.";
                }
            } else {
                if (formMessage) {
                    formMessage.style.color = "green";
                    formMessage.textContent = "Thank you! Your enquiry was successful.";
                }
            }
        });
    }

    // ----------------------------------------------------
    // 3. CONTACT FORM VALIDATION (NEW)
    // ----------------------------------------------------
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        const nameInput = contactForm.querySelector("#name");
        const emailInput = contactForm.querySelector("#email");
        const phoneInput = contactForm.querySelector("#phone");
        const messageInput = contactForm.querySelector("#message");
        const formMessage = contactForm.querySelector("#formMessage");

        contactForm.addEventListener("submit", (e) => {
            let isValid = true;

            // Validate Contact Full Name
            if (nameInput.value.trim() === "") {
                setFieldError(nameInput, "Full Name is required", true);
                isValid = false;
            } else {
                setFieldError(nameInput, "", false);
            }

            // Validate Contact Email
            if (!validateEmail(emailInput.value.trim())) {
                setFieldError(emailInput, "A valid email address is required", true);
                isValid = false;
            } else {
                setFieldError(emailInput, "", false);
            }

            // Validate Contact Phone
            if (!validatePhone(phoneInput.value.trim())) {
                setFieldError(phoneInput, "Please provide a valid phone number", true);
                isValid = false;
            } else {
                setFieldError(phoneInput, "", false);
            }

            // Validate Contact Message Textbox
            if (messageInput.value.trim() === "") {
                setFieldError(messageInput, "Please enter your message", true);
                isValid = false;
            } else {
                setFieldError(messageInput, "", false);
            }

            // Handle overall Submission Response
            if (!isValid) {
                e.preventDefault();
                if (formMessage) {
                    formMessage.style.color = "red";
                    formMessage.textContent = "Please complete all fields before sending.";
                }
            } else {
                if (formMessage) {
                    formMessage.style.color = "green";
                    formMessage.textContent = "Message sent successfully! We'll reply soon.";
                }
            }
        });
    }

    // ----------------------------------------------------
    // VALIDATION & FIELD UPDATE HELPERS
    // ----------------------------------------------------
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[0-9\s\-+]{7,15}$/;
        return phoneRegex.test(phone);
    }

    // Controls borders, custom error tracking text injection
    function setFieldError(inputElement, errorMessage, isError) {
        inputElement.style.transition = "all 0.2s ease";
        
        let errorContainer = inputElement.nextElementSibling;
        
        if (!errorContainer || !errorContainer.classList.contains("error-msg")) {
            errorContainer = document.createElement("small");
            errorContainer.className = "error-msg";
            inputElement.parentNode.insertBefore(errorContainer, inputElement.nextSibling);
        }

        if (isError) {
            inputElement.style.borderColor = "red";
            inputElement.style.backgroundColor = "#fff5f5"; 
            errorContainer.textContent = errorMessage;
            errorContainer.style.display = "block";
        } else {
            inputElement.style.borderColor = "";
            inputElement.style.backgroundColor = "";
            errorContainer.style.display = "none";
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const errorMessage = document.getElementById('errorMessage');
    const searchInput = document.getElementById('searchInput');
    const listItems = document.querySelectorAll('.style-item');

    // Hide all items immediately when the page loads
    if (listItems.length > 0) {
        listItems.forEach(item => {
            item.style.display = 'none';
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop page reload
            
            const query = searchInput.value.trim().toLowerCase();
            
            // Reset message and hide everything
            errorMessage.textContent = "";
            let matchCount = 0;

            // 1. Check if empty
            if (query === "") {
                errorMessage.textContent = "Please enter a search term.";
                listItems.forEach(item => item.style.display = 'none');
                searchInput.focus();
                return;
            }

            // 2. Filter items
            listItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                
                if (text.includes(query)) {
                    item.style.display = 'block'; // Show match
                    matchCount++;
                } else {
                    item.style.display = 'none';  // Hide others
                }
            });

            // 3. Display "item unmatched" if nothing was found
            if (matchCount === 0) {
                errorMessage.textContent = "item unmatched";
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const errorMessage = document.getElementById('errorMessage');
    const listItems = document.querySelectorAll('.style-item');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.trim().toLowerCase();
            errorMessage.textContent = "";
            let matchCount = 0;

            // If empty, keep all elements hidden and prompt user
            if (query === "") {
                listItems.forEach(item => item.style.display = 'none');
                return;
            }

            // Evaluate elements dynamically
            listItems.forEach(item => {
                if (item.textContent.toLowerCase().includes(query)) {
                    item.style.display = 'block';
                    matchCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Instant fallback validation
            if (matchCount === 0) {
                errorMessage.textContent = "not found";
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('imageLightbox');
    const expandedImage = document.getElementById('expandedImage');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Select all images inside your service grids
    const galleryImages = document.querySelectorAll('.service-grid img');

    // 1. Listen for a click on any of the service images
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'flex'; // Display the overlay container
            expandedImage.src = this.src;    // Clone the clicked image source URL
            expandedImage.alt = this.alt;    // Clone the alternate text description
        });
    });

    // 2. Close the modal when clicking the "X" button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    // 3. Close the modal automatically if the user clicks on the dark backdrop
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('imageLightbox');
    const expandedImage = document.getElementById('expandedImage');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Selects all images inside your service-grid boxes
    const galleryImages = document.querySelectorAll('.service-grid img');

    console.log("Found " + galleryImages.length + " images to click.");

    galleryImages.forEach(img => {
        // Force a pointer cursor so you know it's clickable
        img.style.cursor = 'pointer';

        img.addEventListener('click', function() {
            console.log("Image clicked! Source: " + this.src);
            
            if (lightbox && expandedImage) {
                // This is the exact line that forces the large popup to show up
                lightbox.style.setProperty('display', 'flex', 'important');
                expandedImage.src = this.src;
                expandedImage.alt = this.alt;
            } else {
                console.log("Error: Could not find imageLightbox or expandedImage in your HTML.");
            }
        });
    });

    // Close when clicking 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    // Close when clicking the dark background
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. SEARCH BAR VALIDATION & FILTER ENGINE
    // ==========================================
    const form = document.getElementById('searchForm');
    const errorMessage = document.getElementById('errorMessage');
    const searchInput = document.getElementById('searchInput');
    const listItems = document.querySelectorAll('.style-item');

    listItems.forEach(item => item.style.display = 'block');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const query = searchInput.value.trim().toLowerCase();
            errorMessage.textContent = "";
            let matchCount = 0;

            if (query === "") {
                errorMessage.textContent = "please search for an item";
                listItems.forEach(item => item.style.display = 'block'); 
                searchInput.focus();
                return;
            }

            listItems.forEach(item => {
                const text = item.querySelector('h4').textContent.toLowerCase();
                
                if (text.includes(query)) {
                    item.style.display = 'block';
                    matchCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            if (matchCount === 0) {
                errorMessage.textContent = "not found";
            }
        });
    }

    // ==========================================
    // 2. IMAGE GALLERY LIGHTBOX ENGINE
    // ==========================================
    const lightbox = document.getElementById('imageLightbox');
    const expandedImage = document.getElementById('expandedImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const allImages = Array.from(document.querySelectorAll('.gallery-images-wrapper img'));
    let currentIndex = 0;

    function updateLightboxImage(index) {
        if (index >= 0 && index < allImages.length) {
            currentIndex = index;
            expandedImage.src = allImages[currentIndex].src;
            expandedImage.alt = allImages[currentIndex].alt;
        }
    }

    allImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            if (lightbox && expandedImage) {
                lightbox.style.display = 'flex';
                updateLightboxImage(index);
            }
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let nextIndex = currentIndex + 1;
            if (nextIndex >= allImages.length) nextIndex = 0;
            updateLightboxImage(nextIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = allImages.length - 1;
            updateLightboxImage(prevIndex);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const aboutLightbox = document.getElementById('aboutLightbox');
    const aboutExpandedImage = document.getElementById('aboutExpandedImage');
    const aboutImageCaption = document.getElementById('aboutImageCaption');
    const aboutCloseBtn = document.querySelector('.about-lightbox-close');
    
    // Select the two specific about images
    const aboutImages = document.querySelectorAll('.about-image');

    // 1. Open the lightbox when clicking an about image
    aboutImages.forEach(img => {
        img.addEventListener('click', function() {
            if (aboutLightbox && aboutExpandedImage) {
                aboutLightbox.style.display = 'flex';
                aboutExpandedImage.src = this.src;
                
                // Grabs the alt text ("inside Dimpho's Hair Salon") and sets it as the text caption
                if (aboutImageCaption) {
                    aboutImageCaption.textContent = this.alt;
                }
            }
        });
    });

    // 2. Close via the 'X' button
    if (aboutCloseBtn) {
        aboutCloseBtn.addEventListener('click', function() {
            aboutLightbox.style.display = 'none';
        });
    }

    // 3. Close by clicking anywhere on the dark background
    if (aboutLightbox) {
        aboutLightbox.addEventListener('click', function(event) {
            if (event.target === aboutLightbox) {
                aboutLightbox.style.display = 'none';
            }
        });
    }
});

    

