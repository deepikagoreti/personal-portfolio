/**
 * Client-Side Form Validation Module
 * Demonstrates ES6+, Regex pattern validation, DOM events, and accessible feedback
 */

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    // Form input references
    this.nameInput = document.getElementById("contactName");
    this.emailInput = document.getElementById("contactEmail");
    this.phoneInput = document.getElementById("contactPhone");
    this.subjectSelect = document.getElementById("contactSubject");
    this.messageInput = document.getElementById("contactMessage");
    this.consentCheck = document.getElementById("contactConsent");
    this.submitBtn = document.getElementById("contactSubmitBtn");
    this.charCountSpan = document.getElementById("charCount");
    this.alertContainer = document.getElementById("formAlertContainer");

    // Regular Expressions for strict validation
    this.patterns = {
      name: /^[a-zA-Z\s]{3,50}$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      phone: /^(\+91[\-\s]?)?[6-9]\d{9}$/
    };

    this.init();
  }

  init() {
    // Bind Real-Time Event Listeners
    this.nameInput.addEventListener("input", () => this.validateName());
    this.nameInput.addEventListener("blur", () => this.validateName());

    this.emailInput.addEventListener("input", () => this.validateEmail());
    this.emailInput.addEventListener("blur", () => this.validateEmail());

    this.phoneInput.addEventListener("input", () => this.validatePhone());
    this.phoneInput.addEventListener("blur", () => this.validatePhone());

    this.subjectSelect.addEventListener("change", () => this.validateSubject());

    this.messageInput.addEventListener("input", () => {
      this.updateCharCounter();
      this.validateMessage();
    });
    this.messageInput.addEventListener("blur", () => this.validateMessage());

    this.consentCheck.addEventListener("change", () => this.validateConsent());

    // Submit listener
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Reset button listener
    const resetBtn = document.getElementById("contactResetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.handleReset());
    }
  }

  // Update character counter for textarea
  updateCharCounter() {
    if (!this.charCountSpan) return;
    const currentLength = this.messageInput.value.length;
    const maxLength = this.messageInput.getAttribute("maxlength") || 500;
    this.charCountSpan.textContent = `${currentLength} / ${maxLength}`;
    
    if (currentLength >= maxLength) {
      this.charCountSpan.classList.add("text-danger");
    } else {
      this.charCountSpan.classList.remove("text-danger");
    }
  }

  // Set field visual feedback and accessibility states
  setFeedback(inputElement, isValid, errorMessage = "") {
    const parent = inputElement.closest(".form-field-wrapper") || inputElement.parentElement;
    const feedbackEl = parent.querySelector(".invalid-feedback");

    if (isValid) {
      inputElement.classList.remove("is-invalid");
      inputElement.classList.add("is-valid");
      inputElement.setAttribute("aria-invalid", "false");
      if (feedbackEl) feedbackEl.textContent = "";
    } else {
      inputElement.classList.remove("is-valid");
      inputElement.classList.add("is-invalid");
      inputElement.setAttribute("aria-invalid", "true");
      if (feedbackEl) feedbackEl.textContent = errorMessage;
    }
    return isValid;
  }

  validateName() {
    const value = this.nameInput.value.trim();
    if (!value) {
      return this.setFeedback(this.nameInput, false, "Full name is required.");
    }
    if (value.length < 3) {
      return this.setFeedback(this.nameInput, false, "Name must be at least 3 characters long.");
    }
    if (!this.patterns.name.test(value)) {
      return this.setFeedback(this.nameInput, false, "Name should contain only alphabetic letters and spaces.");
    }
    return this.setFeedback(this.nameInput, true);
  }

  validateEmail() {
    const value = this.emailInput.value.trim();
    if (!value) {
      return this.setFeedback(this.emailInput, false, "Email address is required.");
    }
    if (!this.patterns.email.test(value)) {
      return this.setFeedback(this.emailInput, false, "Please enter a valid email address (e.g. name@example.com).");
    }
    return this.setFeedback(this.emailInput, true);
  }

  validatePhone() {
    const value = this.phoneInput.value.trim();
    if (!value) {
      return this.setFeedback(this.phoneInput, false, "Contact phone number is required.");
    }
    // Remove space or hyphen for testing
    const sanitized = value.replace(/[\s\-]/g, "");
    if (!this.patterns.phone.test(sanitized)) {
      return this.setFeedback(this.phoneInput, false, "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).");
    }
    return this.setFeedback(this.phoneInput, true);
  }

  validateSubject() {
    const value = this.subjectSelect.value;
    if (!value || value === "") {
      return this.setFeedback(this.subjectSelect, false, "Please select an inquiry subject from the list.");
    }
    return this.setFeedback(this.subjectSelect, true);
  }

  validateMessage() {
    const value = this.messageInput.value.trim();
    if (!value) {
      return this.setFeedback(this.messageInput, false, "Message cannot be empty.");
    }
    if (value.length < 15) {
      return this.setFeedback(this.messageInput, false, `Message must be at least 15 characters (currently ${value.length}).`);
    }
    return this.setFeedback(this.messageInput, true);
  }

  validateConsent() {
    const isChecked = this.consentCheck.checked;
    if (!isChecked) {
      return this.setFeedback(this.consentCheck, false, "You must check the consent box before submitting.");
    }
    return this.setFeedback(this.consentCheck, true);
  }

  // Validate entire form
  validateAll() {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPhoneValid = this.validatePhone();
    const isSubjectValid = this.validateSubject();
    const isMessageValid = this.validateMessage();
    const isConsentValid = this.validateConsent();

    return isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid && isConsentValid;
  }

  showAlert(type, message) {
    if (!this.alertContainer) return;
    this.alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-success' : 'fa-circle-exclamation text-danger'} me-2"></i>
        <span>${message}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();

    const isValid = this.validateAll();

    if (!isValid) {
      this.showAlert("danger", "Please correct the highlighted errors before submitting your message.");
      // Focus first invalid element
      const firstInvalid = this.form.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    // Submit state animation
    const originalBtnText = this.submitBtn.innerHTML;
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = `
      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Transmitting message...
    `;

    // Process submission via client-side DOM timer callback (Unit II)
    setTimeout(() => {
      // Extract form values using ES6 Destructuring
      const formData = {
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim(),
        phone: this.phoneInput.value.trim(),
        subject: this.subjectSelect.value,
        message: this.messageInput.value.trim(),
        submittedAt: new Date().toLocaleString()
      };

      console.log("Form successfully validated and submitted:", formData);

      // Display Bootstrap Success Modal
      const modalNameEl = document.getElementById("successModalName");
      const modalEmailEl = document.getElementById("successModalEmail");
      const modalSubjectEl = document.getElementById("successModalSubject");
      const modalTimeEl = document.getElementById("successModalTime");

      if (modalNameEl) modalNameEl.textContent = formData.name;
      if (modalEmailEl) modalEmailEl.textContent = formData.email;
      if (modalSubjectEl) modalSubjectEl.textContent = formData.subject;
      if (modalTimeEl) modalTimeEl.textContent = formData.submittedAt;

      const modalElement = document.getElementById("submissionSuccessModal");
      if (modalElement && typeof bootstrap !== "undefined") {
        const successModal = new bootstrap.Modal(modalElement);
        successModal.show();
      } else {
        this.showAlert("success", `Thank you, ${formData.name}! Your message has been received successfully.`);
      }

      // Reset form
      this.handleReset();

      // Restore submit button state
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = originalBtnText;
    }, 800);
  }

  handleReset() {
    this.form.reset();
    const inputs = this.form.querySelectorAll(".is-valid, .is-invalid");
    inputs.forEach(input => {
      input.classList.remove("is-valid", "is-invalid");
      input.removeAttribute("aria-invalid");
    });
    if (this.charCountSpan) {
      this.charCountSpan.textContent = "0 / 500";
      this.charCountSpan.classList.remove("text-danger");
    }
    if (this.alertContainer) {
      this.alertContainer.innerHTML = "";
    }
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  new FormValidator("contactForm");
});
