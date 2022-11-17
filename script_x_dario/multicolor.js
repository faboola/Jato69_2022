
/* -------------------------------------------------------------------------- */
/*                        SCROLL MONITOR CHANGE COLORS                        */
/* -------------------------------------------------------------------------- */


const header = document.querySelector('#mainHeader')
const sections = [...document.querySelectorAll('[data-section]')]
const scrollRoot = document.querySelector('#scrollsnap')
let prevYPosition = 0
let direction = 'up'

const options = {
	rootMargin: `${header.offsetHeight * -1}px`,
	threshold: 0
}

const getTargetSection = (entry) => {
	const index = sections.findIndex((section) => section == entry.target)

	if (index >= sections.length - 1) {
	 return entry.target
	} else {
	 return sections[index + 1]
	}
}

const updateColors = (target) => {
	const theme = target.dataset.section
	header.setAttribute('data-theme', theme)
}

const shouldUpdate = (entry) => {
	if (direction === 'down' && !entry.isIntersecting) {
		return true
	}

	if (direction === 'up' && entry.isIntersecting) {
		return true
	}

	return false
}

const onIntersect = (entries) => {
	entries.forEach((entry) => {
		if (window.scrollY > prevYPosition) {
			direction = 'down'
		} else {
			direction = 'up'
		}

		prevYPosition = window.scrollY

		const target = direction === 'down' ? getTargetSection(entry) : entry.target

		if (shouldUpdate(entry)) {
			updateColors(target)
			//updateMarker(target)
		}
	})
}


const observer = new IntersectionObserver(onIntersect, options)

sections.forEach((section) => {
	observer.observe(section)
})
