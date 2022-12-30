var cep = require('cep-promise');

num = '14400740'

cep(num)

.then((res)=>{
    console.log(res)
})
.catch((err=>{
    console.log(err)
}))