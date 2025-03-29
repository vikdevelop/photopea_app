// renderer.js
(function () {
    // Function to remove the "Account" button
    function killAccountButton() {
        const buttons = document.querySelectorAll('span button.fitem.bbtn[style="color:#ffffff; background-color:#bb0000"]');
        buttons.forEach(button => {
            if (button.textContent.trim() === 'Account') {
                button.remove();
                console.log('Account button removed'); // Debug log
            }
        });
    }

    // Wait for the page to fully load, then remove the button once
    window.addEventListener('load', () => {
        console.log('Page fully loaded, removing Account button');
        killAccountButton();
    });
})();
