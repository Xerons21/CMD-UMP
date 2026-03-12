const fs = require("fs");
const fetch = require("node-fetch");

async function run(){

const url="https://www.linkedin.com/company/cmd-ump/posts/";

const res = await fetch(url,{
headers:{
"User-Agent":"Mozilla/5.0"
}
});

const html = await res.text();

const posts=[];

const regex=/https:\/\/www\.linkedin\.com\/posts\/[^"]+/g;

let match;

while((match=regex.exec(html))!==null){

posts.push({
link:match[0]
});

}

fs.writeFileSync("linkedin.json",JSON.stringify(posts,null,2));

}

run();