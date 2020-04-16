module.exports = function(app, db) {
    app.post('/p', (req, res) => {

        const product = {
            productId: req.body.productId,
            name: req.body.name,
            price: req.body.price,
            color: req.body.color,
            country: req.body.country,
            conf: req.body.conf,
            type: req.body.type,
            orientation: req.body.orientation,
            bodyMaterial: req.body.bodyMaterial,
            neckMaterial: req.body.neckMaterial,
            neckConstruction: req.body.neckConstruction,
            stringsNumber: req.body.stringsNumber,
            fretsNumber: req.body.fretsNumber,
            fingerboard: req.body.fingerboard,
            photo: req.body.photo,
            availabiblity: req.body.availability,
            comments: [],
            description: req.body.description,
        }

        db.collection('Products').insertOne(product, (err, result) => {
            if (err) { 
                res.send({ 'error': 'An error has occurred' }); 
            } else {
                res.send('Product was successfully added!');
            }
        });
    });

    app.get('/products', (req, res) => {
        db.collection('Products').find().toArray((err, products) => {
            
            let pagesCount = Math.ceil(products.length / req.query.count);

            let currentProducts = [];

            for(let i = 1; i <= pagesCount; i++) {
                if(i == req.query.page) {
                    for(let j = 1; j <= req.query.count; j++) {
                        if(products[ (i - 1) * req.query.count + j - 1] !== undefined) {
                            currentProducts.push(products[ (i - 1) * req.query.count + j - 1]);
                        }
                    }
                }
            }
            res.send({products: currentProducts, 
                    productsCount: products.length,
            });
        });
    });

    app.post('/products', (req, res) => {
        console.log(req.body);
        db.collection('Products').updateOne({productId: req.body.productId}, 
            {$push: 
                {comments: 
                    {text: req.body.text, 
                     time: [Number(req.body.year), 
                            Number(req.body.month), 
                            Number(req.body.day),]
                    }
                }
            });
        res.send({isSuccessfull: true});
    });
};