const connection = require('../../database/connection')

module.exports = {
    async index(req, res){
        try{
            let table = await connection('products').select([
                'id',
                'name',
                'type',
                'price',
                'sizes',
                'description',
                'images',
                'amount',
                'visible'
            ])
            const products = []
            table.forEach( e => {
                if(e.visible){
                    products.push({
                        id: e.id, 
                        name: e.name,
                        type: e.type,
                        price: e.price,
                        sizes: e.sizes,
                        description: e.description,
                        images: e.images,
                        amount: e.amount,
                    })
                }
            })
            return res.json(products)
        }
        catch(err){
            res.json({
                status: 'could not select in database',
                err
            })
        }
        
    },
    async create(req, res){
        //const admin_id = req.headers.authorization;
        const {name, type, price, sizes, description, images, amount} = req.body
        try{
            await connection('products').insert({
                name,
                type,
                price,
                sizes,
                description,
                images,
                amount
            })
            return res.status(201).send()
        }
        catch(err){
            return res.json({
                status: 'could not create instance in database',
                err
            })
        }
    },
    async delete(req, res){
        //const admin_id = req.headers.authorization;
        const id = req.params.prod_id
        try{ 
            const [validation] = await connection('products').select(['visible']).where('id', id)
            if(validation.visible){
                await connection('products').update({visible: false}).where('id', id)
            }
            return res.status(204).send()
        }
        catch(err){
            return res.json({
                status: 'could not delete instance in database',
                err
            })
        }
    },
    async update(req, res){
        //const admin_id = req.headers.authorization;
        const id = req.params.prod_id
        const {name, type, price, sizes, description, images, amount} = req.body
        try {
            const [products] = await connection('products').returning([
                    'id',
                    'name',
                    'type',
                    'price',
                    'sizes',
                    'description',
                    'images',
                    'amount'
                ]).where('id', id).update({
                name,
                type,
                price,
                sizes,
                description,
                images,
                amount
            })
            return res.json(products)
        }
        catch(err){
            res.json({
                status: 'could not update instance in database',
                err
            })
        }
    },
}