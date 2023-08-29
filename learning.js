/* function majorityElement(nums) {


    // Algoritma mencari majority element

    // 1. Melakukan sort supaya elemennya berkumpul dengan yang sama
    // 2. Melakukan slice terhadap elemen yang sama
    // 3. Membandingkan panjang array yang sudah dislice
    // 4. Return index ke 0 array yang paling panjang

    
    const check1 = new Set()
    const check2 = new Set()

    let arrayCounter = []
    
    nums = nums.sort()

    console.log(`\n ${nums}\n`)
    for(let x = 0; x < nums.length; x++){
        if(check1.has(nums[x])){
            if(check2.has(arrayCounter[x])){
                x = (nums.lastIndexOf(nums[x]) + 1)
            }
            arrayCounter.push(nums.slice(nums.indexOf(nums[x]), (nums.lastIndexOf(nums[x]) + 1)))
            check2.add(arrayCounter[x])
        }

        check1.add(nums[x])
    }

    if(arrayCounter.length >= 1) {

        let longestArray = arrayCounter[0]

        for(let x = 0; x < arrayCounter.length; x++){
            if(arrayCounter[x].length > longestArray.length){
                longestArray = arrayCounter[x]
            }
        }

        return longestArray[0]

    } else {
        return arrayCounter[0]
    }

}

console.log(majorityElement([3, 2, 3]));
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
console.log(majorityElement([1,3,5,5,1,5,1,2,5,6,7,8,1,1,6,6,0,8,8,7,6])) */


// Mencoba method objek

// 1. defineProperties()

const obj1 = {}

Object.defineProperties(obj1, {
    property1: {
        value: 42,
        writable: true,
        enumerable: false
    },
    property2: {
        value: 43,
        writable: true,
        enumerable: true
    },
    property3: {
        value: 44,
        writable: true,
        enumerable: true
    }
})


// 2. getOwnPropertyNames()

console.log(Object.getOwnPropertyNames(obj1))

// 3. keys()

console.log(Object.keys(obj1))

// 4. freeze()

Object.freeze(obj1)
obj1.property3 = 50
console.log(obj1)

// 5. values()

console.log(Object.values(obj1))