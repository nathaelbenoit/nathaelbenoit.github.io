document.querySelectorAll('.bouton').forEach(button => {
    button.addEventListener('click', function() {
        var targetDetails = document.getElementById(this.getAttribute('data-details'));
        targetDetails.classList.toggle('visible');
    });
});

document.querySelectorAll('.popup-details .close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        var targetDetails = this.parentElement;
        targetDetails.classList.remove('visible');
    });
});