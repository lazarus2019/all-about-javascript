/*
    Validation Form - Tạo 1 constructor có khả năng kiểm tra các trường enable form và tái sử dụng được

    1. Check lỗi khi blur ra khỏi input
        - Required: Lỗi không nhập/chọn thông tin
        - Email: Lỗi không nhập đúng định dạng email
        - MinLength: Lỗi nhập quá ít ký tự cho phép
        - Confirm password: Lỗi mật khẩu xác nhận không trùng
    2. Không hiện lỗi trong quá trình người dùng nhập
    3. Cho phép tự custom message lỗi
    4. Check multiple lỗi
    5. Return data với callback submit
    6. Check lỗi đối với radio
    7. Check lỗi đối với checkbox
    8. Check lỗi đối với upload file
*/

// Đối tượng `Validator`
function Validator(options) {

    let selectorRules = {}

    function getParentInput(element, parentSelector) {
        return element.closest(parentSelector)

        // Cách khác: sử dụng matches
        // while (element.parentElement){
        //     if(element.parentElement.matches(parentSelector)){
        //         return element.parentElement
        //     }
        //     element = element.parentElement
        // }
    }

    // Hàm nhận và thực hiện validate
    function validate(inputElement, rule) {
        let errorElement = getParentInput(inputElement, options.parentInputSelector).querySelector(options.errorSelector)
        // value: inputElement.value
        // test func: rule.test
        let errorMessage

        // Lấy ra các rules của selector
        const rules = selectorRules[rule.selector]

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra
        for (let i = 0; i < rules.length; i++) {
            // Xác định input kiểu radio, checkbox, hay dạng nhập dữ liệu
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                default:
                    errorMessage = rules[i](inputElement.value.trim())
            }
            if (errorMessage) break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            getParentInput(inputElement, options.parentInputSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParentInput(inputElement, options.parentInputSelector).classList.remove('invalid')
        }

        return !errorMessage
    }

    // Lấy element của form cần validate
    const formElement = document.querySelector(options.form)

    if (formElement) {
        // Khi submit form
        formElement.addEventListener('submit', e => {
            e.preventDefault()

            let isFormValid = true

            // Lặp qua từng rules và validate
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })

            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = formElement.querySelectorAll('[name]:not([disabled])')

                    let formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector(`input[name="${input.name}"]:checked`).value
                                break
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = ''
                                    return values
                                }

                                if (!Array.isArray(values[input.name])) values[input.name] = []

                                values[input.name].push(input.value)
                                break
                            case 'file':
                                values[input.name] = input.files
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values
                    }, {})

                    options.onSubmit(formValues)
                } else {
                    formElement.submit()
                }
            }
        })


        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện: blur, input,...)
        options.rules.forEach(rule => {
            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

            let inputElements = formElement.querySelectorAll(rule.selector)

            inputElements.forEach(inputElement => {
                // Xử lý trường hợp blur khỏi input
                inputElement.addEventListener('blur', () => {
                    validate(inputElement, rule)
                })

                inputElement.addEventListener('change', () => {
                    validate(inputElement, rule)
                })

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.addEventListener('input', () => {
                    let errorElement = getParentInput(inputElement, options.parentInputSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    getParentInput(inputElement, options.parentInputSelector).classList.remove('invalid')
                })
            })

        })
        console.log(selectorRules)
    }

}

// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lên => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này!'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

            return regex.test(value.trim()) ? undefined : message || 'Trường này phải là email!'
        }
    }
}

Validator.minLength = function (selector, minLength, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= minLength ? undefined : message || `Vui lòng nhập tối thiểu ${minLength} ký tự`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}