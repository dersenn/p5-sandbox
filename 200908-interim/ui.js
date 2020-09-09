const disc = document.getElementById('theDisc')
const bodyTag = document.querySelector('body')

const toggleInfo = function() {
    bodyTag.classList.toggle('info-active')
}


disc.addEventListener('click', function() {
    toggleInfo()
})