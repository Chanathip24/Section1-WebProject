
const promptPay = require('promptpay-qr')
const qrcode = require('qrcode')
exports.createPromptpay = async (req,res)=>{

    try {
        const { id,amount }= req.body
        if(!id) return res.status(500).json({data : "Please provide your phone number"})

        const paymentAmount = amount || 0
        const payload = promptPay(id,{amount : paymentAmount})

        //to base64
        const data = await qrcode.toDataURL(payload)
        res.json({data : data , msg : "Create qr code success"})
    } catch (error) {
        res.status(500).json({error : error , msg: "Create qr code failed"})
    }

}