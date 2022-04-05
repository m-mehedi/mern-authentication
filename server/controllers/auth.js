const User = require('../models/user');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.signup = (req, res) => {
//     // console.log('REQ BODY ON SIGNUP',req.body);
//     //     res.json({
//     //         data: 'You hit signup endpoint from Controller'
//     //     });
//     const {name, email, password } = req.body

//     User.findOne({email}).exec((err, user) => {
//         if(user){
//             return res.status(400).json({
//                 error: 'Email is taken.'
//             })
//         }
//     })

//     let newUser = new User({name, email, password})

//     newUser.save((err, success) =>{
//         if(err){
//             console.log('SIGNUP ERROR', err)
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json({
//             message: 'Signup success! Please signin'
//         });
//     })
// }

exports.signup = (req, res) =>{
    const {name, email, password} = req.body

    User.findOne({email}).exec((err, user) => {
        if(user){
            return res.status(400).json({
                error: 'Email is taken.'
            })
        }

        const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn:'30m'});
        console.log(token);
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: `Account activation link`,
            html: `
                <h2>Please use the link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/auth/activate</p>
                <hr/>
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }

        sgMail.send(emailData).then(sent=>{
            console.log('SIGNUP EMAIL SENT',sent);
            return res.json({
                message: `Email has been sent to ${process.env.EMAIL_TO}. Follow the instruction to activate your account.`
            });
        })
        .catch(err=>{
            console.log('SIGNUP EMAIL SENT ERROR', err);
            return res.json({
                message: err.message
            })
        })
    });
};

exports.accountValidation=(req, res)=>{
    const {token} = req.body
    // console.log(req.body);

    if(token){
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded){
            if(err){
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                })
            }
            const {name, email, password} = jwt.decode(token)
            console.log(token);

            const user = new User({name, email, password});
            user.save((err, user) => {
                if(err){
                    console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR',err)
                    return res.status(401).json({
                        error: 'Error saving user in database. Try signup again'
                    })
                }
                return res.json({
                    message: 'Signup success. Please signin.'
                })
            });
        })
    } else {
        return res.json({
            message: 'Something went wrong. Please, try again.'
        })
    }
}

exports.signin=(req, res) => {
    const {name, email, password} = req.body
    //check if user exists
    User.findOne({email}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'User doesn\'t exist'
            })
        }
        //authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email and password do not match'
            })

        }
        // generate token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        const {_id, name, email, role} = user

        return res.json({
            token,
            user: {_id, name, email, role}
        });
        
    })
}