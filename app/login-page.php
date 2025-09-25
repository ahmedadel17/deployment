<?php include 'header.php'; ?>

<div class="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8">

        <!-- Logo/Header -->
        <div class="text-center">
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Sign in to your account or create a new one
            </p>
        </div>

        <!-- Phone Number Step -->
        <div id="phone-step" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">

            <form id="phone-form" class="space-y-6">
                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Phone Number
                    </label>
                    <div class="mt-1 relative">
                        <div class="absolute inset-y-0 start-00 ps-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">+966</span>
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            class="block w-full ps-16 pr-5 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                            placeholder="5XXXXXXXX"
                            pattern="5[0-9]{8}"
                            maxlength="9">
                    </div>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Enter your Saudi phone number (starting with 5)
                    </p>
                </div>

                <div>
                    <button
                        type="submit"
                        id="phone-submit"
                        class="te-btn te-btn-primary w-full flex justify-center items-center">
                        <span id="phone-submit-text">Continue</span>
                        <div id="phone-loading" class="hidden ml-2">
                            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>

        <!-- Registration Step (Hidden by default) -->
        <div id="register-step" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 hidden">
            <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create Your Account</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">We need a few more details to get started</p>
            </div>

            <form id="register-form" class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        minlength="2">
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email address">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Phone Number
                    </label>
                    <div class="mt-1 relative">
                        <div class="absolute inset-y-0 start-00 ps-3 flex items-center pointer-events-none">
                            <span class="text-gray-500 dark:text-gray-400 text-sm">+966</span>
                        </div>
                        <input
                            type="tel"
                            id="register-phone"
                            name="register_phone"
                            readonly
                            class="block w-full ps-12 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                    </div>
                </div>

                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="text-gray-700 dark:text-gray-200">
                            I agree to the <a href="#" class="text-primary-600 hover:text-primary-500">Terms of Service</a>
                            and <a href="#" class="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                        </label>
                    </div>
                </div>

                <div class="flex space-x-4">
                    <button
                        type="button"
                        id="back-to-phone"
                        class="te-btn te-btn-default">
                        Back
                    </button>
                    <button
                        type="submit"
                        id="register-submit"
                        class="te-btn te-btn-primary flex-1 flex justify-center items-center">
                        <span id="register-submit-text">Create Account</span>
                        <div id="register-loading" class="hidden ml-2">
                            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>

        <!-- OTP Verification Step (Hidden by default) -->
        <div id="otp-step" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 hidden">
            <div class="mb-6 text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                    <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Verify Your Phone</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    We sent a verification code to <span id="sent-to-phone" class="font-medium"></span>
                </p>
            </div>

            <form id="otp-form" class="space-y-6">
                <div>
                    <label for="otp" class="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        required
                        class=" text-center text-xl font-mono tracking-widest"
                        placeholder="000000"
                        maxlength="6"
                        pattern="[0-9]{6}">
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                        Enter the 6-digit code sent to your phone
                    </p>
                </div>

                <div class="text-center">
                    <button
                        type="button"
                        id="resend-otp"
                        class="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled>
                        <span id="resend-text">Resend code in </span>
                        <span id="countdown">60</span>s
                    </button>
                </div>

                <div class="flex space-x-4">
                    <button
                        type="button"
                        id="back-to-phone-from-otp"
                        class="te-btn te-btn-default">
                        Change Phone
                    </button>
                    <button
                        type="submit"
                        id="otp-submit"
                        class="te-btn te-btn-primary flex-1 flex justify-center items-center">
                        <span id="otp-submit-text">Verify & Sign In</span>
                        <div id="otp-loading" class="hidden ml-2">
                            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                    </button>
                </div>
            </form>
        </div>

        <!-- Error Messages -->
        <div id="error-message" class="hidden bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-red-800 dark:text-red-200" id="error-text"></p>
                </div>
            </div>
        </div>

        <!-- Success Message -->
        <div id="success-message" class="hidden bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-green-800 dark:text-green-200" id="success-text"></p>
                </div>
            </div>
        </div>

    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Elements
        const phoneStep = document.getElementById('phone-step');
        const registerStep = document.getElementById('register-step');
        const otpStep = document.getElementById('otp-step');
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');

        // Forms
        const phoneForm = document.getElementById('phone-form');
        const registerForm = document.getElementById('register-form');
        const otpForm = document.getElementById('otp-form');

        // Current user data
        let currentPhone = '';
        let isNewUser = false;
        let countdownTimer;

        // Utility functions
        function showError(message) {
            document.getElementById('error-text').textContent = message;
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
        }

        function showSuccess(message) {
            document.getElementById('success-text').textContent = message;
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        }

        function hideMessages() {
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
        }

        function formatPhoneNumber(phone) {
            return '+966 ' + phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
        }

        function setLoading(buttonId, loadingId, textId, loading, text) {
            const button = document.getElementById(buttonId);
            const loadingEl = document.getElementById(loadingId);
            const textEl = document.getElementById(textId);

            button.disabled = loading;
            loadingEl.classList.toggle('hidden', !loading);
            textEl.textContent = text;
        }

        // Step 1: Phone number submission
        phoneForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessages();

            const phone = document.getElementById('phone').value.trim();

            // Validate phone number
            if (!/^5[0-9]{8}$/.test(phone)) {
                showError('Please enter a valid Saudi phone number starting with 5');
                return;
            }

            currentPhone = phone;
            setLoading('phone-submit', 'phone-loading', 'phone-submit-text', true, 'Checking...');

            try {
                // Simulate API call to check if user exists
                const response = await fetch('check-user.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phone
                    })
                });

                const data = await response.json();

                if (data.exists) {
                    // Existing user - send OTP and go to verification
                    isNewUser = false;
                    await sendOTP();
                    showOTPStep();
                } else {
                    // New user - show registration form
                    isNewUser = true;
                    showRegisterStep();
                }
            } catch (error) {
                // Simulate the flow for demo
                setTimeout(() => {
                    // For demo: assume user doesn't exist if phone starts with 50, exists otherwise
                    if (phone.startsWith('50')) {
                        isNewUser = true;
                        showRegisterStep();
                    } else {
                        isNewUser = false;
                        showOTPStep();
                        startCountdown();
                    }
                    setLoading('phone-submit', 'phone-loading', 'phone-submit-text', false, 'Continue');
                }, 1500);
            }
        });

        // Step 2: Registration form
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessages();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const terms = document.getElementById('terms').checked;

            // Validation
            if (!name || name.length < 2) {
                showError('Please enter your full name (at least 2 characters)');
                return;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('Please enter a valid email address');
                return;
            }

            if (!terms) {
                showError('Please accept the Terms of Service and Privacy Policy');
                return;
            }

            setLoading('register-submit', 'register-loading', 'register-submit-text', true, 'Creating Account...');

            try {
                // Simulate API call to register user
                const response = await fetch('register-user.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: currentPhone,
                        name: name,
                        email: email
                    })
                });

                const data = await response.json();

                if (data.success) {
                    showSuccess('Account created successfully! Sending verification code...');
                    setTimeout(() => {
                        showOTPStep();
                    }, 1500);
                } else {
                    showError(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
                // Simulate successful registration for demo
                setTimeout(() => {
                    showSuccess('Account created successfully! Sending verification code...');
                    setTimeout(() => {
                        showOTPStep();
                        startCountdown();
                    }, 1500);
                    setLoading('register-submit', 'register-loading', 'register-submit-text', false, 'Create Account');
                }, 1500);
            }
        });

        // Step 3: OTP verification
        otpForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            hideMessages();

            const otp = document.getElementById('otp').value.trim();

            if (!/^[0-9]{6}$/.test(otp)) {
                showError('Please enter a valid 6-digit verification code');
                return;
            }

            setLoading('otp-submit', 'otp-loading', 'otp-submit-text', true, 'Verifying...');

            try {
                // Simulate API call to verify OTP
                const response = await fetch('verify-otp.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: currentPhone,
                        otp: otp
                    })
                });

                const data = await response.json();

                if (data.success) {
                    showSuccess('Phone verified successfully! Signing you in...');
                    setTimeout(() => {
                        window.location.href = 'dashboard.php';
                    }, 1500);
                } else {
                    showError(data.message || 'Invalid verification code. Please try again.');
                }
            } catch (error) {
                // Simulate successful verification for demo
                setTimeout(() => {
                    if (otp === '123456' || otp === '000000') {
                        showSuccess('Phone verified successfully! Signing you in...');
                        setTimeout(() => {
                            window.location.href = 'dashboard.php';
                        }, 1500);
                    } else {
                        showError('Invalid verification code. Please try again.');
                    }
                    setLoading('otp-submit', 'otp-loading', 'otp-submit-text', false, 'Verify & Sign In');
                }, 1500);
            }
        });

        // Navigation buttons
        document.getElementById('back-to-phone').addEventListener('click', function() {
            showPhoneStep();
        });

        document.getElementById('back-to-phone-from-otp').addEventListener('click', function() {
            showPhoneStep();
        });

        // Resend OTP
        document.getElementById('resend-otp').addEventListener('click', async function() {
            await sendOTP();
            startCountdown();
            showSuccess('Verification code sent successfully!');
        });

        // Step display functions
        function showPhoneStep() {
            phoneStep.classList.remove('hidden');
            registerStep.classList.add('hidden');
            otpStep.classList.add('hidden');
            hideMessages();
            if (countdownTimer) clearInterval(countdownTimer);
        }

        function showRegisterStep() {
            phoneStep.classList.add('hidden');
            registerStep.classList.remove('hidden');
            otpStep.classList.add('hidden');
            document.getElementById('register-phone').value = formatPhoneNumber(currentPhone);
            hideMessages();
        }

        function showOTPStep() {
            phoneStep.classList.add('hidden');
            registerStep.classList.add('hidden');
            otpStep.classList.remove('hidden');
            document.getElementById('sent-to-phone').textContent = formatPhoneNumber(currentPhone);
            document.getElementById('otp').focus();
            hideMessages();
        }

        // OTP-related functions
        async function sendOTP() {
            try {
                const response = await fetch('send-otp.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: currentPhone
                    })
                });

                const data = await response.json();
                console.log('OTP sent:', data.message);
            } catch (error) {
                console.log('Demo mode: OTP would be sent to', currentPhone);
            }
        }

        function startCountdown() {
            let seconds = 60;
            const countdownEl = document.getElementById('countdown');
            const resendBtn = document.getElementById('resend-otp');
            const resendText = document.getElementById('resend-text');

            resendBtn.disabled = true;
            resendText.textContent = 'Resend code in ';

            countdownTimer = setInterval(() => {
                seconds--;
                countdownEl.textContent = seconds;

                if (seconds <= 0) {
                    clearInterval(countdownTimer);
                    resendBtn.disabled = false;
                    resendText.textContent = 'Resend code';
                    countdownEl.textContent = '';
                }
            }, 1000);
        }

        // Auto-format phone input
        document.getElementById('phone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 9) value = value.slice(0, 9);
            e.target.value = value;
        });

        // Auto-format OTP input
        document.getElementById('otp').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 6) value = value.slice(0, 6);
            e.target.value = value;
        });
    });
</script>

<?php include 'footer.php'; ?>