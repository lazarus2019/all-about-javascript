// https://www.w3schools.com/js/js_comparisons.asp

// Ternary Operator - Toán tử 3 ngôi

let course = {
    name: 'Javascript',
    price: 201
}

if(course.price > 0){
    console.log(`Course price: ${course.price}`)
}else{
    console.log('It\'s Free')
}

// Using ternary operator
let result = course.price > 0 ? `Course price: ${course.price}` : 'It\'s Free'
console.log(result)
