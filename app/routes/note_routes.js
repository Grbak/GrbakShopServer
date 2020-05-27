module.exports = function(app, db) {
    app.post('/products', (req, res) => {

        const product = {
            productId: req.body.productId,
            kind: req.body.kind,
            name: req.body.name,
            price: req.body.price,
            brand: req.body.brand,
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
        // console.log('REQ', req.session);
        // req.session.username = 'ZALUPA';
        // console.log(req.session.id);

        console.log(req.query);

        let brands = [];
        if(req.query.brands !== '') {
            brands = req.query.brands.split(',');
        } else {
            brands = ['Fender', 'Ibanez'];
        };

        let defineSortParameter = () => {
            switch(req.query.sortParameter) {
                case 'views':
                    return {views: Number(req.query.sortDirection)};
                case 'price':
                    return {price: Number(req.query.sortDirection)};
            };
        };


        let sortParameter = req.query.sortParameter;

        db.collection('Products').find({ brand: { $in: brands } }).sort( defineSortParameter() ).toArray((err, products) => {
            
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
            // console.log('RES', res.session);
            res.send({products: currentProducts, 
                    productsCount: products.length,
            });
        }); 
    });

    app.post('/comments', (req, res) => {
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

    app.get('/brands', (req, res) => {
        db.collection('Brands').find().toArray((err, brands) => {
            let brandsNames = brands.map(b => b.name);
            res.send({brandsNames});
        });
    });

    app.post('/login', (req, res) => {
        let foundUser = {
            id: undefined,
            login: undefined,
        };
        for(let i = 0; i < users.length; i++) {
            let u = users[i];
            if(u.login == req.body.login && u.password == req.body.password) {
                foundUser.login = u.login;
                foundUser.id = u.id;
                console.log(foundUser)
                break;
            }
        }

        if(foundUser.login !== undefined) {
            req.session.user = foundUser;
            console.log('Login succeeded: ' + req.session.user.login);
            res.send(req.session.user);
        } else {
            console.log('Login failed: ' + req.body.login);
            res.send('Login failed: ' + req.body.login);
        }
    });
};


let users = [
    {id: 1,
    login: 'grbak',
    password: '1111',},

    {id: 2,
    login: 'moalim163',
    password: 'ura',},

    {id: 3,
    login: 'jakub',
    password: 'ultraq',},
];
