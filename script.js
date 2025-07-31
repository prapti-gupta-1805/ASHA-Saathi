// ASHA Saathi - JavaScript Functionality

// Global variables
let isRecording = false;
let recordingTimer = null;
let recordingStartTime = null;
let currentLanguage = 'en';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'input':
            initializeInputPage();
            break;
        case 'patients':
            initializePatientsPage();
            break;
        case 'summary':
            initializeSummaryPage();
            break;
        case 'profile':
            initializeProfilePage();
            break;
        case 'report':
            initializeReportPage();
            break;
        default:
            initializeHomePage();
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('input.html')) return 'input';
    if (path.includes('patients.html')) return 'patients';
    if (path.includes('summary.html')) return 'summary';
    if (path.includes('profile.html')) return 'profile';
    if (path.includes('report.html')) return 'report';
    return 'home';
}

function setupEventListeners() {
    // Handle responsive navigation
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            navbarCollapse.classList.toggle('show');
        });
    }
}

// =================== HOME PAGE ===================
function initializeHomePage() {
    // Add any home page specific initialization
    console.log('Home page initialized');
}

// =================== INPUT PAGE ===================
function initializeInputPage() {
    // Show text input by default
    activateInputMethod('text');
}

function activateInputMethod(method) {
    // Hide all input forms
    const inputForms = document.querySelectorAll('.input-form');
    inputForms.forEach(form => form.style.display = 'none');
    
    // Remove active class from all cards
    const methodCards = document.querySelectorAll('.input-method-card');
    methodCards.forEach(card => card.classList.remove('active'));
    
    // Show selected form and activate card
    const selectedForm = document.getElementById(method + 'InputForm');
    const selectedCard = event?.target.closest('.input-method-card');
    
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
    
    if (selectedCard) {
        selectedCard.classList.add('active');
    }
}

function previewImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            const img = document.getElementById('previewImg');
            img.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    isRecording = true;
    recordingStartTime = Date.now();
    
    const recordBtn = document.getElementById('recordBtn');
    const recordIcon = document.getElementById('recordIcon');
    const recordingStatus = document.getElementById('recordingStatus');
    const recordingTimer = document.getElementById('recordingTimer');
    
    recordBtn.classList.add('recording');
    recordIcon.className = 'bi bi-stop-fill';
    recordingStatus.textContent = 'Recording...';
    recordingTimer.style.display = 'block';
    
    // Start timer
    updateRecordingTimer();
    
    // Simulate recording (in real app, would use Web Audio API)
    console.log('Started recording...');
}

function stopRecording() {
    isRecording = false;
    
    const recordBtn = document.getElementById('recordBtn');
    const recordIcon = document.getElementById('recordIcon');
    const recordingStatus = document.getElementById('recordingStatus');
    const audioPlayback = document.getElementById('audioPlayback');
    
    recordBtn.classList.remove('recording');
    recordIcon.className = 'bi bi-mic';
    recordingStatus.textContent = 'Recording complete';
    audioPlayback.style.display = 'block';
    
    console.log('Stopped recording');
}

function updateRecordingTimer() {
    if (!isRecording) return;
    
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timerDisplay = document.getElementById('recordingTimer');
    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setTimeout(updateRecordingTimer, 1000);
}

function processInput() {
    // Show loading state
    const btn = event.target;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Processing...';
    btn.disabled = true;
    
    // Simulate processing delay
    setTimeout(() => {
        window.location.href = 'summary.html';
    }, 2000);
}

// =================== SUMMARY PAGE ===================
function initializeSummaryPage() {
    console.log('Summary page initialized');
}

function playTTS(content) {
    // Simulate TTS functionality
    const btn = event.target.closest('button');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="bi bi-pause-fill me-1"></i>Playing...';
    btn.disabled = true;
    
    // Simulate audio playback
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        showToast('Audio playback complete', 'success');
    }, 3000);
    
    console.log('Playing TTS for:', content);
}

function saveSummary() {
    // Simulate saving functionality
    const btn = event.target;
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="bi bi-check me-1"></i>Saved!';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 2000);
    
    showToast('Summary saved successfully', 'success');
    console.log('Summary saved');
}

// =================== PATIENTS PAGE ===================
function initializePatientsPage() {
    console.log('Patients page initialized');
}

function searchPatients() {
    const searchTerm = document.getElementById('patientSearchInput').value.toLowerCase();
    const patientCards = document.querySelectorAll('.patient-card');
    let visibleCount = 0;
    
    patientCards.forEach(card => {
        const patientName = card.dataset.name.toLowerCase();
        const isVisible = patientName.includes(searchTerm);
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });
    
    toggleEmptyState(visibleCount === 0);
}

function filterPatients() {
    const ageFilter = document.getElementById('ageFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const patientCards = document.querySelectorAll('.patient-card');
    let visibleCount = 0;
    
    patientCards.forEach(card => {
        const patientAge = parseInt(card.dataset.age);
        const patientGender = card.dataset.gender;
        
        let ageMatch = true;
        let genderMatch = true;
        
        // Age filtering
        if (ageFilter) {
            switch(ageFilter) {
                case 'child':
                    ageMatch = patientAge <= 12;
                    break;
                case 'teen':
                    ageMatch = patientAge >= 13 && patientAge <= 19;
                    break;
                case 'adult':
                    ageMatch = patientAge >= 20 && patientAge <= 59;
                    break;
                case 'senior':
                    ageMatch = patientAge >= 60;
                    break;
            }
        }
        
        // Gender filtering
        if (genderFilter) {
            genderMatch = patientGender === genderFilter;
        }
        
        const isVisible = ageMatch && genderMatch;
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });
    
    toggleEmptyState(visibleCount === 0);
}

function toggleEmptyState(show) {
    const emptyState = document.getElementById('emptyState');
    const patientsContainer = document.getElementById('patientsContainer');
    
    if (emptyState) {
        emptyState.style.display = show ? 'block' : 'none';
    }
    if (patientsContainer) {
        patientsContainer.style.display = show ? 'none' : 'flex';
    }
}

function addNewPatient() {
    // Get form data
    const name = document.getElementById('newPatientName').value;
    const age = document.getElementById('newPatientAge').value;
    const gender = document.getElementById('newPatientGender').value;
    const contact = document.getElementById('newPatientContact').value;
    const address = document.getElementById('newPatientAddress').value;
    
    // Validate required fields
    if (!name || !age || !gender) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate adding patient
    showToast(`Patient ${name} added successfully`, 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addPatientModal'));
    modal.hide();
    
    // Reset form
    document.getElementById('addPatientForm').reset();
    
    console.log('New patient added:', { name, age, gender, contact, address });
}

// =================== PROFILE PAGE ===================
function initializeProfilePage() {
    console.log('Profile page initialized');
}

function updatePatient() {
    // Simulate updating patient
    showToast('Patient information updated successfully', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editPatientModal'));
    modal.hide();
    
    console.log('Patient updated');
}

// =================== REPORT PAGE ===================
function initializeReportPage() {
    console.log('Report page initialized');
}

function exportToPDF() {
    // Simulate PDF export
    const btn = event.target;
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.disabled = false;
        showToast('Report exported successfully', 'success');
    }, 2000);
    
    console.log('Exporting report to PDF');
}

function shareReport() {
    // Simulate sharing functionality
    if (navigator.share) {
        navigator.share({
            title: 'Medical Report - ASHA Saathi',
            text: 'Medical report generated by ASHA Saathi',
            url: window.location.href
        });
    } else {
        // Fallback - copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Report link copied to clipboard', 'success');
    }
}

function deleteReport() {
    // Show confirmation modal
    const modal = new bootstrap.Modal(document.getElementById('deleteReportModal'));
    modal.show();
}

function confirmDeleteReport() {
    // Simulate deletion
    showToast('Report deleted successfully', 'success');
    
    // Close modal and redirect
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteReportModal'));
    modal.hide();
    
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 1000);
}

// =================== LANGUAGE FUNCTIONALITY ===================
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update dropdown button text
    const dropdownBtn = document.querySelector('.dropdown-toggle');
    const langNames = {
        'en': 'English',
        'hi': 'हिंदी',
        'hinglish': 'Hinglish'
    };
    
    dropdownBtn.innerHTML = `<i class="bi bi-translate me-1"></i>${langNames[lang]}`;
    
    // Simulate language change
    showToast(`Language changed to ${langNames[lang]}`, 'info');
    
    console.log('Language changed to:', lang);
}

// =================== UTILITY FUNCTIONS ===================
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 3000);
}

// =================== OFFLINE FUNCTIONALITY ===================
// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Handle online/offline status
window.addEventListener('online', () => {
    showToast('Connection restored', 'success');
});

window.addEventListener('offline', () => {
    showToast('Working offline', 'warning');
});

// =================== ACCESSIBILITY ===================
// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modal = bootstrap.Modal.getInstance(openModal);
            modal.hide();
        }
    }
    
    // Enter key to activate buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Focus management for better accessibility
function manageFocus() {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('.modal.show');
    
    if (modal) {
        const focusableContent = modal.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
        
        firstFocusableElement.focus();
    }
}

// Initialize focus management when modals are shown
document.addEventListener('shown.bs.modal', manageFocus);

console.log('ASHA Saathi application initialized successfully');