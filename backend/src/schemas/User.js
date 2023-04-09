const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt'),
                SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            required: true,
            // All usernames must be unique
            index: { unique: true }

            // TODO: Add validator
        },
        password: {
            type: String,
            required: true
            // TODO: Add validator
        },
        locations: [String]
    },
    {
        collection: "Users"
    }
);

userSchema.pre('save', async function(next)
{
    if (!this.isModified('password')) return next();
    try 
    {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);

        return next();
    } catch (err) 
    {
        return next(err);
    }
});

module.exports = mongoose.model("User", userSchema);