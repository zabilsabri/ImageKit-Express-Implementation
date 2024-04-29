const response = require('../utils/response');
const imageKit = require('../utils/imageKit');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    editProfile: async (req, res, next) => {
        try {
            
            const { first_name, last_name, email, address, occupation } = req.body;
            const id = parseInt(req.params.id);

            const exist = prisma.user.findUnique({
                where: {
                    id
                }
            });

            if(!exist){
                res.status(404).json(response('error', 'Account not found!'));
            };

            const account = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    address: address,
                    occupation: occupation
                }
            });

            res.status(201).json({
                status: 'success',
                message: `Successfully update for ${account.email}`,
            });

        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    },

    editImage: async(req, res, next) => {
        try {
            
            let strFile = req.file.buffer.toString('base64');
            let id = parseInt(req.params.id);

            const exist = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            if(!exist){
                res.status(404).json(response('error', 'Account not found!'));
            }

            let { url } = await imageKit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });

            const account = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    avatar_url: url
                }
            })

            res.status(201).json({
                status: 'success',
                message: `Successfully update for id ${account.id}`,
            });

        } catch (error) {
            res.status(400).json(response('error', error.message));
        }
    }
};