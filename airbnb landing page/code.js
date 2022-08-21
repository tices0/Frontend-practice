const slide = document.querySelector('.slides')
const slides = document.querySelectorAll('.slide')

// Buttons
const prevBtn = document.querySelector('#prev-btn')
const nextBtn = document.querySelector('#next-btn')

// counter
let counter = 1
const size = slides[0].clientWidth

slide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// Event listeners
nextBtn.addEventListener('click', ()=> {
    if (counter >= slides.length - 1) return
    slide.style.transition = 'transform 0.4s ease-in-out'
    counter++
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    circle()
})

prevBtn.addEventListener('click', ()=> {
    if (counter <= 0) return
    slide.style.transition = 'transform 0.4s ease-in-out'
    counter--
    slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    circle()
})

slide.addEventListener('transitionend', () => {
    if (slides[counter].id === 'lastClone') {
        slide.style.transition = 'none'
        counter = slides.length - 2
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }

    if (slides[counter].id === 'firstClone') {
        slide.style.transition = 'none'
        counter = slides.length - counter
        slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
})

// cicles

const circles = document.querySelectorAll('.fa-circle')
circles[0].style.color = '#767676'

function circle() {
    circles.forEach(c => {
        c.style.color = '#C3C3C3'
    })
    if (counter === 6) {
        current = circles[0]
    } else if (counter === 0) {
        current = circles[4]
    } else {
        current = circles[counter - 1]
    }
    // console.log(counter)
    current.style.color = '#767676'
}

// ======================
// drop down

const currentOption = document.querySelector('#current-option')
const areaList = document.querySelector('#area-list')
const areaOptions = document.querySelectorAll('#area-list .list-option')

areaList.style.display = 'none'

areaOptions[0].insertAdjacentHTML(
    'beforeend',
    '<i class="fa-solid fa-check area-check fa-sm" id="check"></i>'
)

currentOption.addEventListener('click', () => {
    console.log('clicked')
    if (areaList.style.display === 'none') {
        areaList.style.display = 'block'
    } else {
        areaList.style.display = 'none'
    }
})

areaOptions.forEach(option => {
    option.addEventListener('click', () => {
        clicked = option.innerHTML.toLocaleLowerCase()
        currentOption.innerHTML = `${clicked} <i class="fa-solid fa-chevron-down"></i>`
        areaList.style.display = 'none'

        document.querySelectorAll('.area-check').forEach(c => {
            c.remove()
        })

        option.insertAdjacentHTML(
            'beforeend',
            '<i class="fa-solid fa-check fa-sm area-check" id="check"></i>'
        )
    })
})

// guests

const currentGuests = document.querySelector('#guests')
const guestList = document.querySelector('#guest-list')

for (i=0; i < 16; i++) {
    if (i === 1) {
        guestList.insertAdjacentHTML(
            'beforeend',
            `<li class='list-option'>1 guest</li>`
            )
        } else {
            guestList.insertAdjacentHTML(
                'beforeend',
            `<li class='list-option'>${i} guests</li>`
            )
        }
        
}

guestList.style.display = 'none'
    
const guestOptions = document.querySelectorAll('#guest-list .list-option')

guestOptions[4].insertAdjacentHTML(
    'beforeend',
    '<i class="fa-solid fa-check fa-sm guest-check" id="check"></i>'
)


currentGuests.addEventListener('click', () => {
    console.log('clicked')
    if (guestList.style.display === 'none') {
        guestList.style.display = 'block'
    } else {
        guestList.style.display = 'none'
    }
})

guestOptions.forEach(option => {
    option.addEventListener('click', () => {
        clicked = option.innerHTML
        currentGuests.innerHTML = `${clicked} <i class="fa-solid fa-chevron-down"></i>`
        guestList.style.display = 'none'

        document.querySelectorAll('.guest-check').forEach(c => {
            c.remove()
        })

        option.insertAdjacentHTML(
            'beforeend',
            '<i class="fa-solid fa-check fa-sm guest-check" id="check"></i>'
        )
    })
})

// ======================
// multiple image slider

const boxesView = document.querySelector('.boxes')
const boxes = document.querySelectorAll('.box')
const fade = document.querySelector(".fade");

// btns
const forwardBtn = document.querySelector('#forwards')
const backBtn = document.querySelector('#backwards')

boxSize = boxes[0].clientWidth

forwardBtn.addEventListener('click', () => {
  boxesView.scrollBy(boxSize, 0)
})

backBtn.addEventListener('click', () => {
  boxesView.scrollBy(-boxSize, 0)
})

console.log(boxesView.scrollWidth, 'scroll width')
console.log(boxesView.offsetWidth, 'offset width')

boxesView.addEventListener('scroll', () => {
    console.log(boxesView.scrollLeft)
    if (boxesView.scrollLeft === 0) {
        backBtn.style.display = 'none'
    } else if (Math.round(boxesView.scrollLeft + boxesView.offsetWidth) >= boxesView.scrollWidth) {
        forwardBtn.style.display = 'none'
    } else {
        backBtn.style.display = 'block'
        forwardBtn.style.display = 'block'
    }
})


// ======================
// float animation

const floatOb1 = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            console.log('float 1')
            entry.target.classList.toggle('float-1', entry.isIntersecting)
            if (entry.isIntersecting) floatOb1.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.5,
    }
)

const floatOb2 = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            console.log('float 2')
            entry.target.classList.toggle('float-2', entry.isIntersecting)
            if (entry.isIntersecting) floatOb2.unobserve(entry.target)
        })
    }, 
    {
        threshold: 0.5,
    }
)

const float1 = document.querySelector('#float-1')
const float2 = document.querySelector('#float-2')

floatOb1.observe(float1)
floatOb2.observe(float2)