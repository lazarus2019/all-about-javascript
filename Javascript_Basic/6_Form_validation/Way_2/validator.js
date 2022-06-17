/*


*/

function Validator(formSelector, parentInputSelector, messageSelector) {

    const _this = this
    let formRules = {
        // Logic
        // fullname: 'required',
        // email: 'required|email'
    }

    /*
    Quy ước tạo rule:
    1. Nếu có lỗi thì return `error message`
    2. Nếu dữ liệu hợp lệ thì return undefined
*/
    let validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        email: function (value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là email'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Vui lòng chỉ nhập tối đa ${max} ký tự`
            }
        },
        confirm: function (value, confirmValue) {
            return value === confirmValue ? undefined : 'Giá trị nhập vào không chính xác'
        }
    }

    // Hàm lấy ra phần tử cha theo selector
    function getParent(element, selector) {
        return element.closest(selector)
    }

    // Lấy ra form element trong DOM theo `formSelector`
    const formElement = document.querySelector(formSelector)

    // Chỉ xử lý khi có element trong DOM
    if (formElement) {
        const inputs = formElement.querySelectorAll('[name][rules]')


        for (const input of inputs) {
            let rules = input.getAttribute('rules').split('|')
            for (let rule of rules) {
                let ruleInfo
                let isRuleHasValue = rule.includes(':')

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                let ruleFunc = isRuleHasValue ? validatorRules[rule](ruleInfo[1]) : validatorRules[rule]

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc]
                }
            }

            // Lắng nghe sự kiện để validate (blur, change,...)
            input.addEventListener('blur', handleValidate)
        }

        // Hàm thực hiện validate
        function handleValidate(e) {
            const rules = formRules[e.target.name]
            let errorMessage

            for (let rule of rules) {
                errorMessage = rule(e.target.value)
                if (errorMessage) break
            }

            // Nếu có lỗi thì hiển thị ra UI
            if (errorMessage) {
                handleShowError(e, errorMessage)
            } else {
                handleClearError(e)
            }

            return !errorMessage
        }

        // Hàm lấy phần tử cha và element message
        function getParentAndElementMessage(e) {
            let formGroup = getParent(e.target, parentInputSelector)
            let formMessage
            if (formGroup) {
                formMessage = formGroup.querySelector(messageSelector)
            }

            return {
                parent: formGroup,
                message: formMessage
            }
        }

        // Hàm show message lỗi
        function handleShowError(e, errorMessage) {
            const formBlocks = getParentAndElementMessage(e)

            formBlocks.parent.classList.add('invalid')
            formBlocks.message.innerText = errorMessage
        }

        // Hàm clear message lỗi
        function handleClearError(e) {
            const formBlocks = getParentAndElementMessage(e)

            formBlocks.parent.classList.remove('invalid')
            formBlocks.message.innerText = ''
        }
    }

    // Xử lý hành vi submit form
    formElement.addEventListener('submit', (e) => {
        e.preventDefault()

        const inputs = formElement.querySelectorAll('[name][rules]')
        let isValid = true

        for (let input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false
            }
        }

        // Khi không có lỗi thì submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                let enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

                let formValues = Array.from(enableInputs).reduce((values, input) => {
                    switch (input.type) {
                        case 'checkbox':
                            break
                        case 'radio':
                            break
                        default:
                            values[input.name] = input.value
                    }
                    return values
                }, {})

                _this.onSubmit(formValues)
            } else {
                formElement.submit()
            }
        }
    })
}