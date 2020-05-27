
const express = require('express');
const logger = require('log4js').getLogger();
const bodyParser = require('body-parser');
const db = require('./config/db');
const MongoClient = require('mongodb').MongoClient;
// const io = require('socket.io')(server);
// const http = require('http');
//const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
 

const app = express();
// const server = http.Server(app);

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

MongoClient.connect(db.url, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(client => {
    const db = client.db(); 
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
})
.catch(err => console.log(err));

app.use(session({
    secret: 'foo',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: db.url,
        ttl: 1 * 24 * 60 * 60,
    }),
}));




let products = [
    {   productId: 1, 
        name: 'Fender Player Stratocaster Fender Plus Top ACB MN', 
        price: 1099, 
        color: 'красный', 
        country:'США', 
        conf: 'SSS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя',
        bodyMaterial: 'ольха', 
        neckMaterial: 'клён',
        neckConstruction: 'на болтах', 
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'клён',
        photo: 'https://www.guitarrasybaterias.com/media/catalog/product/cache/1/image/363x/040ec09b1e35df139433887a97daa66f/0/1/0144552531_gtr_frt_001_rr_1.png', 
        availability: 1, 
        comments: [], 
        description: 'Fender Player Stratocaster Fender Plus Top – электрогитара с узнаваемым звуком классического стратокастера: звонкие высокие частоты, резкая, четкая середина, мощные насыщенные низкие частоты, в сочетании с великолепной артикуляцией. Эта гитара отличается гибкостью в настройках, она отлично проявит себя в любом музыкальном направлении и позволит создать свой собственный уникальный звук. Корпус модели выполнен из ольхи с глянцевым покрытием. Эффектный внешний вид инструменту придает топ из огненного клена, фактуру которого подчеркивает элегантный цвет «состаренный вишневый бёрст». За четкий, отлично артикулированный звук отвечают три современных сингла «Player Series Stratocaster». Характерная черта инструмента, отличающая его от классических Стратов и дающая больше гибкости – для звукоснимателя у бриджа предусмотрен отдельный регулятор тембра.',},

    {   productId: 2,
         name: 'Fender Player Stratocaster', 
        price: 599, 
        color: 'белый', 
        country:'Мексика', 
        conf: 'HSS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя',
        bodyMaterial: 'ольха', 
        neckMaterial: 'клён',
        neckConstruction: 'на болтах',  
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'отсутствует',
        photo: 'https://cdn.webshopapp.com/shops/214622/files/284563530/image.jpg', 
        availability: 6, 
        comments: [], 
        description: 'Вдохновляющее звучание Stratocaster является одной из основ Fender. Обладающая классическим звуком, а именно колоколообразными верхами, панчевым средним диапазоном и мощными басами в сочетании с кристально чистой артикуляцией, электрогитара Fender Player Stratocaster наполнена аутентичным ощущением и стилем Fender. Инструмент готов служить вашему музыкальному видению.',},

    {   productId: 3, 
        name: 'Fender Classic Player Baja Telecaster', 
        price: 799, 
        color: 'древесный', 
        country:'США',
        conf: 'SS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя',
        bodyMaterial: 'ясень',
        neckMaterial: 'клён', 
        neckConstruction: 'на болтах',
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'клён',
        photo: 'https://images.squarespace-cdn.com/content/v1/55873fffe4b0e842044c4c9a/1511384217165-3UYL50YJPF2MKDFEZCK6/ke17ZwdGBToddI8pDm48kJO6xy8wDQkaz2MIP3siPCQUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2c46FJLhiTTH3_jCoYXbHcTG_DlxqfH_M4s5wMQj4_XwKMshLAGzx4R3EDFOm1kBS/Fender+Classic+Player+Baja+Telecaster+FRONT.png', 
        availability: 9, 
        comments: [],   
        description: '',},

    {   productId: 4, 
        name: 'Fender Player Left Handed Telecaster', 
        price: 919, 
        color: 'черный',
        country:'США', 
        conf:'SS', 
        type: 'цельнокорпусная',
        orientation:' левосторонняя',
        bodyMaterial: 'ольха',
        neckMaterial: 'клён',
        neckConstruction: 'на болтах', 
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'клён',
        photo: 'https://www.musoscorner.com.au/media/catalog/product/0/1/0145222506_gtr_frt_001_rl.png', 
        availability: 2,
        comments: [],  
        description: '',},

    {   productId: 5, name: 'Fender Vintera 50s Telecaster', 
        price: 899, 
        color: 'красный', 
        country:'США', 
        conf: 'SS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя', 
        bodyMaterial: 'ольха',
        neckMaterial: 'клён',
        neckConstruction: 'на болтах', 
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'клён',
        photo: 'https://www.swingcitymusic.com/wp-content/uploads/2019/09/0149852340_gtr_frt_001_rr.png', 
        availability: 13,
        comments: [],  
        description: 'Fender Vintera 50s Telecaster - электрогитара в винтажном стиле, созданная для музыкантов, которые ценят обаяние прошлого в сочетании с современными характеристиками. Представленная в 2019 году модификация Vintera сочетает в себе традиционный внешний вид с такими современными чертами как профиль грифа «Thick Soft V» и накладка из клена радиуса 9,5 дюймов, улучшенными звукоснимателями и электроникой. Корпус выполнен из традиционного для гитар Fender материала - ольхи, которая позволяет получить отлично сбалансированный по частотным характеристикам звук. За звучание инструмента отвечают два сингла Custom Shop с мощным, четким, отлично артикулированным звуком: Vintage-Style Tele у бриджа и "Twisted" Tele у грифа. Дополнительную гибкость в настройке обеспечивает переключатель S-1. В комплекте поставляется фирменный мягкий чехол.',},

    {   productId: 6, name: 'Fender Squier Affinity Stratocaster Surf Green', 
        price: 199, 
        color: 'зеленый', 
        country:'США', 
        conf: 'SSS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя',
        bodyMaterial: 'ольха', 
        neckMaterial: 'клён',
        neckConstruction: 'на болтах',  
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'терминалия',
        photo: 'https://images.squarespace-cdn.com/content/v1/55873fffe4b0e842044c4c9a/1513135287578-2DZDTHHWXSBNOTYD4UNY/ke17ZwdGBToddI8pDm48kFq-5U1G4ycqfjHitUPuTvoUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2N30YpliarI2Ls62HzKmeQ8kpxrTH6M4X-G_zkZGSRnAKMshLAGzx4R3EDFOm1kBS/Squier+Affinity+Strat+Surf+Green+Front.png', 
        availability: 17, 
        comments: [],  
        description: 'Fender Squier Affinity Stratocaster Surf Green – стратокастер из линейки Affinity Series. Гитара обладает прекрасным звуком, стильным узнаваемым внешним видом, удобна при игре и представляет собой отличное сочетание цены и качества. Корпус гитары выполнен из ольхи с полиуретановым покрытием. Гриф – кленовый, профиля «С», также с полиуретановой отделкой. Мензура – 25,5’’, на грифе 21 лад Medium Jumbo. Накладка на гриф представленной модели - из терминалии с инкрустацией перламутровыми точками. За звук отвечают три сингла Standard Single-Coil Strat. Настройка звука осуществляется пятипозиционным переключателем звукоснимателей, двумя регуляторами тембра и одним регулятором громкости. Тремоло Vintage-Style предоставляет широкие возможности для импровизации. Модель доступна в нескольких эффектных вариантах цветового исполнения. Представленная гитара – эффектного цвета морской волны с контрастным однослойным белым пикгардом и блестящей хромированной фурнитурой.',},
        
    {   productId: 7, 
        name: 'Fender American Performer Stratocaster', 
        price: 2149, 
        color: 'коричневый', 
        country:'США', 
        conf: 'SSS', 
        type: 'цельнокорпусная',
        orientation:' правосторонняя', 
        bodyMaterial: 'ольха',
        neckMaterial: 'клён',
        neckConstruction: 'на болтах',   
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'клён',
        photo: 'https://i.ibb.co/72rvww6/7.png', 
        availability: 6, 
        comments: [], 
        description: 'Fender American Performer Stratocaster – новая модель, созданная в Короне, Калифорния. Это гитара с потрясающим звуком, дающая ощущения при игре, которые ожидаешь получить от настоящего, аутентичного Фендера. В то же время это современный инструмент с улучшениями и дополнениями, делающими его еще более привлекательным. Звукосниматели - три сингла Yosemite - собираются вручную в Калифорнии, настраиваются с учетом особенностей каждого инструмента и позволяют добиться максимальной гибкости в настройках звучания. Для звукоснимателя у грифа предусмотрен регулятор с потенциометром push-pull, делающий удобной регулировку звука в процессе исполнения. Отличительные черты инструмента – колки ClassicGear 18:1 в винтажном стиле и серебристый логотип в стиле семидесятых. Модель представлена в элегантном медном цвете.',},

    {   productId: 8, 
        name: 'Fender Vintera 50s Stratocaster', 
        price: 1199, 
        color: 'зелёный', 
        country:'США', 
        conf: 'SSS', 
        type: 'цельнокорпусная',
        orientation:'правосторонняя',
        bodyMaterial: 'ольха', 
        neckMaterial: 'клён',
        neckConstruction: 'на болтах',   
        stringsNumber: 6, 
        fretsNumber: 21,
        fingerboard: 'отсутствует',
        photo: 'https://i.ibb.co/56ysryq/10.png', 
        availability: 4, 
        comments: [], 
        description: 'Fender Vintera 50s Stratocaster - электрогитара в винтажном стиле, созданная для музыкантов, которые хотят получить звук и стиль золотой эры Fender. Представленная в 2019 году модификация Vintera обладает характерными чертами гитар пятидесятых годов, в том числе аутентичным профилем грифа Soft V с накладкой из клена радиусом 7,25", исторически правильной фурнитурой и звукоснимателями. Корпус выполнен из традиционного для гитар Fender материала - ольхи, которая позволяет получить отлично сбалансированный по частотным характеристикам звук. За аутентичное звучание инструмента отвечают три сингла Vintage-Style 50s Strat с пятипозиционным переключателем. Они позволяют воспроизвести кристально чистый, звонкий, четкий и отлично артикулированный звук классических моделей пятидесятых, сделавший гитары Fender легендой. Гитара выпускается в трех вариантах цветового исполнения. Представленная модель элегантного бирюзово-салатового цвета с глянцевым покрытием, однослойным белым пикгардом, регуляторами состаренного белого цвета, фурнитурой хром/никель. В комплекте фирменный мягкий чехол.',},

    {   productId: 9, 
        name: 'Ibanez Artcore AM53', 
        price: 389, 
        color: 'коричневый', 
        country:'США', 
        conf: 'HH', 
        type: 'полуакустическая',
        orientation:' правосторонняя', 
        bodyMaterial: 'сапеле',
        neckMaterial: 'красное дерево',
        neckConstruction: 'вклеенный',   
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'палисандр',
        photo: 'https://i.pinimg.com/originals/7e/6e/76/7e6e761f6db252bb066057150781765d.png', 
        availability: 6, 
        comments: [], 
        description: 'Ibanez AM53 - шестиструнная электрогитара с полым корпусом от знаменитого японского производителя. Это инструмент из линейки Artcore, представленной в 2002 году и ставшей чрезвычайно популярной благодаря высокому качеству материалов и сборки в сочетании с демократичной ценой. Ibanez AM53 отличается прекрасным звуком с великолепным сустейном, надежностью строя и удобством при игре. Модель универсальна и будет прекрасно звучать в разных направлениях музыки, от блюза и джаза до кантри или рока. Корпус гитары полностью выполнен из древесины сапеле. Гриф Artcore AM – из красного дерева. Накладка – палисандровая с инкрустацией ладов белыми точками. Фиксированный бридж ART-ST позволяет оптимально передать вибрацию струн и отлично держит строй. Звукосниматели – два пассивных хамбакера Infinity R с керамическими магнитами – выдают тёплый звук с прекрасно сбалансированной артикуляцией, подходящий для широкого спектра музыкальных стилей. Переключатель звукоснимателей - трехпозиционный. Для настройки звука предусмотрены регуляторы громкости и тембра.'},

    {   productId: 10, name: 'Ibanez Artcore AS73', 
        price: 549, 
        color: 'коричневый', 
        country:'США', 
        conf: 'HH', 
        type: 'полуакустическая',
        orientation:' правосторонняя',
        bodyMaterial: '', 
        neckMaterial: 'ньятон',
        neckConstruction: 'на болтах',   
        stringsNumber: 6, 
        fretsNumber: 22,
        fingerboard: 'палисандр',
        photo: 'https://cdn2.bigcommerce.com/n-zfvgw8/6yzvyy2b/products/14221/images/62956/AS73TBC__18858.1399222635.500.750.png?c=2', 
        availability: 4, 
        comments: [
                {text: 'Красивая гитара', time: [2017, 10, 5]}, 
                {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
                {text: 'теплый ламповый звук...', time: [2020, 3, 21]}], 
        description: 'Вдохновляющее звучание Stratocaster является одной из основ Fender. Обладающая классическим звуком, а именно колоколообразными верхами, панчевым средним диапазоном и мощными басами в сочетании с кристально чистой артикуляцией, электрогитара FENDER PLAYER STRATOCASTER HSS PLUS TOP MN ACB наполнена аутентичным ощущением и стилем Fender. Инструмент готов служить вашему музыкальному видению. Он достаточно универсален, чтобы справиться с любым музыкальным',},
        
    {   productId: 11, name: 'B.C.Rich IB1OBK', 
        price: 249, 
        color: 'черный', 
        country:'Индонезия', 
        conf: 'HH', 
        type: 'электрическая',
        orientation:'правосторонняя',
        bodyMaterial: '', 
        neckMaterial: 'клён', 
        neckConstruction: 'на болтах',  
        stringsNumber: 6, 
        fretsNumber: 24,
        fingerboard: 'палисандр',
        photo: 'https://i.ibb.co/0QSNQQf/11.png', 
        availability: 4, 
        comments: [
                {text: 'Красивая гитара', time: [2017, 10, 5]}, 
                {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
                {text: 'теплый ламповый звук...', time: [2020, 3, 21]}], 
        description: 'B.C.Rich IB1OBK - один из лучших инструментов для начинающего гитариста. Компания, разработавшая модель B.C.Rich IB1OBK, позиционирует эту гитару как инструмент, максимально подходящий для обучения игре. Для упрощения знакомства с инструментом, оборудованным звукоснимателем, конструкция предусматривает: максимально эргономичную форму грифа, упрощающую контроль за движениями пальцев и выработку верной аппликатуры в левой руке; удачное позиционирование звукоснимателей, допускающих звукоизвлечение с опорой на них; облегчение корпуса с сохранением точки равновесия между грифом и декой, что позволит вам самостоятельно подобрать наиболее комфортное положения для электрогитары во время репетиций и живых выступлений; богатые возможности эквализации звука.',},
        
    {   productId: 12, name: 'B.C.Rich ASOBO Avenge SOB Onyx', 
        price: 319, 
        color: 'черный', 
        country:'Индонезия', 
        conf: 'H', 
        type: 'электрическая',
        orientation:'правосторонняя',
        bodyMaterial: '', 
        neckMaterial: 'клён', 
        neckConstruction: 'на болтах',  
        stringsNumber: 6, 
        fretsNumber: 24,
        fingerboard: 'палисандр',
        photo: 'https://i.ibb.co/WVDK4tt/12.png', 
        availability: 4, 
        comments: [
                {text: 'МИТОЛЛЛЛ!!!', time: [2017, 10, 5]}, 
                {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
                {text: 'рычыт как зверь', time: [2020, 3, 21]}], 
        description: 'B.C.Rich ASOBO Avenge SOB Onyx – это инструмент, который отличается удивительной сбалансированностью и гармоничностью звучания. Такой эффект достигается за счет комбинирования различных видов древесины, идеально передающих малейшие оттенки музыки. С технической точки зрения инструмент укомплектован не только стандартными регуляторами тембра и звука, но и качественные звукосниматели с переключателем.',},
        
    {   productId: 13, name: 'B.C. Rich Warlock Metal Master Tribal Fire', 
        price: 349, 
        color: 'Красно-черный', 
        country:'Китай', 
        conf: 'HH', 
        type: 'электрическая',
        orientation:'правосторонняя',
        bodyMaterial: '', 
        neckMaterial: 'клён',
        neckConstruction: 'на болтах',   
        stringsNumber: 6, 
        fretsNumber: 24,
        fingerboard: 'палисандр',
        photo: 'https://i.ibb.co/TtpMr3J/13.png', 
        availability: 4, 
        comments: [
                {text: 'МИТОЛЛЛЛ!!!', time: [2017, 10, 5]}, 
                {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
                {text: 'рычыт как зверь', time: [2020, 3, 21]}], 
        description: 'B.C. Rich, хотя и американская компания, гитары свои делает в Азии. Warlock Metal Master — модель китайской сборки, но это нисколько не умаляет ее достоинств, ведь сделана гитара на совесть, но продается при этом по доступной цене. Дека гитары выполнена из цельного куска агатиса, который некоторые путают с красным деревом из-за схожих музыкальных свойств, вот только звук у агатиса более плоский и сам он легче по весу. В сочетании с хамбакерами «качает» на перегрузе, выдает хорошо читаемые соло партии и разборчив на чистом звуке.',},

    {   productId: 14, name: 'B.C. Rich Neck Thru Jr. V', 
        price: 599, 
        color: 'чёрный', 
        country:'Китай', 
        conf: 'HH', 
        type: 'электрическая',
        orientation:'правосторонняя', 
        bodyMaterial: 'красное дерево',
        neckMaterial: 'клён', 
        neckConstruction: 'на болтах',  
        stringsNumber: 6, 
        fretsNumber: 24,
        fingerboard: 'чёрное дерево',
        photo: 'https://i.ibb.co/0Xvq8bB/14.png', 
        availability: 4, 
        comments: [
                {text: 'МИТОЛЛЛЛ!!!', time: [2017, 10, 5]}, 
                {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
                {text: 'рычыт как зверь', time: [2020, 3, 21]}], 
        description: ''},


];


// {   productId: 8, name: 'Ibanez SA360QM-SPB', 
//         price: '$ 4 999,99', 
//         color: 'синий', 
//         country:'США', 
//         conf: 'HSS', 
//         type: 'цельнокорпусная',
//         orientation:' правосторонняя',
//         bodyMaterial: '', 
//         neckMaterial: 'ньятон',
//         neckConstruction: 'на болтах',   
//         stringsNumber: 6, 
//         fretsNumber: 22,
//         fingerboard: 'палисандр',
//         photo: 'http://soundfirst.ru/sites/fb1/d98/fb1d981f0/images/product/014/014319/251-1b08gu3wxgbsokc4gg8ws0gsos.png', 
//         availability: 7, 
//         comments: [
//                 {text: 'Красивая гитара', time: [2017, 10, 5]}, 
//                 {text: 'Хорошо лежит в руке!', time: [2019, 9, 31]}, 
//                 {text: 'теплый ламповый звук...', time: [2020, 3, 21]}], 
//         description: ['Вдохновляющее звучание Stratocaster является одной из основ Fender. Обладающая классическим звуком, а именно колоколообразными верхами, панчевым средним диапазоном и мощными басами в сочетании с кристально чистой артикуляцией, электрогитара FENDER PLAYER STRATOCASTER HSS PLUS TOP MN ACB наполнена аутентичным ощущением и стилем Fender. Инструмент готов служить вашему музыкальному видению. Он достаточно универсален, чтобы справиться с любым музыкальным']},

