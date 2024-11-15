const express = require ('express')
const router = express.Router()

//IMPORTANDO AS TABELAS
const sessao = require('../models/sessao')
const filme = require('../models/filme')

//CRIANDO AS ROTAS 
//1ª ROTA - INSERIR DADOS NA TABELA
router.post('/store',async(req, res)=>{
    const resultado = await sessao.create({
        nome:req.body.nome,
        salario:req.body.salario,
        cargo:req.body.cargo,
        filmeId:req.body.sessao // Esse campo é a chave estrangeira
    })

    if(resultado){
        res.redirect('/')
    }
    else(
        res.json({erro:"Os dados não foram cadastrados no banco"})
    )
})

// 2ª ROTA - EXIBIR A PÁGINA INICIAL DO FUNCiONÁRIO
router.get('/show',(req, res)=>{
    res.send('<h1> Página Inicial do Funcionário </h1>')
})

//3ª ROTA -  CONSULTAR DADOS DA TABELA
router.get('/',async(req, res)=>{
    const resultado = await sessao.findAll({include:departamento}) // o include\: departamento é como o sequelize faz para poder realizar consultas com join

    if(resultado){  // if indica condição 
        console.log(resultado)
        res.render('sessao/index', {dados:resultado})
    }
    else{ // else
        console.log("Não foi possível exibir os dados")
    }
})

// 4ª ROTA - DELETAR DADOS DA TABELA
// :id significa que iremos passar um valor na rota, ou seja, iremos informar um valor que poderá ser diferente e que será armazenado pela variável :id
router.get('/destroy/:id',async(req, res)=>{
    const resultado = await sessao.destroy({
        where:{
            id:req.params.id // estamos recebendo o id via parâmetro que está sendo passado na rota, no caso,é o id que estamos recebendo
        }
    })
    res.redirect('/')
})

//5ª ROTA - EXIBIR FORMULÁRIO DE CADASTRO
router.get('/create', async(req, res)=>{
    let resultado = await filme.findAll()
    
    if (resultado){
        res.render('sessao/addFuncionario', {dados:resultado})
    }

    else{   
        console.log('Não foi possível carregar os dados')
        res.redirect('/') // redirecionando para a página inicial
    }
})
module.exports = router