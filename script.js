let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.maincard')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.maincard')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.maincard');
    const body = document.body;
    const colorThief = new ColorThief();

    items.forEach((item, index) => {
        const img = new Image();
        img.src = item.style.backgroundImage.slice(5, -2);
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
            const dominantColor = colorThief.getColor(img);
            if(index === 1) { // Assuming the second image is displayed initially
                body.style.backgroundColor = `rgb(${dominantColor.join(',')})`;
            }

            item.addEventListener('click', () => {
                body.style.backgroundColor = `rgb(${dominantColor.join(',')})`;
            });
        };
    });

    // Add navigation functionality
    let currentIndex = 0;

    document.querySelector('.next').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
        updateBackgroundColor(currentIndex);
    });

    document.querySelector('.prev').addEventListener('click', () => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex].classList.add('active');
        updateBackgroundColor(currentIndex);
    });

    function updateBackgroundColor(index) {
        const img = new Image();
        img.src = items[index].style.backgroundImage.slice(5, -2);
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
            const dominantColor = colorThief.getColor(img);
            body.style.backgroundColor = `rgb(${dominantColor.join(',')})`;
        };
    }
});
