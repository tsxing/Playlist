const toggleButton = document.getElementById('light-dark-toggle');
        const body = document.body;

        toggleButton.addEventListener('click', () => {
    
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
            
            // Change the icon based on mode
            if (body.classList.contains('dark-mode')) {
                toggleButton.innerHTML = '<i class="fa fa-moon-o"></i>';
                console.log("ITS DAR KMODE NOW");
            } else {
                toggleButton.innerHTML = '<i class="fa fa-sun-o"></i>';
            }
        });