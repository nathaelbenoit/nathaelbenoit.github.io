window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var nav = document.querySelector('nav');
    var contenulistes = document.querySelectorAll('.contenuliste');

    if (window.scrollY > header.offsetHeight) {
        nav.classList.add('fixed-nav');
        contenulistes.forEach(list => {
            list.classList.add('fixed-contenuliste');
            list.style.top = nav.offsetHeight + 'px';
        });
    } else {
        nav.classList.remove('fixed-nav');
        contenulistes.forEach(list => {
            list.classList.remove('fixed-contenuliste');
            list.style.top = 'auto';
        });
    }
});

document.querySelectorAll('.bouton').forEach(button => {
    button.addEventListener('click', function() {
        var targetDetails = document.getElementById(this.getAttribute('data-details'));
        targetDetails.classList.toggle('visible');
    });
});

document.querySelectorAll('.project-details .close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        var targetDetails = this.parentElement;
        targetDetails.classList.remove('visible');
    });
});