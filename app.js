document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const openMenuBtn = document.querySelector('.fa-bars');
    const closeMenuBtn = document.querySelector('.fa-xmark');
    const form = document.forms['submit-to-google-sheet'];
    const submitButton = form.querySelector('.submit-button');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxP4nEouP5Ig7eNBrlOZTXYnjfVybfW3BshI2o76USD_tZ9CdUI6-OiLJPsw1r_Kzs_/exec';

    function openmenu() {
        menu.style.right = '0';
    }

    function closemenu() {
        menu.style.right = '-200px';
    }

    openMenuBtn.addEventListener('click', openmenu);
    closeMenuBtn.addEventListener('click', closemenu);

    // Initialize Typed.js
    let typed = null;
    function InitializeTyped() {
        typed = new Typed('#element', {
            strings: ['Front End Developer.'],
            typeSpeed: 50,
            onComplete:function(self){
                setTimeout(function() {
                    self.reset();
                    self.start();
                },3000);                
            }
        });
    }
    
    InitializeTyped();
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm() {
        let valid = true;
        form.querySelectorAll('[required]').forEach((input) => {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('warning');
                const warningMessage = input.nextElementSibling;
                if (warningMessage && warningMessage.classList.contains('warning-message')) {
                    warningMessage.textContent = `${input.name} is required`;
                }
            } else {
                input.classList.remove('warning');
                const warningMessage = input.nextElementSibling;
                if (warningMessage && warningMessage.classList.contains('warning-message')) {
                    warningMessage.textContent = '';
                }
                if (input.type === 'email' && !validateEmail(input.value.trim())) {
                    valid = false;
                    input.classList.add('warning');
                    if (warningMessage) {
                        warningMessage.textContent = 'Please enter a valid email address';
                    }
                }
            }
        });
        return valid;
    }


    function resetForm(){
        form.reset();
        form.querySelectorAll('.warning-message').forEach((warning) =>{
            warning.textContent = '';
        })
    }

    resetForm();

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateForm()) {
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {console.log('Success!', response);
                resetForm();
            })
                .catch(error => console.error('Error!', error.message));
        }
    });

    submitButton.addEventListener('click', e => {
        e.preventDefault();
        form.dispatchEvent(new Event('submit', { cancelable: true }));
    });
});
