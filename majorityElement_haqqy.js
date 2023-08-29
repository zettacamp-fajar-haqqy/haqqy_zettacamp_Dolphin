
/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */

function majorityElement(nums) {


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
          check2.add(arrayCounter[x])
          arrayCounter.push(nums.slice(nums.indexOf(nums[x]), (nums.lastIndexOf(nums[x]) + 1)))
      }

      check1.add(nums[x])
  }

  console.log(arrayCounter)

  if(arrayCounter.length >= 1) {

      let longestArray = arrayCounter[0]

      for(let x = 0; x < arrayCounter.length; x++){
          if(arrayCounter[x].length > longestArray.length){
              longestArray = arrayCounter[x]
          }
      }

      return `\nMajority element is ${longestArray[0]}`

  } else {
    return `\nMajority element is ${arrayCounter[0]}`
  }

}

/* function majorityElement(nums) {
  // Your logic here

  // Algoritma mencari majority element

  // 1. Membuat objek baru yang akan diisi dengan properti = angka, value = kemunculan angka
  // 2. Pengecekan dilakukan dengan objek Set, apabila false (elemen belum berada di Set) maka akan menambahkan elemen tersebut ke Set dengan method add
  // 3. Apabila true maka menambahkan angka tersebut ke objek
  // 4. Mengecek objek mana yang memiliki value paling banyak
  // 5. Return properti dari objek yang memiliki value paling banyak


  // Membuat objek baru yang akan digunakan sebagai counter
  let counter = {}

  // Membuat objek Set() bawaan javascript untuk mengecek apakah terdapat angka yang sama

  const check = new Set()

  // Perulangan untuk membaca array dari parameter nums

  console.log(`\n${nums}\n`)
  console.log(`\nIlustration of how counter Object is filled\n`)

  for(let x = 0; x < nums.length; x++){
    if(check.has(nums[x])){           // True apabila terdapat angka pada variable check

      // Mengisikan objek variable counter dengan properti angka dari nums array ke x, dan value berapa kali angka tersebut muncul

      counter[nums[x]] = (counter[nums[x]] || 0) + 1
      console.log(counter)
    }
    check.add(nums[x])    // Menambahkan angka yang belum ada ke variabel check
  }

  // Deklarasi 2 variabel untuk menentukan angka mana yang muncul lebih banyak

  let maxKey = 0;
  let maxValue = 0;

  // Perulangan untuk mengecek setiap properti pada Objek counter

  for (let x = 0; x < Object.keys(counter).length; x++) {
    const key = Object.keys(counter)[x];      // Membuat variabel baru untuk menyimpan suatu properti

    // Apabila value dari suatu properti lebih besar dari maxValue maka maxValue akan diganti dengan value dari properti tersebut, dan maxKey akan diganti dengan nama properti.
    
    if (counter[key] > maxValue) {
      maxValue = counter[key];
      maxKey = key;
    }
  }

  return `\nMajority element is ${maxKey}`
} */


console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); 
console.log(majorityElement([3, 2, 3]));

