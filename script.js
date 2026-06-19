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