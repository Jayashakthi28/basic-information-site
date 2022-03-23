const http=require("http");
const fs=require("fs");
const path=require("path");
const { env } = require("process");

const server=http.createServer((req,res)=>{
    let filePath=path.join(__dirname,"src/");
    let extName=path.extname(req.url);
    if(extName===".css"){
        filePath=path.join(filePath,req.url);
    }
    else{
        switch (req.url) {
            case "/":
                res.statusCode=200;
                filePath=path.join(filePath,"index.html");
                break;
            case "/about":
                res.statusCode=200;
                filePath=path.join(filePath,"about.html");
                break;
            default:
                res.statusCode=404;
                filePath=path.join(filePath,"404.html");
                break;
        }
    }
    fs.readFile(filePath, (err, data) => {
        if(err){
            res.end("<h1>Error Data</h1>")
        }
        res.end(data);
    })
})
const PORT=env.PORT||3000;
server.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);
});