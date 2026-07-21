const geoTzMethods = require("./get-geo-tz");



function filterObjectsByMethodName(postMiddleWare, ...middleWares)  {

    let middleWaresArr = Array.from(middleWares);
    
    return function(callbackName)   {
        let callback =  middleWaresArr.filter(obj => {
            return Object.keys(obj).find(key => key === callbackName);
        }).map(item => item[callbackName]);

        return [...callback, postMiddleWare];
    }
    
}

function dynamicRequire(filePath)   {
    let module = require(filePath);
    delete require.cache[filePath];
    return module;
}

async function slowDown(timeDelay = 7747)   {
    await new Promise(resolve => setTimeout(resolve, timeDelay));
}


function getAllCombination(arr, separator = ", "){

    let allCombination = [],
        takenCombination = [],
        i = 0;

    allCombination.push(arr);
    

    while(i < arr.length){

        let slicedArr = [...arr],
            currentNum = slicedArr[i];
        

        // remove 1 as we go    
        for(let j = 0; j < slicedArr.length; j++)   {

            let newClone = [...slicedArr];

            newClone.splice(j, 1);
            
            if(!takenCombination.includes(newClone.join(separator)))   {
                allCombination.push(newClone);
                takenCombination.push(newClone.join(separator));
            }

        }

        // removing the current number
        slicedArr.splice(i, 1);

        let k = 0;

        while(k < slicedArr.length) {

            // removing 1 of the slicedArr;
            slicedArr.splice(k, 1);

            if(!takenCombination.includes([currentNum, ...slicedArr].join(separator)))   {
                allCombination.push([currentNum, ...slicedArr]);
                takenCombination.push([currentNum, ...slicedArr].join(separator));
            }
            
        }

        i++;
    }


    i = arr.length - 1;

    while(i > 1)    {

        let slicedArr = [...arr],
            currentNum = slicedArr[i];

        // remove 1 as we go    
        for(let j = 0; j < slicedArr.length; j++)   {

            let newClone = [...slicedArr];

            newClone.splice(j, 1);
            
            if(!takenCombination.includes(newClone.join(separator)))   {
                allCombination.push(newClone);
                takenCombination.push(newClone.join(separator));
            }

        }

        // removing the current number
        slicedArr.splice(i, 1);

        let k = 0;

        while(k < slicedArr.length) {

            // removing 1 of the slicedArr;
            slicedArr.splice(k, 1);

            if(!takenCombination.includes([currentNum, ...slicedArr].join(separator)))   {
                allCombination.push([currentNum, ...slicedArr]);
                takenCombination.push([currentNum, ...slicedArr].join(separator));
            }
            
        }

        i--;
    }


    allCombination = allCombination.sort((a, b) => {
        return a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0;
    }).sort((a, b) => {
        return a.length < b.length ? 1 : a.length > b.length ? -1 : 0;
    });


    return allCombination;
    
}

function rgb2hex(rgb) {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function pxToPt(px) {
    // 1 px = 0.75 pt (approx.)
    return px * 0.75;
}

function encodeURILowerCasedSpecialChars(str) {
    // Encode normally
    let encoded = encodeURIComponent(str);

    // Force lowercase for specific escape sequences
    return encoded
        .replace(/%2F/gi, '%2f')
        .replace(/%3F/gi, '%3f')
        .replace(/%3D/gi, '%3d');
}


module.exports = { 
    filterObjectsByMethodName, 
    dynamicRequire, 
    slowDown, 
    getAllCombination, 
    rgb2hex, 
    pxToPt,
    encodeURILowerCasedSpecialChars,
    ...geoTzMethods,
}