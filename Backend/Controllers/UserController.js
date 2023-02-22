const FirstData = async (req, res) => {
    try {
    } catch (error) {
      console.log(`Error in alldata : ${error.message}`);
      res.send(`Error in alldata : ${error.message}`);
    }
}


// ============= Register Section =============

const Register = async (req, res) => {
    try {
      const { Name, EmailId, Password, ContactNumber, Role, UserId } = req.body;
  
      const datas = await UserModel.find({ EmailId });
  
      if (datas.length == 0) {
        bcrypt.hash(Password, 5, async (err, hash) => {
          if (err) res.status(401).send("Contact to Administrator");
          else {
            const data = new UserModel({
              Name,
              EmailId,
              Password: hash,
              ContactNumber,
              Role,
              UserId,
            });
            await data.save();
  
            // Generating Otp
            var OtpFunc = generateOtp();
            Sendmail(OtpFunc, EmailId);
            otpdata = OtpFunc;
  
            res.status(200).send({ Message: "Sign Up Successfully" });
          }
        });
      } else {
        res.status(401).send({
          Message: "User Already Registered",
        });
      }
    } catch (error) {
      console.log(`Error in register : ${error.message}`);
      res.send(`Error in register : ${error.message}`);
    }
}

// ============= Login Section =============

const Login = async (req, res) => {
    try {
      const { EmailId, Password, Otp } = req.body;
      const UserData = await UserModel.findOne({ EmailId });
  
      if (!UserData) {
        res.send("User not found");
      }
  
      //================= Changing Hashed Password to Normal Password =================
      const HashedPassword = UserData?.Password;
  
      bcrypt.compare(Password, HashedPassword, async (err, result) => {
        if (err) res.status(401).send("Contact to Administrator");
        else {
            // ================= OTP Verify =================
  
          if (otpdata == Otp) {
            console.log(Otp);
  
  
            // ================= Generating Token Here =================
  
            const Normal_Token = jwt.sign(
              { UserId: UserData._id, UserRole: UserData.Role },
              process.env.NORMAL_KEY,
              { expiresIn: "7d" }
            );
            const Refresh_Token = jwt.sign(
              { UserId: UserData._id, UserRole: UserData.Role },
              process.env.REFRESH_KEY,
              { expiresIn: "28d" }
            );
  
            // ================= Set Token in Cookie =================
  
            res.cookie("NormalToken", Normal_Token, { httpOnly: true });
            res.cookie("RefreshToken", Refresh_Token, { httpOnly: true });
  
  
            // ================= Set Token in Redis =================
            const RedisUser = UserData.EmailId;
            
            await client.SET(RedisUser,Normal_Token,{
              EX:120
            })      
  
            res.status(200).send({ Message: "Login Successfully" });
  
          } else {
            res.status(401).send({ Message: "Invalid OTP" });
          }
        }
      });
    } catch (error) {
      console.log(`Error in login : ${error.message}`);
      res.send(`Error in login : ${error.message}`);
    }
}

// ============= Logout Section =============

const LogOut = async (req, res)=>{
    const Normaltoken = req.cookies.NormalToken || ""

    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))

    blacklisteddata.push(Normaltoken);

    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisteddata))

    res.status(200).send("Log Out Successfully");
}

module.exports = { FirstData , Register , Login , LogOut }