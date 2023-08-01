import sql from 'mssql'

const dbSettings = {
    user: 'Tzuna',
    password: '123456',
    server: 'localhost',
    database: 'BibliotecaP',
    options: {
        encrypt: true,
        trustServerCertificate: true

    }

}


 export async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings)
        return pool;
    
    } catch (error) {
        console.log(error);
    }

}
 export {sql};
