const {Router} = require("express");
const User = require("../models/user");
const router = Router();


router.get('/signin',(req,res)=>{
    res.render("signin");
});
router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error("Error rendering signup page:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/signin", async (req,res)=>{
    const { email,password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        // console.log("token",token);// console.log("user logged in succesfully");
        return res.cookie('token',token).redirect("/user/dashboard");
        
    } catch (error) {
        return res.render('signin',{
            error:'Incorrect Email or Password',
        });
    }
});
router.post('/signup', async (req,res)=>{
    // console.log(req.body);
    const {firstName,lastName,email,Phone,password,address,pincode,role,profileImageURL,familyMembers,occupation}  = req.body;
    await User.create({
        firstName,
        lastName,
        email,
        password,
        address,
        Phone,
        pincode,
        role,
        profileImageURL,
        familyMembers,
        occupation
    });
    return res.redirect("/user/signin");
});

router.get('/dashboard', (req, res) => {
    if (!req.user) {
      return res.redirect("/user/signin"); // Redirect to login if user is not authenticated
    }
    res.render("dashboard", { user: req.user });
  });
  
module.exports = router;