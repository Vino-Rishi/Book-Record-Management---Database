const {UserModel,BookModel} = require('../modals/index');

exports.getAllUsers = async(req,res)=>{
    const users = await UserModel.find()
    if(users.length === 0){
        return res.status(404).json({
            success:false,
            message:"No Users Found"
        });
    }
    return res.status(200).json({
        success:true,
        data:users
    })
};
