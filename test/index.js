const mnmNodeUtils = require("../index");

(async function(){



    await mnmNodeUtils.slowDown(10000);

    console.log("it's done");

}())