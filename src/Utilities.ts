export function getMetadata(arr: string | any[]) {
  function getTotalHeight() {
       let totalHeight = 0;
       for(let x = 0; x < arr.length; x++) {
           totalHeight += parseInt(arr[0].height);
      }
      return totalHeight;
  }

  const total = getTotalHeight();
  const feetAndInches = toFeet(total);

  let meta = {
      "Number of Characters": arr.length,
      "Total height in centimetres": total,
      "Total height in feet and inches": feetAndInches
  }
  return meta;
}

export function toFeet(n: number) {
const cmToInches = (cm: number) => cm / 2.54;

const inchesToFtIn = (inches: number) => {
 let ft = Math.floor(inches / 12);
  let inc = inches % 12;
  return ft + " feet, " + inc.toFixed(2) + " inches"
};

const cmToFtIn = (cm: any) => inchesToFtIn(cmToInches(cm));

return cmToFtIn(n);
}

export function compareObjectsAscending(object1: any, object2: any, key: string) {
const obj1 = object1[key].toUpperCase()
const obj2 = object2[key].toUpperCase()

if (obj1 < obj2) {
return -1
}
if (obj1 > obj2) {
return 1
}
return 0
}

export function compareObjectsDescending(object1: any, object2: any, key: string) {
const obj1 = object1[key].toUpperCase()
const obj2 = object2[key].toUpperCase()

if (obj1 < obj2) {
return 1
}
if (obj1 > obj2) {
return -1
}
return 0
}

