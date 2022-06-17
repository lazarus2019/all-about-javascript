function ToastNotification(toastSelector, toastInfo) {
    const SLIDE_LEFT_DURATION = 0.3
    const FADEOUT_DURATION = 1

    const toastElement = document.querySelector(toastSelector)

    const icons = {
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info',
        warning: 'fa-solid fa-circle-exclamation',
        error: 'fa-solid fa-bug',
    }

    if (toastInfo) {
        let title = toastInfo.title
        let message = toastInfo.message || 'You did it!'
        let type = toastInfo.type || 'success'
        let duration = toastInfo.duration || 3000

        const toast = document.createElement('div')

        const autoRemoveToast = setTimeout(() => {
            toastElement.removeChild(toast)
        }, duration + FADEOUT_DURATION * 1000)

        toast.addEventListener('click', (e) => {
            if (e.target.closest('.toast-close-icon')) {
                toastElement.removeChild(toast)
                clearTimeout(autoRemoveToast)
            }
        })

        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)

        toast.classList.add('toast-box', `toast-box--${type}`)
        toast.style.animation = `slideLeft ease ${SLIDE_LEFT_DURATION}s, fadeOut linear ${FADEOUT_DURATION}s ${delay}s forwards`

        toast.innerHTML = `
        <span class="toast-main-icon">
            <i class="${icon}"></i>
        </span>
        <div class="toast-content">
            <h3 class="toast-content-heading">${title}</h3>
            <p class="toast-content-description">${message}</p>
        </div>
        <span class="toast-close-icon">
            <i class="fa-solid fa-xmark"></i>
        </span>
        `

        toastElement.appendChild(toast)
    }
}