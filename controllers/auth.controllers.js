const hashPassword = require('../utils/hashPassword');
const response = require('../utils/response');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    register: async (req, res, next) => {
        try {
            const { first_name, last_name, email, password} = req.body;
            const hashedPassword = await hashPassword(password);
        
            if(!first_name || !last_name || !email || !password){
                return res.status(400).json(response('error', 'All fields are required'));
            }

            const exist = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(exist){
                return res.status(400).json(response('error', 'Email already exist!'));
            }

            const account = await prisma.user.create({
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword
                }
            })

            res.status(201).json({
                status: 'success',
                message: `Successfully register for ${account.email}`,
            });
            

        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    currentUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);

            const exist = await prisma.user.findUnique({
                where: {
                    id
                }
            })

            if(!exist) {
                res.status(404).json(response('error', 'Account not found!'));
            }


            const account = await prisma.user.findUnique({
                where: {
                    id
                }
            })



            return res.status(200).json({
                status: 'success',
                data: {
                    id: account.id,
                    name: account.first_name + " " + account.last_name,
                    email: account.email,
                    address: account.address,
                    occupation: account.occupation,
                    avatar_url: account.avatar_url
                }
            });
        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    }
};