//user
function checkTopString(a) {
  let ret = []
  for (let i = 0; i < a.length; i++) {
    const foundIndex = ret.findIndex(({ key }) => key === a[i])
    foundIndex > -1 ? ret[foundIndex].count += 1 : ret.push({ key: a[i], count: 1 })
  }
  ret.sort((a, b) => a.count < b.count ? 1 : b.count < a.count ? -1 : 0)
  return { [ret[0].key]: ret[0].count }
}
// console.log(checkTopString("test"))
// console.log(checkTopString("ADITYAA"))
// console.log(checkTopString("REST"))


function sameWord(a, b) {
  let ret = []
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      a[i] === b[j] && !ret.includes(b[j]) && ret.push(b[j])
    }
  }
  console.log(ret)
  return ret.length
}

// console.log(sameWord("ANNTAB","NZTVAYB"))

const checkBracket = (isString) => {
  let arr = [];
  for (let i = 0; i < isString.length; i++) {
    const ganjil = (i % 2 === 1) && i;
    const genap = (i % 2 === 0) && i;
    if (isString[genap] === '[') {
      arr.push(true)
    }
    else if (isString[genap] === ']') {
      arr.push(false)
    }

    if (isString[ganjil] === ']') {
      arr.push(true)
    }
    else if (isString[ganjil] === '[') {
      arr.push(false)
    }
  }
  return arr
  // return arr.every((value, i, arr) => value === arr[0])
}
console.log(checkBracket(']]')) //DONE

for (let i = 1; i <= 15; i++) {
  var f = i % 3 == 0, b = i % 5 == 0;
  const x = f ? b ? "FizzBuzz" : "Fizz" : b ? "Buzz" : i;
  // console.log(x)
}