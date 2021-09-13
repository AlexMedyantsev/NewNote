function Cat(color, name) {
    this.color = color;
    this.name = name;
}

function myNew(constructor, ...args) {
    let obj = {}
    Object.setPrototypeOf(obj, constructor.prototype)
    return constructor.apply(obj, args) || obj
}

let newCat = myNew(Cat, 'Gray', 'Tishka')
console.log(newCat)