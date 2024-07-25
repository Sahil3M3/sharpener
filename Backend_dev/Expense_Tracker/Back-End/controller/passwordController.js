const Sib=require('sib-api-v3-sdk') 
const FPR=require('../models/ForgotPasswordRequests');
const sequelize = require('../util/database');
const User=require('../models/user')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
module.exports.forgotPassword = async(req,res)=>{
    const { email } = req.body;
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;
    const t= await sequelize.transaction();
   
    const tranEmailApi = new Sib.TransactionalEmailsApi();
    const sender = {
      email: 'sahil3m3@gmail.com',
      name: 'Sahil'
    };
    const receivers = [{ email }];
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
const forgotRequest={
    id:uuidv4(),
    userId:user.id,
    isactive:"ACTIVE"
}

    const requestf=await FPR.create(forgotRequest,{transaction:t});
    const resetLink=`http://127.0.0.1:5500/Front-End/newpassword.html?token=${requestf.id}`;
      const response = await tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Please reset your password',
        textContent: `
          Expense Tracker password reset
          
          We heard that you lost your Expense Tracker password. Sorry about that!
          
          But don’t worry! You can use the following Link: ${resetLink}
        `
      });
 
   await t.commit();
      return res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
        await t.rollback();
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports.resetPassword=async (req,res,next)=>{
    const token=req.params.id;
    const password=req.body.password;

     const transaction = await sequelize.transaction();

    try {
        // Check if the reset request is valid
        const request = await FPR.findOne({
            where: {
                id: token,
                isActive: true
                
            },
            transaction
        });

        if (!request) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Find the user associated with the reset request
        const user = await User.findByPk(request.userId, { transaction });

        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password and update the user record
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save({ transaction });

        // Deactivate the reset request
        request.isActive = false;
        await request.save({ transaction });

        // Commit the transaction
        await transaction.commit();

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}