const user=require('../models/user');
const order=require('../models/order');
const Razorpay=require('razorpay')


module.exports.premiummembership = (req, res, next) => {
    const userId = req.user.id;

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    var rzp = new Razorpay({
        key_id: key_id,
        key_secret: key_secret
    });

    const amount = 100; // Amount in paise (1 INR = 100 paise)

    rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
        if (err) {
            console.error("Razorpay order creation failed:", err);
            return res.status(500).json({ message: 'Order creation failed', error: JSON.stringify(err) });
        }

        req.user.createOrder({ orderId: order.id, status: 'PENDING' })
            .then(r => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            })
            .catch(err => {
                console.error("Database entry failed:", err);
                return res.status(500).json({ message: 'Database entry failed', error: err.message });
            });
    });
};

module.exports.updateMembership=(req,res,next)=>{
    const userId = req.user.id;

const orderId=req.body.orderId;
const msg=req.body.msg;
     if(msg==='cancel' || msg==='failed')
     {

        
            order.findOne({where:{orderId:orderId}})
            .then(o=>{
                o.status="FAILED";
              
                o.save().then().catch(e=>console.log(e));
            })
            .catch(e=>console.log(e))
     }
     else
{
    const paymentId=req.body.paymentId;
    user.findByPk(userId)
.then(u=> u)
.then(u=>{
    u.ispremium=true;
    u.save().then().catch(e=>console.log(e))
    order.findOne({where:{orderId:orderId}})
    .then(o=>{
        o.status="COMPLETED";
        o.paymentId=paymentId;
        o.save().then(ree=>{
res.status(203).json({msg:"updated"})
        }).catch(e=>console.log(e));
    })

})
.catch(e=>console.log(e))
}
}

module.exports.checkPremium=(req,res,next)=>{

    const { id, ispremium } = req.user;

    if (ispremium) {
      return res.status(200).json({ check: true });
    } else {
      return res.status(403).json({ check: false });
    }
  

}