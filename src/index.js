import app from '../src/app'
import '../src/database/connection'

app.listen(app.get('port'))

console.log('Server en el puerto ', app.get('port'))