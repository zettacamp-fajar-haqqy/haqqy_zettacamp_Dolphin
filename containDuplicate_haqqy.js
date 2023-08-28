
/**
 * write a function that returns true if there's duplicate in the array, and false otherwise.
 * SEE EXAMPLE BELLOW!
 * 
 * 
Example
console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true

 * Determines if the array contains any duplicate value.

 * @param {number[]} nums - The input array of integers.
 * @return {boolean} Returns true if the array contains any duplicate value, false otherwise.
 */
function containsDuplicate(nums) {
    // Your logic here

  const check = new Set()
  // let temp = new Set()

  // let sameNumber = []
  
  for(let x = 0; x < nums.length; x++){
    if(check.has(nums[x])){
      // temp.add(nums[x])
      return true
    }
    
    check.add(nums[x])
  }
  
  /* sameNumber = Array.from(temp)

  if(temp.size > 0) {
    console.log(sameNumber)
    return true
  } */

  return false
}

console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
console.log(containsDuplicate([1, 2, 3, 4])); // Output: false
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); // Output: true