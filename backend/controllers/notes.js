const fs=require('fs');
const path=require('path');


exports.getNotes = ( req,res )=>{
    const filePath = path.resolve(__dirname,'../public/notes/notes.pdf');
    
    fs.readFile(filePath,(err,file)=>{
        if(err){
            console.log(err);
            return res.send('could not getfile');
        }

        res.setHeader('Content-Type','application/pdf');
        res.setHeader('Content-Disposition','attachment;filename="notes.pdf"');
        res.send(file);
    })
}