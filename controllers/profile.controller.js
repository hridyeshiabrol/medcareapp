var path=require("path");
//Getting Model
var uModel=require(path.join(__dirname,"..","models","profile.form.js"));

var userprofileModel=uModel();

async function createUserWithPic(req,resp)
{
    
        console.log(JSON.stringify(req.body));
        console.log(req.files);
       if(req.files==null)
            req.body.ppic="nopic.jpg";
        else
           { req.body.ppic=req.files.ppic.name;
    
            var fullPath=path.join(__dirname,"..","profilePic",req.body.ppic);
    
            await req.files.ppic.mv(fullPath,(err)=>{
            if(err)
                {
                    console.log(err.message);
                }
                else
                {
                     console.log("File moved...");
                }
          })
        }
    
    //--------------------
        await userprofileModel.create(req.body,(err,result)=>{
            if(err)
            {
                resp.send(err);
                return;
            }
            resp.set("json");
            resp.json({"msg":" Record Inserted with pic...."});
            console.log(result);
        });
}
async function doUpdate(req,resp)
{
   await userprofileModel.update({uid:req.body.uid},{$set:{name:req.body.name,mob:req.body.mob,address:req.body.address,city:req.body.city}}).then(function(result)
    {
        console.log(result);
              if(result.nModified!=0)
                resp.json({msg:"Updated"});
               else
               resp.json({msg:"Invalid id"});
    });
}
function doFetchOne(req,resp)
{
    userprofileModel.find({uid:req.body.uid})
    .then((result)=>{
        console.log(result.length+" Records Found");
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
function doFetchprofile(req,resp)
{
    userprofileModel.find({uid:req.body.uid})
    .then((result)=>{
        console.log(result.length+" Records Found");
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}


module.exports={createUserWithPic,doUpdate,doFetchOne,doFetchprofile}
