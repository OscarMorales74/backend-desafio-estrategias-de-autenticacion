import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://OscarMor4les:f5m73booh@cluster0scarmorales.k9d156s.mongodb.net/ecommerce?retryWrites=true&w=majority';

    try {
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.log(error);
    }
