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
    const user = User.matchPassword(email,password);

    console.log("User",user);
    return res.redirect("/user/dashboard");
});

router.post("/signup",async(req,res)=>{
    console.log(req.body);
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
    return res.redirect("/user/dashboard");
});

router.get('/dashboard',(req,res)=>{
    res.render("dashboard")
})
module.exports = router;